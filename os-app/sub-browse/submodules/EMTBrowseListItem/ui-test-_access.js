const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTBrowseListItem: '.EMTBrowseListItem',

}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EMTBrowseListItem_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTBrowseListItemObject: JSON.stringify({
			}),
		});
	});

	it('shows EMTBrowseListItem', function () {
		browser.assert.elements(EMTBrowseListItem, 1);
	});

});
