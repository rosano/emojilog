const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLFeatureList: '.EMLFeatureList',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMLFeatureList_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows EMLFeatureList', function() {
		browser.assert.elements(EMLFeatureList, 1);
	});
	
	it('shows OLSKFeatureList', function() {
		browser.assert.elements('.OLSKFeatureList', 1);
	});
	
});
