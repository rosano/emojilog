import { deepEqual } from 'assert';

const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	EMTVitrine: '.EMTVitrine',
	
	EMTVitrineIdentity: '.EMTVitrineIdentity',
	EMTVitrineIdentityIcon: '.EMTVitrineIdentityIcon',
	EMTVitrineIdentityName: '.EMTVitrineIdentityName',

	EMTVitrineContent: '.EMTVitrineContent',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTVitrine_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows EMTVitrine', function() {
		browser.assert.elements(EMTVitrine, 1)
	});
	
	it('shows RCSLanguageSwitcher', function() {
		browser.assert.elements('#RCSLanguageSwitcher', 1)
	});
	
	it('shows EMTVitrineIdentity', function() {
		browser.assert.elements(EMTVitrineIdentity, 1)
	});
	
	it('shows EMTVitrineIdentityIcon', function() {
		browser.assert.elements(EMTVitrineIdentityIcon, 1)
	});
	
	it('shows EMTVitrineIdentityName', function() {
		browser.assert.elements(EMTVitrineIdentityName, 1)
	});
	
	it('shows EMTVitrineContent', function() {
		browser.assert.elements(EMTVitrineContent, 1)
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1)
	});

});
