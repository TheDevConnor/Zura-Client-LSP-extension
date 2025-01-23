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
            textDocumentSync: 1,
            hoverProvider: true,
            completionProvider: {
                resolveProvider: false,
                triggerCharacters: [".", "@"],
            },
        },
        serverInfo: {
            name: "zura-lsp",
            version: "0.0.1",
        },
    };
};

