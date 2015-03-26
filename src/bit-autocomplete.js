/**
 * @module {can.Component} autocomplete Autocomplete
 * @parent components
 * @group autocomplete/events 0 Events
 * @group autocomplete/viewModel 1 ViewModel
 *
 * @author Juan Orozco
 *
 *
 * @description
 * The autocomplete component renders a search `input`. It will search the provided `model` and render a list of results below the search input. When a result is selected, the component will replace the search string with the result.
 *
 *
 * @signature '<bit-autocomplete></bit-autocomplete>'
 *
 * @param {can.Model} model Contains the model to search with.
 * @param {String} search-field-id The ID of the input element.
 * @param {boolean} validited Marks when a selection is made.
 * @param {can.Map} selected-item The selected item object.
 * @param {Number} debounce-delay The amount of time to wait before searching.
 * @param {Number} character-delay The number of characters that must be entered to trigger a search.
 *
 * @body
 *
 * ## Component Initialization
 *
 * ```html
 *   <bit-autocomplete model="{model}"></bit-autocomplete>
 * ```
 *
 * Add the `inputName` and `results` values if needed.
 * ```html
 *   <bit-autocomplete model="{model}" selected-item="{selectedItem}" validated="{validated}"></bit-autocomplete>
 * ```
 *
 * @demo index.html
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
		 * @function autocomplete.events.searchField Search Field Input Event
         * @parent autocomplete/events
         * @description Runs pre flight on input event of search field.
		 * @param {selector} $el The element the event was triggered on.
         */
        '.search-field input': function( $el ) {
			var vm = this.viewModel;
			vm.attr('validated', false);
            vm.preFlight( $el.val() );
        },

        /**
		 * @function autocomplete.events.selectedItem Selected Item Change Event
         * @parent autocomplete/events
         * @description Clears results when a selection is updated.
		 * @param {can.Map} scope The element scope.
		 * @param {string} key The key name of the scope property.
		 * @param {can.Map} item The value.
         */
        '{viewModel} selectedItem': function(scope,key,item) {
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
