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