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
    // const params = msg.params as CompletionParams;
    // const content = documents.get(params.textDocument.uri);

    // if (!content) {
    //     log.write(`Document not found: ${params.textDocument.uri}`);
    //     return { isIncomplete: false, items: [] };
    // }

    // const currentLine = content.split("\n")[params.position.line];
    // const lineUntilCursor = currentLine.slice(0, params.position.character);

    return {
        isIncomplete: true,
        items: items.map(item => ({
            label: item.label,
            documentation: item.documentation,
            insertText: item.snippet || item.label,
            insertTextFormat: item.snippet ? 1 : undefined,
        }))
    };
};
