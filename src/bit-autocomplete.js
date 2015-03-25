/**
 * @module {can.Component} autocomplete Autocomplete
 * @parent components
 * @author Juan Orozco
 *
 *
 * @description
 * The autocomplete component renders a search `input`. It will search the provided `model` and render a list of results below the search input. When a result is selected, the component will replace the search string with the result.
 *
 *
 * @signature '<pui-autocomplete></pui-autocomplete>'
 *
 * @param {can.Model} model Contains the model to search with.
 * @param {String} searchFieldId The ID of the input element.
 * @param {boolean} validited Marks when a selection is made.
 * @param {can.Map} selectedItem The selected item object.
 *
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 *   <pui-autocomplete model="{model}"></pui-autocomplete>
 * ```
 *
 * Add the `inputName` and `results` values if needed.
 * ```html
 *   <pui-autocomplete model="{model}" selected-item="{selectedItem}" validated="{validated}"></pui-autocomplete>
 * ```
 *
 * @demo ./index.html
 */
import can from 'can';
import 'can/view/stache/';
import template from './autocomplete.stache!';
import './autocomplete.less!';

import ViewModel from './viewmodel';

can.Component.extend({
	tag: 'bit-autocomplete',
	template: template,
	viewModel: ViewModel,
    events: {
		
        /**
         * @description Runs pre flight on input event of search field.
         */
        '.search-field input': function( $el ) {
			var vm = this.viewModel;
			vm.attr('validated', false);
            vm.preFlight( $el.val() );
        },
		
        /**
         * @description Clears results when a selection is updated.
         *
         */
        '{viewModel} selectedItem': function(a,b,item) {
            var searchKey = this.viewModel.attr('searchKey'),
                newItem = item.attr(searchKey);
            if (newItem){
                this.element.find('.search-field').val(newItem);
                this.viewModel.clearResults();
            }
        }
    }
});

export default ViewModel;
