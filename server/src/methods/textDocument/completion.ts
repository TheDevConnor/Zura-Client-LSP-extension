import { RequestMessage } from "../../server";

type CompletionItem = {
    label: string;
    documentation?: string;
    detail?: string;
    snippet?: string;
};

const items: CompletionItem[] = [
    // Keywords
    { label: "and", documentation: "Logical AND operator."},
    { label: "else", documentation: "Defines the alternative branch in an if-else statement." },
    { label: "false", documentation: "Boolean false value." },
    { label: "if", documentation: "Defines a conditional branch." },
    { label: "nil", documentation: "Represents the absence of a value." },
    { label: "or", documentation: "Logical OR operator." },
    { label: "exit", documentation: "Exits the current loop or function." },
    { label: "super", documentation: "Accesses a parent class's methods or properties." },
    { label: "true", documentation: "Boolean true value." },
    { label: "union", documentation: "Defines a union type." },
    { label: "const", documentation: "Declares a constant value." },
    { label: "pub", documentation: "Declares a public member." },
    { label: "priv", documentation: "Declares a private member." },
    { label: "break", documentation: "Exits the current loop." },
    { label: "continue", documentation: "Skips to the next iteration of the loop." },
    { label: "typename", documentation: "Defines a type alias." },
    { label: "match", documentation: "Pattern matching statement." },
    { label: "default", documentation: "Specifies the default case in a match statement." },
    { label: "case", documentation: "Defines a case in a match statement.", snippet: "case $1: $2 => $3" },
    { label: "return", documentation: "Returns a value from a function.", snippet: "return $0;" },
    
    // Data Types
    { label: "int", documentation: "32-bit signed integer." },
    { label: "float", documentation: "32-bit floating-point number." },
    { label: "str", documentation: "64-bit string pointer." },
    { label: "char", documentation: "8-bit character." },
    { label: "bool", documentation: "8-bit boolean value." },
    
    // Built-in Functions
    { label: "@template", documentation: "Defines a template for generic programming." },
    { label: "@cast", documentation: "Casts a value to a different type." },
    { label: "@import", documentation: "Imports a module dynamically." },
    { label: "@link", documentation: "Links external resources." },
    { label: "@extern", documentation: "Declares an external symbol or function." },
    { label: "@call", documentation: "Calls a function or method dynamically." },
    { label: "@dis", documentation: "Prints a value to the standard output." },
    
    {
        label: "main",
        documentation: "Entry point of a program.",
        snippet: "const main := fn() int {\n    $0\n};"
    },
    {
        label: "have",
        documentation: "Defines a variable.",
        snippet: "have $1: $2 := $3;",
    },
    {
        label: "fn",
        documentation: "Defines a function.",
        snippet: "const $1 := fn($2) $3 {\n    $0\n};",
    },
    {
        label: "struct",
        documentation: "Defines a structured data type.",
        snippet: "const $1 := struct {\n    $0\n};",
    },
    {
        label: "enum",
        documentation: "Defines an enumeration.",
        snippet: "const $1 := enum {\n    $0\n};",
    },
    {
        label: "union",
        documentation: "Defines a union type.",
        snippet: "const $1 := union {\n    $0\n};",
    },
    // there are two different variants of the `loop` keyword
    // for loop `loop (i = 0; i < 10) : (i++) { ... }`
    {
        label: "loop",
        documentation: "Creates a loop with the condition and optional post-loop operations.",
        snippet: "loop ($1) : ($2) {\n    $0\n}",
    },
    // while loop `loop (i < 10) { ... }`
    {
        label: "loop",
        documentation: "Creates a loop with just the condition.",
        snippet: "loop ($1) {\n    $0\n}",
    },
];

export interface CompletionList {
    isIncomplete: boolean;
    items: CompletionItem[];
}

export const completion = (msg: RequestMessage): CompletionList => {
    return {
        isIncomplete: false,
        items: items.map(item => ({
            label: item.label,
            documentation: item.documentation,
            insertText: item.snippet || item.label,
            insertTextFormat: item.snippet ? 2 : undefined,
        })),
    };
};
