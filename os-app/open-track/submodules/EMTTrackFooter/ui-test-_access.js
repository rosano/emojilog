const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTTrackFooter: '.EMTTrackFooter',
	
	EMTTrackFooterDonateLink: '.EMTTrackFooterDonateLink',
	
	EMTTrackFooterStorageStatus: '.EMTTrackFooterStorageStatus',
	EMTTrackFooterStorageButton: '.EMTTrackFooterStorageButton',
	EMTTrackFooterStorageButtonImage: '.EMTTrackFooterStorageButtonImage',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTTrackFooter_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMTTrackFooter', function () {
		browser.assert.elements(EMTTrackFooter, 1);
	});

	it('shows OLSKReloadButton', function () {
		browser.assert.elements('.OLSKReloadButton', 1);
	});

	it('shows OLSKLanguageSwitcher', function () {
		browser.assert.elements('.OLSKLanguageSwitcher', 1);
	});

	it('shows EMTTrackFooterDonateLink', function () {
		browser.assert.elements(EMTTrackFooterDonateLink, 1);
	});

	it('shows EMTTrackFooterStorageStatus', function () {
		browser.assert.elements(EMTTrackFooterStorageStatus, 1);
	});

	it('shows EMTTrackFooterStorageButton', function () {
		browser.assert.elements(EMTTrackFooterStorageButton, 1);
	});

	it('shows EMTTrackFooterStorageButtonImage', function () {
		browser.assert.elements(EMTTrackFooterStorageButtonImage, 1);
	});

});
