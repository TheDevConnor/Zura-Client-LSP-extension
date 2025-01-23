import { RequestMessage } from "../server";

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
            textDocumentSync: 1,
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: ["@", ".", " "],
            },
        },
        serverInfo: {
            name: "zura-lsp",
            version: "0.0.1"
        }
    }
}