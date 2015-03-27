# bit-autocomplete

[![Build Status](https://travis-ci.org/bitovi-components/bit-autocomplete.svg?branch=master)](https://travis-ci.org/bitovi-components/bit-autocomplete)

An auto-suggest/auto-complete widget for CanJS that can be loaded by:

- StealJS + ES6
- npm / Browserify / CJS
- RequireJS / AMD
- Standalone

It searches a model on a specified key and renders the results as a list below the search field. The search itself is debounced and delayed. By default, it will wait for 3 characters before doing a search and will then wait 250 milliseconds between keystrokes before doing another search.

## Install

```bash
npm install bit-autocomplete --save
```

## Usage

`bit-autocomplete` only requires a search model object passed to it. It assumes that it will need to search the `label` property of objects, so it will pass something like `{ label: "apple"}` to the `findAll` method of the model. This can be changed during instantiation of the component by specifying the `search-key` attribute.

If a selection needs to be monitored, live-bind to the `validated` property.

Once the user selects an item from the results list, it will be available as the `selectedItem` property of the viewModel and the search field is updated with the selected item's value.

##Install

### ES6

With StealJS, you can import this module directly in a template that is autorendered:

```html
<script type="text/stache" id="demo" can-autorender>
	<can-import from="bit-autocomplete"/>
	<bit-autocomplete model="{model}"></bit-autocomplete>
</script>

<script src="./node_modules/steal/steal.js"
	main="can/view/autorender/">

	import can from "can";
	import MyModel from "models/myModel/";

	can.$("#demo").viewModel().attr({
		model: MyModel
	});
</script>
```

Alternatively, you can import this module like:

```js
import "bit-tabs";
import MyModel from "models/myModel/";
import can from "can";
import $ from "jquery";
import stache from "can/view/stache/stache";

var template = stache('<bit-autocomplete model="{model}"></bit-autocomplete>');

$("body").append(template({
	model: MyModel
}));

```

## CJS

Use `require` to load `bit-autocomplete` and everything else
needed to create a template that uses `bit-autocomplete`:

```js
var can = require("canjs");
var $ = require("jquery");
var MyModel = require("models/myModel");

// Add's bit-autocomplete tag
require("bit-autocomplete");
// Use stache
require("canjs/view/stache/stache");

var template = stache('<bit-autocomplete model="{model}"></bit-autocomplete>');

$("body").append(template({
	model: MyModel
}));

```

## AMD use

Configure the `can` and `jquery` paths and the `bit-autocomplete` package:

```html
<script src="require.js"></script>
<script>
	require.config({
	    paths: {
	        "jquery": "node_modules/jquery/dist/jquery",
	        "can": "node_modules/canjs/dist/amd/can"
	    },
	    packages: [{
	    	name: 'bit-autocomplete',
	    	location: 'node_modules/bit-autocomplete/dist/amd',
	    	main: 'autocomplete'
	    }]
	});
	require(["main-amd"], function(){});
</script>
```

Make sure you have the `css` plugin configured also!

Use bit-autocomplete like:

```js
define(["can", "jquery", "models/myModel", "can/view/stache", "bit-tabs"], function(can, $, MyModel){
	var template = stache('<bit-autocomplete model="{model}"></bit-autocomplete>');

	$("body").append(template({
		model: MyModel
	}));
});
```

## Standalone use

Load the `global` css and js files:

```html
<link rel="stylesheet" type="text/css"
      href="./node_modules/bit-autocomplete/dist/global/bit-autocomplete.css">

<script src='./node_modules/jquery/dist/jquery.js'></script>
<script src='./node_modules/canjs/dist/can.jquery.js'></script>
<script src='./node_modules/canjs/dist/can.stache.js'></script>
<script src='./node_modules/bit-autocomplete/dist/global/bit-autocomplete.js'></script>
<script src='./models/myModel.js'></script>
<script id='main-stache' text='text/stache'>
  <bit-autocomplete model="{model}"></bit-autocomplete>
</script>
<script>
  $("body").append( can.view("main-stache",{
  	model: app.MyModel
  }) );
</script>
```
