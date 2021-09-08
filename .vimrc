colorscheme industry
:set number
:set ruler
:set history=5000

"setlocal spell
set nocompatible
set cursorline
set showmatch

if &diff
    colorscheme industry
endif

if has("gui_running")
  set number
  set ruler
  set history=5000
  set nocompatible
  set cursorline
  set showmatch
  syntax enable
  syntax on
  set t_Co=256
  "set term=screen-256color
  color elflord
  set encoding=utf-8
  set ic
  set mouse=r
  set hls is
  "hi Comment ctermfg=grey "color scheme will overwrite this setting
  set clipboard+=unnamedplus
  :set tabstop=4
  :set softtabstop=4
  :set shiftwidth=4
  :set shiftround
  :set expandtab
" " set indent
  set autoindent
  set smartindent
  " set space and tab to be visuable
  setlocal list
  set listchars=tab:>~,trail:.
  " set color of space and tab
  hi SpecialKey guifg=yellow ctermfg=yellow
  highlight MyTabSpace guifg=yellow ctermfg=yellow
  match MyTabSpace /\t\| /
  " set highlight the search item
  set hlsearch
  set guifont=Ubuntu\ Mono\ 18
endif

set ttymouse=xterm2
set mouse=r

:set ic
:set hls is

"hi Comment ctermfg=grey "color scheme will overwrite this setting

set clipboard+=unnamedplus

" set indent
:set tabstop=4
:set softtabstop=4
:set shiftwidth=4
:set shiftround
:set expandtab
"set autoindent
"set smartindent
"set cindent

" set space and tab to be visuable
setlocal list
set listchars=tab:>~,trail:.
" set color of space and tab
hi SpecialKey guifg=yellow ctermfg=yellow
highlight MyTabSpace guifg=yellow ctermfg=yellow
match MyTabSpace /\t\| /
" set highlight the search item
set hlsearch
set incsearch


execute pathogen#infect()

set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

set completeopt=longest,menu


" vundle config
set nocompatible
filetype off
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'VundleVim/Vundle.vim'
Plugin 'Valloric/YouCompleteMe'
let g:ycm_global_ycm_extra_conf = "~/.vim/bundle/YouCompleteMe/cpp/ycm/.ycm_extra_conf.py"
let g:ycm_key_invoke_completion = ''
let g:ycm_min_num_identifier_candidate_chars = 2
let g:ycm_goto_buffer_command = 'horizontal-split'
let g:ycm_seed_identifiers_with_syntax=1
map <F2> :YcmCompleter GoTo<CR>                           # 按F2跳转到定义处
let g:ycm_error_symbol = '>>'
let g:ycm_warning_symbol = '>*'
Plugin 'scrooloose/syntastic'
let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
let g:syntastic_python_checkers = ['pylint']
let g:syntastic_sh_checkers = ['shellcheck']
let g:syntastic_c_checkers = ['sparse']
"let g:syntastic_cpp_checkers = ['splint']
let g:ale_sign_error = 'x'
let g:ale_sign_warning = '!'
Plugin 'yianwillis/vimcdoc'
Plugin 'skywind3000/asyncrun.vim'

:runtime! ftplugin/man.vim
" to config autopep8 plugin
Plugin 'Chiel92/vim-autoformat'
nnoremap <F6> :Autoformat<CR>
let g:autoformat_autoindent = 0
let g:autoformat_retab = 0
let g:autoformat_remove_trailing_spaces = 0

Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
let g:airline#extensions#tabline#enabled = 1

" to view dict-tree in vim
Plugin 'https://github.com/scrooloose/nerdtree'
nnoremap <F3> :NERDTreeToggle<CR>
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTree") && b:NERDTree.isTabTree()) | q | endif

Plugin 'vim-scripts/taglist.vim'
let Tlist_Show_One_File=1
let Tlist_Exit_OnlyWindow=1
Plugin 'kien/rainbow_parentheses.vim'
let g:rbpt_colorpairs = [
                        \ ['brown',       'RoyalBlue3'],
                        \ ['Darkblue',    'SeaGreen3'],
                        \ ['darkgray',    'DarkOrchid3'],
                        \ ['darkgreen',   'firebrick3'],
                        \ ['darkcyan',    'RoyalBlue3'],
                        \ ['darkred',     'SeaGreen3'],
                        \ ['darkmagenta', 'DarkOrchid3'],
                        \ ['brown',       'firebrick3'],
                        \ ['gray',        'RoyalBlue3'],
                        \ ['darkmagenta', 'DarkOrchid3'],
                        \ ['Darkblue',    'firebrick3'],
                        \ ['darkgreen',   'RoyalBlue3'],
                        \ ['darkcyan',    'SeaGreen3'],
                        \ ['darkred',     'DarkOrchid3'],
                        \ ['red',         'firebrick3'],
                        \ ]
let g:rbpt_max = 16
let g:rbpt_loadcmd_toggle = 0
au VimEnter * RainbowParenthesesToggle
au Syntax * RainbowParenthesesLoadRound
au Syntax * RainbowParenthesesLoadSquare
au Syntax * RainbowParenthesesLoadBraces
call vundle#end()


filetype plugin on

""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Quickly Run
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Usage: :!python %
map <F5> :call CompileRunGcc()<CR>

func! CompileRunGcc()
    exec "w" 
    if &filetype == 'c' 
        exec '!gcc % -o %<'
        exec '!time ./%<'
    elseif &filetype == 'cpp'
        exec '!g++ % -o %<'
        exec '!time ./%<'
    elseif &filetype == 'python'
        exec '!time python %'
    elseif &filetype == 'sh'
        :!time bash %
    endif                                                                              
endfunc 

func! Py3(foo)
    exec "w"
    let bar = a:foo
    exec "AsyncRun -raw python3 %" bar
    exec "copen \| resize 6"
    exec 'wincmd p'
endfunc
com! -nargs=* Py3 call Py3(<f-args>)

nnoremap <C-a>s :call CompileRunGccc()<cr>

func! CompileRunGccc()
          exec "w"
          if &filetype == 'python'
                  if search("@profile")  "性能测试, 使用时在要测试的函数上一行加入 @profile
                          exec "AsyncRun kernprof -l -v %"
                          exec "copen"
                          exec "wincmd p"
                  elseif search("set_trace()")  "debug, 需要在代码中 import ipdb 以及set_trac
                          exec "!python3 %"
                  else
                          exec "AsyncRun -raw python3 %"
                          exec "copen \| resize 6"
                          exec "wincmd p"
                  endif
          endif

endfunc


" to set the window size of SyntasticCheck
function! SyntasticCheckHook(errors)
    if !empty(a:errors)
        let g:syntastic_loc_list_height = min([len(a:errors)+2, 5])
    endif
endfunction
" to set the default mode of syntastic to off
" and to on/off it using hotkey
let g:syntastic_mode_map = { 'mode': 'passive', 'active_filetypes': [],'passive_filetypes': [] }
nnoremap <C-a>a :SyntasticCheck<CR>
nnoremap <C-a>q :SyntasticToggleMode<CR>
set nofoldenable

" to put gvim window to the rightmost
function! WinRight()
      let ypos=getwinposy()
      "let xpos=getwinposx()
      execute "winpos 1241 ".ypos
      execute "set lines=150"
      execute "set columns=80"
      "execute "winpos 0 ".xpos
endfunction
" to put gvim window to the left side of window
function! WinLeft()
      let ypos=getwinposy()
      "let xpos=getwinposx()
      execute "winpos 0 ".ypos
      execute "set lines=150"
      execute "set columns=70"
      "execute "winpos 0 ".xpos
endfunction
au GUIEnter * call WinLeft()


autocmd! bufwritepost .vimrc source %
