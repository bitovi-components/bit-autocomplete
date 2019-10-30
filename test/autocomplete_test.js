import $ from 'jquery';
import can from 'can';
import QUnit from 'steal-qunit';
import 'can/view/stache/';

import ViewModel from 'bit-autocomplete';
import SearchModel from './fixture';

var vm, template, $component;

QUnit.module('bit-autocomplete view model');

QUnit.test('basics', function(assert) {
	vm = new ViewModel({});

	assert.equal( vm.attr('results').length, 0, 'Results array is empty');
	assert.equal( can.isEmptyObject(vm.attr('selectedItem').attr()), true, 'Selected object is empty');
	assert.equal( vm.attr('validated'), false, 'Validated is set to false');
	assert.equal( vm.attr('searchKey'), 'label', 'Search key default is label.');
	assert.equal( vm.attr('characterDelay'), 3, 'Character delay default is 3.');
	assert.equal( vm.attr('debounceDelay'), 250, 'Debounce delay is 250 ms.');
});

QUnit.module('bit-autocomplete component',{
	beforeEach: function () {
		template = can.stache('<bit-autocomplete model="{Search}"></bit-autocomplete>');
		$('#qunit-fixture').append(template({Search:SearchModel}));
		$component = $($('bit-autocomplete'),'#qunit-fixture');
		vm = can.viewModel($component);
	}
});

QUnit.test('renders', function(assert) {
	assert.equal($component.length, 1, 'Component rendered');
	assert.ok($component.find('.search-container').is(':visible'), 'Component template rendered');
	assert.ok($component.find('.search-field').is(':visible'), 'Search input visible');
	assert.ok($component.find('.search-results').not(':visible'), 'Search results not visible');
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
		assert.equal($component.find('.search-results').length, 1, 'Displays results container');
		assert.equal($component.find('.search-results-item').length, 3, 'Renders the results items.');
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

		assert.equal($component.find('.search-results').is(':visible'), false, 'Removes results from view.');
		assert.equal($component.find('.search-field').val(), targetLabel, 'Replaced input value with selected value');
		done();
	},100);
});
