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

		it('classes OLSKCommonCrownCardMini', function () {
			browser.assert.hasClass(EMLVitrineCrown, 'OLSKCommonCrownCardMini');
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

	context('OLSKLanding', function test_OLSKLanding () {

		it('sets OLSKLandingActionHref', function () {
			browser.assert.attribute('.OLSKLandingAction', 'href', OLSKTestingCanonical(require('../open-track/controller.js').OLSKControllerRoutes().shift()));
		});
	
	});

});
