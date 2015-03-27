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
	equal( vm.attr('characterDelay'), 3, 'Character delay default is 3.');
	equal( vm.attr('debounceDelay'), 250, 'Debounce delay is 250 ms.');
});

QUnit.module('bit-autocomplete component',{
	beforeEach: function () {
		template = can.stache('<bit-autocomplete model="{Search}"></bit-autocomplete>');
		$('#qunit-fixture').append(template({Search:SearchModel}));
		$component = $($('bit-autocomplete'),'#qunit-fixture');
		vm = can.viewModel($component);
	}
});

QUnit.test('renders', function () {
	equal($component.length, 1, 'Component rendered');
	ok($component.find('.search-container').is(':visible'), 'Component template rendered');
	ok($component.find('.search-field').is(':visible'), 'Search input visible');
	ok($component.find('.search-results').not(':visible'), 'Search results not visible');
});

QUnit.module('searching',{
	beforeEach: function () {
		can.fixture.delay = 0;

		template = can.stache('<bit-autocomplete model="{Search}"></bit-autocomplete>');
		$('#qunit-fixture').append(template({Search:SearchModel}));
		$component = $($('bit-autocomplete'),'#qunit-fixture');
		vm = $component.data('scope');

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
	}, 260);
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
