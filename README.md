<!--
@page autocomplete Autocomplete

-->
# Autocomplete

`bit-autocomplete` is an auto-suggest/auto-complete/search control.  It searches a model on a specified key and renders the results as a list below the search field.  The search itself is debounced and delayed. By default, it will wait for 5 characters before doing a search and will then wait 400 milliseconds between keystrokes before doing another search.

## Usage

There are three builds within the `dist` folder, "amd", "cjs", and "global". Use whichever is necessary using your method of choice.

Once the js file is loaded, adding `<bit-autocomplete></bit-autocomplete>` to your template will add an autocomplete component with full functionality. 

`bit-autocomplete` only requires a search model object passed to it. It assumes that it will need to search the `label` property of objects, so it will pass something like `{ label: "apple"}` to the `findAll` method of the model.  This can be changed during instantiation of the component.

If a selection needs to be monitored, live-bind to the `validated` property.

Once the user selects an item from the results list, the object is copied to the `selectedItem` property and the search field is updated with the actual selected item's value.

## Dependancies

The only dependancy in use, other than CanJS, is [Lo-Dash](https://lodash.com/). It is used for debouncing.

## Grunt

There are three simple tasks in the Gruntfile, `server`, `build`, `docs` and `test`.

- Server: Runs a simple server. Can run the test file manually and review the component's demo file (index.html).
- Build: Builds the component distributions.
- Docs: Runs DocumentJS to build documentation.
- Test: Runs the QUnit tests for the component.
