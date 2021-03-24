const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	it('sets manifest', function () {
		browser.assert.attribute('link[rel="manifest"]', 'href', require('../tech-manifest/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
	});

	describe('EMLVitrine', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(EMLVitrine, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(EMLVitrine, 'OLSKDecorCapped');
		});
	
	});

	describe('EMLVitrineToolbar', function () {
		
		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(EMLVitrineToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(EMLVitrineToolbar, 'OLSKToolbarJustify');
		});

		it('classes OLSKStickyHeader', function () {
			browser.assert.hasClass(EMLVitrineToolbar, 'OLSKStickyHeader');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(EMLVitrineToolbar, 'OLSKCommonEdgeBottom');
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

	describe('OLSKLanding', function test_OLSKLanding () {

		it('sets OLSKLandingActionHref', function () {
			browser.assert.attribute('.OLSKLandingAction', 'href', OLSKTestingCanonical(require('../open-track/controller.js').OLSKControllerRoutes().shift()));
		});
	
	});

	describe('OLSKAppFeaturesList', function test_OLSKAppFeaturesList () {

		it('shows OLSKAppFeatureOpenSource', function () {
			browser.assert.attribute('.OLSKAppFeatureListItemOpenSource a', 'href', process.env.OLSK_REPO_URL);
		});
	
	});

	describe('EMLVitrineVideo', function () {

		it('sets src', function () {
			browser.assert.attribute(EMLVitrineVideo, 'src', process.env.EML_VITRINE_VIDEO_URL);
		});

		it('sets allowfullscreen', function () {
			browser.assert.attribute(EMLVitrineVideo, 'allowfullscreen', '');
		});

	});

});
