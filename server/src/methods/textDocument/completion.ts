import { documents, TextDocumentIdentifier } from "../../documents";
import { RequestMessage } from "../../server";
import { items, CompletionItem } from "./items";
import log from "../../log";

export interface CompletionList {
    isIncomplete: boolean;
    items: CompletionItem[];
}

interface Position {
	line: number;
	character: number;
}

interface TextDocumentPositionParams {
	textDocument: TextDocumentIdentifier;
	position: Position;
}

export interface CompletionParams extends TextDocumentPositionParams {}

export const completion = (msg: RequestMessage): CompletionList => {
    log.write("Completion request received: " + JSON.stringify(msg));

    return {
        isIncomplete: true,
        items: items.map(item => ({
            label: item.label,
            documentation: item.documentation,
            detail: item.detail,
            insertText: item.snippet || item.label, // Default to label if snippet is missing
            insertTextFormat: item.snippet ? 2 : 1, // 2 = Snippet, 1 = Plain text
        })),
    };
};
