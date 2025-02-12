<div align="center">
<img src="src/assets//icons//color/32.png" alt="logo"/>
<h1>ClerkShortcutPRO<br/></h1>

![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![](https://badges.aleen42.com/src/vitejs.svg)
</div>

## Intro <a name="intro"></a>

ClerkShotcutPro is a assistant tool for Clerk. It is a chrome extension that helps you to work more efficiently by providing various functions such as client infomation at a glance!

## Install <a name="install"></a>
Clone this repository and run `npm install` to install the dependencies.

**Build the project**
`````
npm run build
`````

### For Chrome: <a name="chrome"></a>

1. Open Chrome and go to the extensions page (`chrome://extensions`)
2. Enable Developer Mode
3. Click on "Load unpacked"
4. Select the `dist` folder in this project directory

### For Firefox: <a name="firefox"></a>

TBA

## Structure <a name="structure"></a>

### Chrome Extension <a name="chrome-extension"></a>

- `manifest.js` - manifest for chrome extension
- `extension/background.ts` - [background script](https://developer.chrome.com/docs/extensions/mv3/background_pages/) for chrome
  extension (`background.service_worker` in
  manifest.json)
- `extension/content.ts` - [content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/) for chrome
  extension (`content_scripts` in manifest.json)

- `extension/webResources/*` - Injected resources for chrome extension (`web_accessible_resources` in manifest.json)

---

Made by [Johannes](https://github.com/johannes67890) :)