<h1 align="center">
  <br>
  <img src="public/images/icon128.png" alt="Excalistore" width="200">
  <br>
  Excalistore
  <br>
</h1>

<h4 align="center">A Chrome extension to store and manage multiple Excalidraw drawings</h4>
<br/>
<p align="center">

<a href="https://github.com/andrewinci/excalistore/actions/workflows/ci.yml">
    <img src="https://github.com/andrewinci/excalistore/actions/workflows/ci.yml/badge.svg" alt="CI"/>
</a>
<a href="https://github.com/andrewinci/excalistore/releases/latest/" > 
    <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/andrewinci/excalistore?style=flat">
</a>
<a href="https://chrome.google.com/webstore/detail/cemnjkfjpieanmfoddiljfildcdipmgc/" > 
    <img alt="GitHub release (latest by date)" src="https://img.shields.io/chrome-web-store/users/cemnjkfjpieanmfoddiljfildcdipmgc">
</a>

</p>

<h1 align="center">
  <br>
  <img src="screenshot/popup.png" alt="Excalistore">
</h1>

We all love excalidraw but wouldn't be great if you could store multiple drawing locally without leaving your browser?

With Excalistore, you can easily save and organize your Excalidraw drawings as you create them and without leaving your browser.

## Dev

To build the project locally you need: [yarn](https://yarnpkg.com/) and [volta](https://volta.sh/).

### Getting started

Install dependencies with:

```bash
yarn
```

Build the extension locally

```bash
yarn build
```

To load the extension in Chrome navigate to [chrome://extensions](chrome://extensions/) and use the `Load unpacked` button to point to the `dist` folder.
Make sure to re-build after any change to test them in the browser.

## Credits

- [Excalidraw](https://excalidraw.com/)
- [Excalidraw font: Virgil](https://virgil.excalidraw.com/)
