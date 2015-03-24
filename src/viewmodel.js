/**
 *
 **/
import can from 'can';
import _ from 'lodash';
import 'can/map/define/';

export default can.Map.extend({
    init: function () {
        this.doSearch = _.debounce( can.proxy(this.doSearch, this), this.attr('debounceDelay') );
    },
    define:{

        /**
         * @property {can.List} autocomplete.scope.results results
         * @description Only true when a selection is intact.
         * @option {can.List} Defaults to `false`.
         */
        results: {
            value: []
        },

        /**
         * @property {can.Map} autocomplete.scope.selectedItem selectedItem
         * @description Only true when a selection is intact.
         * @option {can.Map} Defaults to `false`.
         */
        selectedItem: {
            value: {}
        },

        /**
         * @property {Boolean} autocomplete.scope.validated validated
         * @description Only true when a selection is intact.
         * @option {Boolean} Defaults to `false`.
         */
        validated: {
            value: false,
            type: 'boolean'
        },

        /**
         * @property {string} autocomplete.scope.searchKey searchKey
         * @description The primary key to use in search and displaying.
         * @option {string} Defaults to `label`.
         */
        searchKey:{
            value:'label',
            type: 'string'
        },

        /**
         * @property {number} autocomplete.scope.characterDelay characterDelay
         * @description The number of characters before search calls are made.
         * @option {number} Defaults to `5`.
         */
        characterDelay: {
            value: 5,
            type: 'number'
        },

        /**
         * @property {number} autocomplete.scope.debounceDelay debounceDelay
         * @description The number to delay between calls.
         * @option {number} Defaults to `400` milliseconds.
         */
        debounceDelay: {
            value: 400,
            type: 'number'
        },
    },
    
    /**
     * @description The search model provided through live binding.
     *
     */
    model: {},

    /**
     * @function autocomplete.scope.preFlight preFlight
     * @description Checks if criteria to commit findall has been met, builds and calls search if met.
     * @param {string} search The search string to send to findAll.
     */
    preFlight: function (search) {
        var self = this,
            data = {};
        if (search && search.length >= self.attr('characterDelay')) {
            var searchKey = self.attr('searchKey');

            data[searchKey] = search;

            self.doSearch(data)
        } else {
            if (search.length === 0) {
                self.clearResults();

            }
        }
    },

    /**
     * @function autocomplete.scope.doSearch doSearch
     * @description Does the actual search.
     * @param {string} data The search object for the findAll.
     */
    doSearch: function (data) {
        var self = this,
            Model = self.attr('model'),
            results = self.attr('results'),
            def;

        def = Model.findAll(data);
        results.replace(def);
        def.fail(function(resp) {
            self.clearResults();
        });
    },

    /**
     * @function autocomplete.scope.getItem getItem
     * @description Helper that uses the search key to find the correct display value.
     * @param {object} ctx The scope context.
     * @return {string} The actual display value.
     */
    getItem: function (ctx) {
        if ( !can.isEmptyObject(ctx.attr()) ) {
            var keyName = this.attr('searchKey');
            return ctx.attr(keyName);
        }
        return '';
    },

    /**
     * @function autocomplete.scope.selectItem selectItem
     * @description Does the actual search.
     * @param {object} data The search object for the findAll.
     */
    selectItem: function (ctx) {
        this.attr('validated', true);
        this.attr('selectedItem', ctx);
    },

    /**
     * @function autocomplete.scope.clearResults clearResults
     * @description Clears the results element.
     */
    clearResults: function () {
        this.attr('results',[]);
    },

    /**
     * @function autocomplete.scope.clearSelection clearSelection
     * @description Clears the selection and resets validated to false.
     */
    clearSelection: function () {
        this.attr('validated', false);
        this.attr('selectedItem', {});
    }
});
