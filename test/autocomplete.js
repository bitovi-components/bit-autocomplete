import $ from 'jquery';
import can from 'can';
import QUnit from 'qunitjs';
import 'can/view/stache/';
QUnit.config.autorun = false;

import ViewModel from 'bit-autocomplete';
import SearchModel from './fixture';
//Steal has finished loading at this point so we just need to make sure Testee is ready
if (window.Testee) {
	Testee.init();
}

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
	beforeEach: function () {
		template = can.stache('<bit-autocomplete model="{Search}"></bit-autocomplete>');
		$('#qunit-fixture').append(template({Search:SearchModel}));
		$component = $($('bit-autocomplete'),'#qunit-fixture');
		vm = $component.data('scope');
	}
});

QUnit.test('renders', function () {
	var isVisible = $component.find('.search-container').is(':visible');
	equal($component.length, 1, 'Component rendered');
	equal(isVisible, true, 'Component template rendered');
	
	isVisible = $component.find('.search-field').is(':visible');
	equal(isVisible, true, 'Search input visible');
	
	isVisible = $component.find('.search-results').is(':visible');
	equal(isVisible, false, 'Search results not visible');
});

QUnit.module('searching',{
	beforeEach: function () {
		can.fixture.delay = 0;
		
		template = can.stache('<bit-autocomplete model="{Search}"></bit-autocomplete>');
		$('#qunit-fixture').append(template({Search:SearchModel}));
		$component = $($('bit-autocomplete'),'#qunit-fixture');
		vm = $component.data('scope');
		
		vm.attr('debounceDelay', 0);
		var $input = $component.find('.search-field');
		$input.val('melon');
		$input.trigger('input');
	}
});

QUnit.test('searches', function (assert) {
	var done = assert.async();
	setTimeout(function(){
		equal($component.find('.search-results').length, 1, 'Displays results container');
		equal($component.find('.search-results-item').length, 3, 'Renders the results items.');
		done();
	},100);
	
});

QUnit.module('item selection',{
	beforeEach: function () {
		can.fixture.delay = 0;
		
		template = can.stache('<bit-autocomplete model="{Search}"></bit-autocomplete>');
		$('#qunit-fixture').append(template({Search:SearchModel}));
		$component = $($('bit-autocomplete'),'#qunit-fixture');
		vm = $component.data('scope');
		
		vm.attr('debounceDelay', 0);
		var $input = $component.find('.search-field');
		$input.val('melon');
		$input.trigger('input');
	}
});

QUnit.test('item adds to input', function (assert) {
	var done = assert.async();
	
	setTimeout(function(){
		var $target = $( '.search-results-item', $component).eq(0);
		var targetLabel = $target.text();
		$target.click();
		
		equal($component.find('.search-results').is(':visible'), false, 'Removes results from view.');
		equal($component.find('.search-field').val(), targetLabel, 'Replaced input value with selected value');
		done();
	},100);
});

//Load Qunit
QUnit.load();
