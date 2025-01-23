export type CompletionItem = {
    label: string;
    documentation?: string | { kind: "markdown"; value: string };
    detail?: string;
    snippet?: string;
};

export const items: CompletionItem[] = [
    {
        label: "fn",
        documentation: "Define a function",
        detail: "const name := fn(args: any[]): type { ... }",
        snippet: `const \${1:name} := fn(\${2:args}) : \${3:type} {\n    \${4:...}\n};`,
    },
    {
        label: "if",
        documentation: "Conditional statement",
        detail: "if (condition) { ... } else { ... }",
        snippet: `if (\${1:condition}) {\n    \${2:...}\n} else {\n    \${3:...}\n}`,
    },
    {
        label: "else",
        documentation: "Else statement",
        detail: "else { ... }",
        snippet: `else {\n    \${1:...}\n}`,
    },
    {
        label: "if-else",
        documentation: "If-else statement",
        detail: "if (condition) { ... } else { ... }",
        snippet: `if (\${1:condition}) {\n    \${2:...}\n} else {\n    \${3:...}\n}`,
    },
    {
        label: "loop",
        documentation: "For loop statement used to iterate over a range of values",
        detail: "loop (init; condition) : (iterator) { ... }",
        snippet: `loop (\${1:init}; \${2:condition}) : (\${3:iterator}) {\n    \${4:...}\n}`,
    },
    {
        label: "loop",
        documentation: "While loop with an optional condition",
        detail: "loop (condition) : (optional) { ... }",
        snippet: `loop (\${1:condition}) : (\${2:optional}) {\n    \${3:...}\n}`,
    },
    {
        label: "loop",
        documentation: "While loop with no optional condition",
        detail: "loop (condition) { ... }",
        snippet: `loop (\${1:condition}) {\n    \${2:...}\n}`,
    },
];
