const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	describe('EMTVitrine', function () {
		
		it('classes OLSKCommon', function () {
			browser.assert.hasClass(EMTVitrine, 'OLSKCommon');
		});

		it('classes OLSKCommonCapped', function () {
			browser.assert.hasClass(EMTVitrine, 'OLSKCommonCapped');
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
