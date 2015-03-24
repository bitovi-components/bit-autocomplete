import $ from 'jquery';
import can from 'can';
import QUnit from 'steal-qunit';
import 'can/view/stache/';

import ViewModel from 'bit-autocomplete';
import SearchModel from './fixture';

var vm, template, $component;

QUnit.module('bit-autocomplete view model');

QUnit.test('basics', function(){
	vm = new ViewModel({});
	
	equal( vm.attr('results').length, 0, 'Results array is empty');
	equal( can.isEmptyObject(vm.attr('selectedItem').attr()), true, 'Selected object is empty');
	equal( vm.attr('validated'), false, 'Validated is set to false');
	equal( vm.attr('searchKey'), 'label', 'Search key default is label.');
	equal( vm.attr('characterDelay'), 5, 'Character delay default is 5.');
	equal( vm.attr('debounceDelay'), 400, 'Debounce delay is 400 ms.');
});


QUnit.module('bit-autocomplete component',{
	setup: function(){
		template = can.stache('<bit-autocomplete></bit-autocomplete>');
		$('#qunit-fixture').append(template());
		$component = $($('bit-autocomplete'),'#qunit-fixture');
		vm = $component.data('scope');
	}
});

QUnit.test('renders', function(){
	var isVisible = $component.find('.search-container').is(':visible');
	equal($component.length, 1, 'Component rendered');
	equal(isVisible, true, 'Component template rendered');
});
