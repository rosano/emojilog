const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	describe('EMLVitrine', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(EMLVitrine, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(EMLVitrine, 'OLSKDecorCapped');
		});
	
	});

	describe('EMLVitrineCrown', function test_EMLVitrineCrown() {

		it('classes OLSKCommonCard', function () {
			browser.assert.hasClass(EMLVitrineCrown, 'OLSKCommonCard');
		});

		it('classes OLSKCommonCrownCard', function () {
			browser.assert.hasClass(EMLVitrineCrown, 'OLSKCommonCrownCard');
		});
		
	});

	describe('EMLVitrineCrownIcon', function () {

		it('sets role', function () {
			browser.assert.attribute(EMLVitrineCrownIcon, 'role', 'presentation');
		});

		it('sets src', function () {
			browser.assert.attribute(EMLVitrineCrownIcon, 'src', '/_shared/EMLRootLink/ui-assets/identity.svg');
		});

	});

});
