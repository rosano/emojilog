const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLGuide: '.EMLGuide',

	EMLGuideCrown: '.EMLGuideCrown',
	EMLGuideCrownName: '.EMLGuideCrownName',

	EMLGuideContent: '.EMLGuideContent',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EMLGuide_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMLGuide', function () {
		browser.assert.elements(EMLGuide, 1);
	});

	it('shows EMLGuideCrown', function () {
		browser.assert.elements(EMLGuideCrown, 1);
	});

	it('shows EMLGuideCrownName', function () {
		browser.assert.elements(EMLGuideCrownName, 1);
	});

	it('shows EMLGuideContent', function () {
		browser.assert.elements(EMLGuideContent, 1);
	});

	it('shows EMLRootLink', function () {
		browser.assert.elements('.EMLRootLink', 1);
	});

});
