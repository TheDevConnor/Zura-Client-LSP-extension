import { documents, VersionedTextDocumentIdentifier, TextDocumentContentChangeEvent } from "../../documents";
import { NotifactionMessage } from "../../server";
import log from "../../log";

interface DidChangeTextDocumentParams {
	textDocument: VersionedTextDocumentIdentifier;
	contentChanges: TextDocumentContentChangeEvent[];
}

export const didChange = (msg: NotifactionMessage): void => {
    const params = msg.params as DidChangeTextDocumentParams;
    documents.set(params.textDocument.uri, params.contentChanges[0].text);
};