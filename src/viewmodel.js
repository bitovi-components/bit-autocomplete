import can from 'can';
import _ from 'lodash';
import 'can/map/define/';

export default can.Map.extend({
    init: function () {
        this.doSearch = _.debounce( can.proxy(this.doSearch, this), this.attr('debounceDelay') );
    },
    define:{
        
        /**
         *
         *
         */
        results: {
            value: []
        },
        
        /**
         *
         *
         */
        selectedItem: {
            value: {}
        },

        /**
         * @function autocomplete.scope.validated validated
         * @description When a validated selection has been made, false when valid selection is manipulated or cleared.
         * @return {Boolean}
         */
        validated: {
            value: false,
            type: 'boolean'
        },
        
        /**
         *
         *
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
     *
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
     *
     *
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
     *
     *
     */
    getItem: function (ctx) {
        if ( !can.isEmptyObject(ctx.attr()) ) {
            var keyName = this.attr('searchKey');
            return ctx.attr(keyName);
        }
        return '';
    },
    
    /**
     *
     *
     */
    selectItem: function (ctx) {
        this.attr('validated', true);
        this.attr('selectedItem', ctx);
    },
    
    /**
     *
     *
     */
    clearResults: function () {
        this.attr('results',[]);
    },
    
    /**
     *
     *
     */
    clearSelection: function () {
        this.attr('validated', false);
        this.attr('selectedItem', {});
    }
});
