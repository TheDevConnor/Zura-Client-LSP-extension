import { RequestMessage } from "../server";
import { completion } from "./textDocument/completion";

type ServerCapabilities = Record<string, unknown>;

interface InitializeResult {
	capabilities: ServerCapabilities;
	serverInfo?: {
		name: string;
		version?: string;
	};
}

export const initialize = (msg: RequestMessage): InitializeResult => {
    return {
        capabilities: { 
            completionProvider: {},
            textDocumentSync: 1,
            hoverProvider: true,
        },
        serverInfo: {
            name: "zura-lsp",
            version: "0.0.1"
        }
    }
}