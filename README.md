# PrtScr

Screenshots and screen recordings for Windows, with an editor to mark them up and a library of
everything you take, kept on your disk.

This repository holds PrtScr's releases. Its source is kept elsewhere.

## Download

Get **PrtScr-&lt;version&gt;-win-x64-setup.exe** from the
[latest release](https://github.com/BieleckiLtd/PrtScr-releases/releases/latest) and run it.

It installs for you alone, with no administrator prompt. While it installs it downloads
Microsoft's WebView2 runtime, only if your computer does not have it, and FFmpeg, which
recording uses. PrtScr needs 64-bit Windows 10 version 2004 or later.

The installer is not signed yet, so Windows SmartScreen may say the publisher is unknown. Choose
**More info**, then **Run anyway**.

## Updates

PrtScr keeps itself up to date. It downloads a new version in the background and installs it
when you restart PrtScr, when you are away from the computer, or the next time PrtScr starts.
Settings can turn that off, and **Check for updates** is in Settings and in the tray menu.

## What each release holds

- `PrtScr-<version>-win-x64-setup.exe`, the installer.
- `prtscr-update.json`, which installed copies read to find the release: its version, where the
  installer is, its size and its SHA-256. A copy installs an update only if the download matches.

## Problems

[Open an issue](https://github.com/BieleckiLtd/PrtScr-releases/issues) saying what you did and
what happened. PrtScr's log is at `%LOCALAPPDATA%\PrtScr\logs\app.log`.
