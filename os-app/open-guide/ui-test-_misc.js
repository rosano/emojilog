const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLGuide_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('EMLGuide', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(EMLGuide, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(EMLGuide, 'OLSKDecorCapped');
		});
	
	});

	describe('EMLGuideCrown', function test_EMLGuideCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(EMLGuideCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCard', function () {
			browser.assert.hasClass(EMLGuideCrown, 'OLSKCommonCrownCard');
		});
		
	});

});
