const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	it('assigns meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width');
	});

	describe('EMTVitrine', function () {
		
		it('classes OLSKCommon', function () {
			browser.assert.hasClass(EMTVitrine, 'OLSKCommon');
		});
	
	});

	describe('EMTVitrineIdentityLogo', function () {
		
		it('sets role', function () {
			browser.assert.attribute(EMTVitrineIdentityLogo, 'role', 'presentation');
		});
		
		it('sets src', function () {
			browser.assert.attribute(EMTVitrineIdentityLogo, 'src', '/_shared/EMTRootLink/ui-assets/identity.svg');
		});
	
	});

});
