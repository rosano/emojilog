import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTTrackFooter_Misc', function () {

describe('EMTTrackFooterDonateLink', function testEMTTrackFooterDonateLink () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('sets href', function () {
		browser.assert.attribute(EMTTrackFooterDonateLink, 'href', process.env.EMT_SHARED_DONATE_URL)
	});

	it('sets target', function () {
		browser.assert.attribute(EMTTrackFooterDonateLink, 'target', '_blank')
	});

});

describe('EMTTrackFooterStorageStatus', function testEMTTrackFooterStorageStatus () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTTrackFooterStorageStatus: 'alfa',
		});
	});

	it('sets text', function () {
		browser.assert.text(EMTTrackFooterStorageStatus, 'alfa')
	});

});

describe('EMTTrackFooterStorageButton', function testEMTTrackFooterStorageButton () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('sets class', function () {
		browser.assert.hasClass(EMTTrackFooterStorageButton, 'OLSKLayoutButtonNoStyle')
		browser.assert.hasClass(EMTTrackFooterStorageButton, 'OLSKLayoutElementTappable')
	});

	context('click', function () {

		before(function () {
			browser.assert.text('#TestEMTTrackFooterDispatchStorage', '0')
		});

		before(function () {
			browser.click(EMTTrackFooterStorageButton);
		});
	
		it('sends EMTTrackFooterDispatchStorage', function () {
			browser.assert.text('#TestEMTTrackFooterDispatchStorage', '1')
		});
	
	});

});

describe('EMTTrackFooterStorageButtonImage', function testEMTTrackFooterStorageButtonImage () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('sets role', function () {
		browser.assert.attribute(EMTTrackFooterStorageButtonImage, 'role', 'img')
	});
	
	it('sets src', function () {
		browser.assert.attribute(EMTTrackFooterStorageButtonImage, 'src', '/open-track/submodules/EMTTrackFooter/ui-images/EMTTrackFooterStorageButton.svg')
	});

});

});
