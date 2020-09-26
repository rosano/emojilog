const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTBrowseListItem_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTBrowseListItemObject: JSON.stringify({
			}),
		});
	});

});
