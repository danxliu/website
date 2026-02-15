---
title: 'nvim'
description: 'Configuring nvim'
pubDate: 'Jan 14 2026'
---

I recently decided to rewrite my neovim setup.
I was used Lazy.nvim as my package manager, but I thought it was kinda unnecessary.
Lazy loading is great, but I don't really care if Neovim starts 0.2 ms faster.

With the addition of a new (although experimental) built in Neovim [package manager](https://neovim.io/doc/user/pack.html#vim.pack), I thought it could be cool to rewrite my config with it.

> The package manager is experimental, so you have to use `neovim-git` (the master branch) to be able to use it.

## Using `vim.pack`
Using the builtin package manager is really simple. Just use `vim.pack.add()` to add a list of your favorite plugins.

```lua
vim.pack.add({
  { src = "https://github.com/whatever" },
})
```

When you restart Neovim, your plugins will be installed.

> To update your plugins, you can just call the lua code `vim.pack.update()`.


## Configuration Structure
My configuration has the following structure:
```
.
├── init.lua
├── lua
│   ├── keybinds.lua
│   ├── options.lua
│   └── plugins.lua
└── snippets
    └── ...
```

The code is separated into three files in the `lua` folder, and their names explain what they are used for.

## Plugin List
Next, I want to determine which plugins I actually use for Neovim.
- [Kanso](https://github.com/webhooked/kanso.nvim): I like this theme
- [LuaSnip](https://github.com/L3MON4D3/LuaSnip): Snippets
- [LSPConfig](https://github.com/neovim/nvim-lspconfig): LSP support (code highlighting, autocomplete, etc...)
- [Mason](https://github.com/williamboman/mason.nvim): Easy install of external tools like LSPs, linters, formatters, etc...
- [Mason LSPConfig](https://github.com/williamboman/mason-lspconfig.nvim): Helps Mason install LSPs
- [Blink](https://github.com/saghen/blink.cmp): Autocomplete
- [Mini.Pick](https://github.com/echasnovski/mini.pick): Fuzzy finding and buffer switching
- [Dashboard](https://github.com/nvimdev/dashboard-nvim): Bloat but cool
- [Nvim Tree](https://github.com/nvim-tree/nvim-tree.lua): Sidebar tree
- [Nvim Tree Icons](https://github.com/nvim-tree/nvim-web-devicons): File icons for the sidebar tree

## Actual Code

Now time for the actual code.

### `init.lua`
Of course, we need an `init.lua` file at our root directory to import all of our three lua files.
```lua
require("options")
require("plugins")
require("keybinds")
```

### `options.lua`
Here are the options I have for Neovim.

```lua
-- General Options
vim.o.mouse = 'a'
vim.o.completeopt = "menuone,noinsert,noselect"
vim.o.swapfile = false
vim.o.termguicolors = true

-- Visual Options
vim.o.number = true
vim.o.relativenumber = true
vim.o.scrolloff = 10
vim.o.sidescrolloff = 8
vim.o.wrap = false
vim.o.signcolumn = "yes"
vim.o.showmode = false

-- Search Options
vim.o.ignorecase = true
vim.o.smartcase = true

-- Indentation Options
vim.o.tabstop = 2
vim.o.softtabstop = 2
vim.o.shiftwidth = 2
vim.o.expandtab = true
vim.o.smartindent = true
vim.o.autoindent = true

vim.g.mapleader = " "
```

I also have a simple status line at the bottom of the file that shows the current editing mode, number of errors/warnings, the filetype, and the cursor position.
```lua
-- Status Line
function _G._status_diag()
  local levels = vim.diagnostic.severity
  local errors = #vim.diagnostic.get(0, {severity = levels.ERROR})
  local warnings = #vim.diagnostic.get(0, {severity = levels.WARN})
  if errors > 0 or warnings > 0 then
    return ' '..tostring(errors)..'󰅙 '..tostring(warnings)..' '
  end
  return ' 󰗠'
end
vim.o.statusline = "%{mode()} %f %{v:lua._status_diag()} %r%m%=%{&filetype} %3l:%-2c"
```

### `keybinds.lua`
Here is my keybind configuration. This is definitely not finalized (e.g. I want to add vertical/horizontal split + terminal).

```lua
vim.keymap.set("n", "<Tab>", ":bnext<CR>")
vim.keymap.set("n", "<S-Tab>", ":bprevious<CR>")

vim.keymap.set("n", "<C-l>", ":wincmd l<CR>")
vim.keymap.set("n", "<C-h>", ":wincmd h<CR>")
vim.keymap.set("n", "<C-j>", ":wincmd j<CR>")
vim.keymap.set("n", "<C-k>", ":wincmd k<CR>")

vim.keymap.set("n", "<leader>v", ":vsplit<CR>")
vim.keymap.set("n", "<leader>h", ":split<CR>")

vim.keymap.set("n", "<leader>q", ":quit<CR>")
vim.keymap.set("n", "<leader>w", ":write<CR>")

vim.keymap.set("n", "<leader>b", ":Pick buffers<CR>")
vim.keymap.set("n", "<leader>f", ":Pick files<CR>")
vim.keymap.set("n", "<leader>g", ":Pick grep_live<CR>")

vim.keymap.set("n", "<C-n>", ":NvimTreeToggle<CR>")
vim.keymap.set("n", "<leader>fm", vim.lsp.buf.format)

vim.keymap.set("t", "<Esc>", "<C-\><C-n>")
```

Some notable default keybinds:
- `Ctrl+w d`: View diagnostic message.
- Autocomplete:
    - `Ctrl + n`: Next autocomplete option.
    - `Ctrl + p`: Previous autocomplete option.
    - `Ctrl + y`: Accept autocomplete option.

### `plugins.lua`
First, I add all of the plugins.
```lua
vim.pack.add({
  { src = "https://github.com/webhooked/kanso.nvim" },
  { src = "https://github.com/L3MON4D3/LuaSnip" },
  { src = "https://github.com/neovim/nvim-lspconfig" },
  { src = "https://github.com/williamboman/mason-lspconfig.nvim" },
  { src = "https://github.com/williamboman/mason.nvim" },
  { src = "https://github.com/saghen/blink.cmp" },
  { src = "https://github.com/echasnovski/mini.pick" },
  { src = "https://github.com/nvim-tree/nvim-web-devicons" },
  { src = "https://github.com/nvimdev/dashboard-nvim" },
  { src = "https://github.com/nvim-tree/nvim-tree.lua" },
})
```

Then, I setup each plugin (in order)
```lua
require("kanso").setup({ theme = "zen" })
require("blink.cmp").setup({
  snippets = {
    expand = function(snippet)
      require('luasnip.loaders.from_vscode').lazy_load()
      require('luasnip.loaders.from_vscode').lazy_load({
        paths = '~/.config/nvim/snippets',
      })
      require('luasnip').lsp_expand(snippet)
    end
  },
  sources = {
    default = { 'lsp', 'path', 'snippets', 'buffer' },
  },
  fuzzy = { implementation = "lua" }
})
require("mason").setup()
require("mason-lspconfig").setup({
  ensure_installed = {
    "lua_ls",
    "cssls",
    "html",
    "clangd",
    "pyright"
  },
  handlers = {
    function(server)
      require("lspconfig")[server].setup {
        capabilities = require("blink.cmp").get_lsp_capabilities()
      }
    end
  }
})
require("dashboard").setup({
  theme = 'doom',
  config = {
    center = {
      {
        desc = 'New File',
        group = 'Label',
        action = 'enew',
        key = 'n',
      },
      {
        desc = 'Update',
        group = 'Label',
        action = 'vim.pack.update()',
        key = 'u',
      },
    }
  }
})
require("nvim-tree").setup()
require("mini.pick").setup()
vim.cmd("colorscheme kanso-zen")
```

## Conclusion

And we're done!
This is a super minimal setup, but it has everything I need to actually use Neovim, including LSP and autocomplete.

```
find . -name '*.lua' | xargs wc -l
  22 ./lua/keybinds.lua
  40 ./lua/options.lua
 127 ./lua/plugins.lua
   4 ./init.lua
 193 total
```

Btw I have given up using Neovim for notetaking, since I need LaTeX snippets while writing markdown.
There is this [plugin](https://github.com/iurimateus/luasnip-latex-snippets.nvim) I tried using for a while, but it causes Neovim to slow down and become unusable after like 30 minutes when writing LaTeX in markdown files.

Now using [Obsidian](https://obsidian.md/) instead with the [LaTeX Suite Plugin](https://github.com/artisticat1/obsidian-latex-suite), which fits my needs a lot better.
Although I hate reconfiguring Obsidian every time I create a new vault.
