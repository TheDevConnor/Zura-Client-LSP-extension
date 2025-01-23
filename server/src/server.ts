import { completion } from "./methods/textDocument/completion";
import { didChange } from "./methods/textDocument/didChange";
import { initialize } from "./methods/init";
import log from "./log";

interface Message {
  jsonrpc: string;
}

export interface NotifactionMessage extends Message {
  method: string;
	params?: unknown[] | object;
}

export interface RequestMessage extends NotifactionMessage {
	id: number | string;
}

type RequestMethod = (msg: RequestMessage) => ReturnType<typeof initialize> | ReturnType<typeof completion>;
type NotifactionMethod = (msg: NotifactionMessage) => void;
const methodLookup: Record<string, RequestMethod | NotifactionMethod> = {
  initialize,
  "textDocument/completion": completion,
  "textDocument/didChange": didChange,
};

const respond = (id: RequestMessage["id"], result: object | null) => {
  const response = JSON.stringify({ id, result });
  const messageLength = Buffer.byteLength(response, "utf-8");
  const header = `Content-Length: ${messageLength}\r\n\r\n`;

  // log.write(header + response);
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

    log.write({id: msg.id, method: msg.method, params: msg.params});

    // TODO: Call method and respond
    const method = methodLookup[msg.method];
    if (method) {
      const result = method(msg);
      if (result !== undefined) respond(msg.id, result);
    }

    // Remove the message from the buffer
    buffer = buffer.slice(msgStart + contentLength);
  }
});

