const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	describe('EMTVitrine', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(EMTVitrine, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(EMTVitrine, 'OLSKDecorCapped');
		});
	
	});

	describe('EMTVitrineCrown', function test_EMTVitrineCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(EMTVitrineCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCard', function () {
			browser.assert.hasClass(EMTVitrineCrown, 'OLSKCommonCrownCard');
		});
		
	});

	describe('EMTVitrineCrownIcon', function () {

		it('sets role', function () {
			browser.assert.attribute(EMTVitrineCrownIcon, 'role', 'presentation');
		});

		it('sets src', function () {
			browser.assert.attribute(EMTVitrineCrownIcon, 'src', '/_shared/EMTRootLink/ui-assets/identity.svg');
		});

	});

});
