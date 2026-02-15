---
title: 'dwm'
description: 'Configuring DWM'
pubDate: 'June 16 2024'
---

DWM stands for "Dynamic Window Manager," and, like its name indicates, is a dynamic window manager for X11.
A dynamic window manager is where the window manager tiles windows in certain presets.
The entire window manager is written in C.
Its philosophy is to be as lightweight as necessary, requiring the user to edit the C code directly to add features and modify configurations.

# Tiling Presets

In the case of DWM, there three default presets:
1. **Tiled**:
Windows are tiled in two main columns, with the left column being called the master and the right being called the stack.
2. **Monocole**:
Fullscreen windows are overlayed on top of each other, only allowing one window to be seen.
3. **Floating**:
Windows can be rearranged in any size and postion, using `Super + Left Click` to drag and `Super + Right Click` to resize.

# Status Bar

By default, DWM comes with a status bar on each monitor.
This displays the tags, focused window name, and current tiling preset.
It also indicates the currently selected tag, and which tags have windows in them.

On the right, DWM also contains modifiable text.
To modify what the text says, you must edit the root window name.
This can be done with the `xsetroot -name` command.

For example, if you wanted DWM to show the time in the status bar, you could run the following shell script on startup:
```shell
while true; do
    xsetroot -name "$(date)"
    sleep 5
done
```

# Editing the Code

If you wish to personalize DWM, you will have to learn how to edit the source code and recompile.
The main configuration variables are stored in the `config.h` file.
However, you should not modify `config.h` directly.
Instead, you should edit `config.def.h` first, delete `config.h`, and then compile the C code.

The process should look something like:
1. Edit the `config.def.h` file.
2. Remove the `config.h` file.
3. Run `sudo make install` to recompile DWM.

# Patching

To add more functionality to DWM, typically people apple patches to the code.
These patches are created by other users, and the official ones are submitted [here](https://dwm.suckless.org/patches/).

To install a patch, perform the following steps:
1. Download the patch and store it safely in a directory.
2. Use the following command to patch the code: `patch -p1 < /path/to/patch.diff`
3. If there are any conflicts, manually resolve them by looking at the `.rej` files created.

Unfortunately, this process is very tedious, especially when there are conflicts.
Because the patches are made to patch the default DWM code, the more patches you add, the more likely there are to be conflicts.
In order to resolve conflicts, you have to have a certain level of understanding of the code and what it is trying to do, otherwise it is very hard.

For less issues with patching, you can check out the [DWM-flexipatch](https://github.com/bakkeby/dwm-flexipatch) project, which contains all the patches by default, and allows users to easily choose which patches they want to use.

I have my own [DWM fork](https://github.com/danxliu/dwm) but I have switched to Wayland ([Niri <3](https://github.com/YaLTeR/niri)).
