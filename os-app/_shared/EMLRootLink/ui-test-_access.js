const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLRootLink: '.EMLRootLink',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EMLRootLink_Access', function () {
	
	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows EMLRootLink', function() {
		browser.assert.elements(EMLRootLink, 1);
	});
	
	it('shows OLSKRootLink', function() {
		browser.assert.elements('.OLSKRootLink', 1);
	})
	
});
