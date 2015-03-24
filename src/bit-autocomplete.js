/**
 *
 **/
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
