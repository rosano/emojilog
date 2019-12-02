import { deepEqual } from 'assert';

const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

Object.entries({
	OLSKReloadButton: '.OLSKReloadButton',

	RCSLanguageSwitcher: '#RCSLanguageSwitcher',
	EMTTrackFooterDonateLink: '.EMTTrackFooterDonateLink',
	
	EMTTrackFooterStorageStatus: '.EMTTrackFooterStorageStatus',
	EMTTrackFooterStorageButton: '.EMTTrackFooterStorageButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTTrackFooter_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('on startup', function() {
		browser.assert.elements(OLSKReloadButton, 1);
		
		browser.assert.elements(RCSLanguageSwitcher, 1);
	});

	it('shows EMTTrackFooterDonateLink', function () {
		browser.assert.elements(EMTTrackFooterDonateLink, 1)
	});

	it('shows EMTTrackFooterStorageStatus', function () {
		browser.assert.elements(EMTTrackFooterStorageStatus, 1)
	});

	it('shows EMTTrackFooterStorageButton', function () {
		browser.assert.elements(EMTTrackFooterStorageButton, 1)
	});

});
