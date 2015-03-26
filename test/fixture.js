import $ from "jquery";
import can from "can";
import "can/util/fixture/";
    
var fruits = [
    { label: "Granny Smith Apple"},
    { label: "McIntosh Apple"},
    { label: "Fuji Apple"},
	{ label: "Red Delicious Apple"},
	{ label: "Pink Lady Apple"},
	{ label: "Golden Delcicious Apple"},
	{ label: "Gala Apple"},
	{ label: "Strawberry"},
	{ label: "Orange"},
	{ label: "Plum"},
	{ label: "Blueberry"},
	{ label: "Pear"},
	{ label: "Peach"},
	{ label: "Tomato"},
	{ label: "Fig"},
	{ label: "Watermelon"},
	{ label: "Melon"},
	{ label: "Sprite Melon"},
	{ label: "Lemon"}
];

can.fixture('GET /test', function(req) {
    var filtered = fruits.filter(function(item) {
        return item.label.toLowerCase().indexOf(req.data.label.toLowerCase()) > -1;
    });
    return filtered;
});

var Search = can.Model.extend({
    findAll: "GET /test"
},{});

export default Search;
