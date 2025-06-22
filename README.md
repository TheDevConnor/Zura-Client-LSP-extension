# Zura Lsp and Syntax Highliter

[Zura](https://github.com/TheDevConnor/Zura-Transpiled) is a compiled programming language made by @TheSovietPancakes and I. Please check both of us out! :)

NOTE: This is heavily based on [lsp-sample from vscode-extension-samples][sample] with the goal of removing example-specific code to ease starting a new Language Server.
NOTE: This was also my version of [Jeffrey Chupp tutorial series](https://www.youtube.com/watch?v=Xo5VXTRoL6Q&list=PLq5tGLDKHlW9XKRj5-plHdvbkT5AOdM7s).

> [!NOTE]
> All files other than `zura.vim` are for VSCode. Go to [Running in Nvim](#running-in-nvim) to see how to set up the language server in Neovim.

## Running in Vscode

Option A:

1. Download the extension from the VSCode extension marketplace

Option B:

1. Clone this repository
2. Run `npm install` to install the dependencies
3. Run `vsce package` to create a `.vsix` file that can be installed in VSCode.
4. Run from the console `code --install-extension zura-lsp-0.0.1.vsix` to install the extension globally.

Option C:

If you don't want to install the extension globally, you can open it in its own debug window by running the following:

1. Clone this repository
2. Run these commands:

```bash
npm install
cd client
npm install
cd ..
```

3. Hit F5 on your keyboard or go to the Run and Debug tab and click "Start Debugging" top open the extension in a brand new window.

## Running in Nvim

Paste this code from [`zura-plugin.lua`](./zura-plugin.lua) into a file in your ./nvim/lua/plugins directory, for example: `./nvim/lua/plugins/zura.lua`

```lua
return {
  "neovim/nvim-lspconfig",
  lazy = false,
  priority = 1000,
  config = function()
    -- Filetype setup
    vim.filetype.add({
      extension = { zu = "zura" },
      pattern = { [".*%.zu"] = "zura" },
    })

    -- LSP setup
    local lspconfig = require("lspconfig")
    local configs = require("lspconfig.configs")

    if not configs.zura_ls then
      configs.zura_ls = {
        default_config = {
          cmd = { "/home/thedevconnor/Zura-Transpiled/release/zura", "-lsp" },
          filetypes = { "zura" },
          root_dir = lspconfig.util.root_pattern(".git", ".zura-root"),
        },
      }
    end

    lspconfig.zura_ls.setup({})
  end,
}
```

Now, place the [`zura.vim`](./zura-syntax.vim) file into your `./nvim/syntax/` directory.
It should look like this:

```vim
" zura.vim - Enhanced Syntax highlighting for Zura with custom colors

" Define Zura keywords
syn keyword zuraKeyword const fn have auto loop if else return enum struct typename template
syn keyword zuraType int float bool str char
syn match zuraBuiltIn /@\w\+/
syn keyword zuraConditional if else
syn keyword zuraLoop loop
syn keyword zuraStatement return
syn keyword zuraModifier const

" Highlight numbers (integers and floats)
syn match zuraNumber /\<\d\+\(\.\d\+\)\?\([eE][+-]\d\+\)\?/

" Highlight strings (single and double quotes)
syn region zuraString start=+"+ skip=+\\"+ end=+"+ contains=zuraEscape
syn region zuraString start=+'+ skip=+\\'+ end=+'+ contains=zuraEscape

" Highlight comments (single-line and multi-line)
syn match zuraComment "#.*$"

" Highlight structs, enums, and function declarations
syn match zuraStruct /\<\(struct\|enum\)\>/
syn match zuraFunction /\<fn\>\s\+\w\+\ze\s*[(]/

" Highlight operators
syn match zuraOperator /[:=(){}\[\],;.+\-*/<>]/

" Highlight variables (avoid matching keywords)
syn match zuraVariable /\<[a-zA-Z_]\w*\>/ contains=zuraKeyword,zuraType

" Custom colors for Zura syntax (Horizon-style palette)
hi def zuraKeyword guifg=#E95678 gui=bold               " Keywords: Warm pink
hi def zuraType guifg=#25B0BC gui=italic                " Types: Vibrant cyan
hi def zuraBuiltIn guifg=#FAB795 gui=bold,italic        " Built-ins: Peachy orange
hi def zuraConditional guifg=#FAB28E gui=bold           " Conditionals: Muted orange
hi def zuraLoop guifg=#FAB28E gui=bold                  " Loops: Muted orange
hi def zuraStatement guifg=#FFD580 gui=italic           " Statements: Light peach
hi def zuraModifier guifg=#25B0BC gui=bold              " Modifiers: Vibrant cyan
hi def zuraNumber guifg=#E95678                         " Numbers: Warm pink
hi def zuraString guifg=#09F7A0                         " Strings: Soft green
hi def zuraComment guifg=#6C6F93 gui=italic             " Comments: Muted grayish-blue
hi def zuraOperator guifg=#E95678                       " Operators: Warm pink
hi def zuraStruct guifg=#25B0BC gui=bold                " Structs: Vibrant cyan
hi def zuraFunction guifg=#FFD580 gui=bold              " Functions: Light peach
hi def zuraVariable guifg=#FAB                          " Variables: light pink
```

## Afterwards

Assuming you followed the steps above proprely, then as long as you have the Zura compiler installed on your system and in PATH under `zura`, you should be able to use the Zura language server and syntax highlighter on any `.zu` file.
