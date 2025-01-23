# Zura Lsp and syntax highliter

NOTE: This is heavily based on [lsp-sample from vscode-extension-samples][sample] with the goal of removing example-specific code to ease starting a new Language Server.
NOTE: This was also my version of Jeffrey Chupp tutorial series https://www.youtube.com/watch?v=Xo5VXTRoL6Q&list=PLq5tGLDKHlW9XKRj5-plHdvbkT5AOdM7-

## Getting Started

1. Clone this repo
2. Run `npm install` from the repo root.

## Running in Vscode
From the root directory of this project, run `code .` Then in VS Code

1. Build the extension (both client and server) with `⌘+shift+B` (or `ctrl+shift+B` on windows)
2. Open the Run and Debug view and press "Launch Client" (or press `F5`). This will open a `[Extension Development Host]` VS Code window.
3. Opening or editing a file in that window should show an information message in VS Code like you see below.

   ![example information message](https://semanticart.com/misc-images/minimum-viable-vscode-language-server-extension-info-message.png)

4. Edits made to your `server.ts` will be rebuilt immediately but you'll need to "Launch Client" again (`⌘-shift-F5`) from the primary VS Code window to see the impact of your changes.

[Debugging instructions can be found here][debug]



[debug]: https://code.visualstudio.com/api/language-extensions/language-server-extension-guide#debugging-both-client-and-server
[sample]: https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-sample
[publish]: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
[vsix]: https://code.visualstudio.com/api/working-with-extensions/publishing-extension#packaging-extensions

## Running in Nvim
In your init.lua past the following into the config
```lua
vim.filetype.add {
  extension = {
    zu = "zura", -- Map .zu files to zura
  },
}

vim.api.nvim_create_autocmd({ "BufNewFile", "BufRead" }, {
  pattern = { "*.zu" },
  callback = function()
    -- Ensure .zu files are recognized as zura
    vim.bo.filetype = "zura"

    -- Check if the LSP is already attached
    local clients = vim.lsp.get_clients()
    for _, client in ipairs(clients) do
      if client.name == "Zura Lsp" and client.config.cmd[3] == vim.fn.expand "~/Projects/Zura-Lsp/server/src/server.ts" then
        return
      end
    end

    -- Start the custom LSP
    vim.lsp.start {
      name = "Zura Lsp",
      cmd = {
        "npx",
        "ts-node",
        vim.fn.expand "~/Projects/Zura-Lsp/server/src/server.ts",
      },
      root_dir = vim.fn.getcwd(), -- Optionally set a root directory
    }
  end,
})

```
