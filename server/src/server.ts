import { completion } from "./methods/textDocument/completion";
import { initialize } from "./methods/init";
import log from "./log";

interface Message {
  jsonrpc: string;
}

export interface RequestMessage extends Message {
	id: number | string;
	method: string;
	params?: unknown[] | object;
}

type RequestMethod = (msg: RequestMessage) => unknown;
const methodLookup: Record<string, RequestMethod> = {
  initialize,
  "textDocument/completion": completion,
};

const respond = (id: RequestMessage["id"], result: unknown) => {
  const response = JSON.stringify({ id, result });
  const messageLength = Buffer.byteLength(response, "utf-8");
  const header = `Content-Length: ${messageLength}\r\n\r\n`;

  log.write(header + response);
  process.stdout.write(header + response);
};

let buffer = "";
process.stdin.on("data", (chunk) => {
  buffer += chunk;

  while (true) {
    // Check for the Content-Length line
    const lengthMatch = buffer.match(/Content-Length: (\d+)\r\n/);
    if (!lengthMatch) break;

    const contentLength = parseInt(lengthMatch[1], 10);
    const msgStart = buffer.indexOf("\r\n\r\n") + 4;

    // Continue unless we have the whole message in the buffer
    if (buffer.length < msgStart + contentLength) break;

    const rawMsg = buffer.slice(msgStart, msgStart + contentLength);
    const msg = JSON.parse(rawMsg);

    log.write({id: msg.id, method: msg.method});

    // TODO: Call method and respond
    const method = methodLookup[msg.method];
    if (method) {
      respond(msg.id, method(msg));
    }

    // Remove the message from the buffer
    buffer = buffer.slice(msgStart + contentLength);
  }
});

