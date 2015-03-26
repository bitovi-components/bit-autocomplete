import can from 'can';
import _ from 'lodash';
import 'can/map/define/';

export default can.Map.extend({
    define:{

        /**
         * @property {can.List} autocomplete.viewModel.results results
         * @parent autocomplete/viewModel
         * @description Only true when a selection is intact.
         * @option {can.List} Defaults to `false`.
         */
        results: {
            value: []
        },

        /**
         * @property {can.Map} autocomplete.viewModel.selectedItem selectedItem
         * @parent autocomplete/viewModel
         * @description Only true when a selection is intact.
         * @option {can.Map} Defaults to `false`.
         */
        selectedItem: {
            value: {}
        },

        /**
         * @property {Boolean} autocomplete.viewModel.validated validated
         * @parent autocomplete/viewModel
         * @description Only true when a selection is intact.
         * @option {Boolean} Defaults to `false`.
         */
        validated: {
            value: false,
            type: 'boolean'
        },

        /**
         * @property {String} autocomplete.viewModel.searchKey searchKey
         * @parent autocomplete/viewModel
         * @description The primary key to use in search and displaying.
         * @option {String} Defaults to `label`.
         */
        searchKey:{
            value:'label',
            type: 'string'
        },

        /**
         * @property {number} autocomplete.viewModel.characterDelay characterDelay
         * @parent autocomplete/viewModel
         * @description The number of characters before search calls are made.
         * @option {number} Defaults to `5`.
         */
        characterDelay: {
            value: 3,
            type: 'number'
        },

        /**
         * @property {number} autocomplete.viewModel.debounceDelay debounceDelay
         * @parent autocomplete/viewModel
         * @description The number to delay between calls.
         * @option {number} Defaults to `250` milliseconds.
         */
        debounceDelay: {
            value: 250,
            type: 'number',
            set: function(newVal){
                this.doSearch = _.debounce( can.proxy(this.search, this), newVal );
            }
        },

        /**
         * @property {String} autocomplete.viewModel.searchFieldId searchFieldId
         * @parent autocomplete/viewModel
         * @description The ID for the input element.
         * @option {String} Defaults to autocomplete with a random number suffix.
         */
         searchFieldId: {
            value: function () {
                return 'autocomplete' + Math.floor( Math.random() * 1000000 );
            },
            type: 'string'
         }
    },

    /**
     * @property {can.Map} autocomplete.viewModel.model model
     * @description The search model provided through live binding.
     * @parent autocomplete/viewModel
     *
     */
    model: {},

    /**
     * @function autocomplete.viewModel.preFlight preFlight
     * @parent autocomplete/viewModel
     * @description Checks if criteria to commit findall has been met, builds and calls search if met.
     * @param {String} search The search string to send to findAll.
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
     * @function autocomplete.viewModel.search doSearch
     * @parent autocomplete/viewModel
     * @description Debounced search.
     * @param {String} data The search object for the findAll.
     */
    doSearch: function(){},

    /**
     * @function autocomplete.viewModel.search search
     * @parent autocomplete/viewModel
     * @description Does the actual search.
     * @param {String} data The search object for the findAll.
     */
    search: function (data) {
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
     * @parent autocomplete/viewModel
     * @description Helper that uses the search key to find the correct display value.
     * @param {object} ctx The scope context.
     * @return {String} The actual display value.
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
     * @parent autocomplete/viewModel
     * @description Does the actual search.
     * @param {object} data The search object for the findAll.
     */
    selectItem: function (ctx) {
        this.attr('validated', true);
        this.attr('selectedItem', ctx);
    },

    /**
     * @function autocomplete.scope.clearResults clearResults
     * @parent autocomplete/viewModel
     * @description Clears the results element.
     */
    clearResults: function () {
        this.attr('results',[]);
    },

    /**
     * @function autocomplete.scope.clearSelection clearSelection
     * @parent autocomplete/viewModel
     * @description Clears the selection and resets validated to false.
     */
    clearSelection: function () {
        this.attr('validated', false);
        this.attr('selectedItem', {});
    }
});
