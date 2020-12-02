const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	EMTVitrine: '.EMTVitrine',
	
	EMTVitrineIdentity: '.EMTVitrineIdentity',
	EMTVitrineIdentityLogo: '.EMTVitrineIdentityLogo',
	EMTVitrineIdentityName: '.EMTVitrineIdentityName',
	EMTVitrineIdentityBlurb: '.EMTVitrineIdentityBlurb',

	EMTVitrineContent: '.EMTVitrineContent',
	EMTVitrineContentAppButton: '.EMTVitrineContentAppButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTVitrine_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows EMTVitrine', function() {
		browser.assert.elements(EMTVitrine, 1);
	});
	
	it('shows OLSKLanguageSwitcher', function() {
		browser.assert.elements('.OLSKLanguageSwitcher', 1);
	});
	
	it('shows EMTVitrineIdentity', function() {
		browser.assert.elements(EMTVitrineIdentity, 1);
	});
	
	it('shows EMTVitrineIdentityLogo', function() {
		browser.assert.elements(EMTVitrineIdentityLogo, 1);
	});
	
	it('shows EMTVitrineIdentityName', function() {
		browser.assert.elements(EMTVitrineIdentityName, 1);
	});

	it('shows EMTVitrineIdentityBlurb', function () {
		browser.assert.elements(EMTVitrineIdentityBlurb, 1);
	});
	
	it('shows EMTVitrineContent', function() {
		browser.assert.elements(EMTVitrineContent, 1);
	});

	it('shows EMTVitrineContentAppButton', function() {
		browser.assert.elements(EMTVitrineContentAppButton, 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
