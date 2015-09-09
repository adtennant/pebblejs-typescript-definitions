# pebblejs-typescript-definitions
Provides [TypeScript](http://www.typescriptlang.org/) definitions and constant values for [Pebble.js](https://github.com/pebble/pebblejs) to allow you to write strongly typed Pebble apps using TypeScript.

## Usage
This repository consists of two files:
* pebblejs.d.ts - Provides TypeScript definitions for the documented parts of Pebble.js.
* pebble.consts.ts - Provides a number of `const` values which can be used to replace string values passed to Pebble.js functions (e.g. `COLOR_BLACK` instead of `'black'`, or `VIBE_SHORT` instead of `'short'`). This file is optional.

Include pebblejs.d.ts (and pebble.consts.ts if you want to use it) in the `/src/js` folder of your Pebble.js project, then make sure you compile your TypeScript files with `--module 'commonjs'` before building your project.

## Example

```
import UI = require('ui');
import Consts = require('pebblejs.consts');

var card = new UI.Card({
    title: 'Hello World',
    body: 'This is your first Pebble app!',
    scrollable: true,
    backgroundColor: Consts.COLOR_PICTON_BLUE
});

card.on(Consts.WINDOW_CLICK, function(e) {
    card.subtitle('Button ' + e.button + ' clicked!');
});

card.show();
```
