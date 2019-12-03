import { deepEqual } from 'assert';

const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

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

describe.skip('EMTTrackFooterStorageStatus', function testEMTTrackFooterStorageStatus () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTTrackFooterStorageStatus: 'alfa',
		});
	});

	it('sets text', function () {
		browser.assert.text(EMTTrackFooterStorageStatus, 'alfa')
	});

});

describe.skip('EMTTrackFooterStorageButton', function testEMTTrackFooterStorageButton () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	before(function () {
		browser.assert.text('#TestEMTTrackFootetDispatchStorage', '0')

		browser.click(EMTTrackFooterStorageButton)
	});
	
	it('has class', function () {
		browser.assert.hasClass(EMTTrackFooterStorageButton, 'OLSKLayoutButtonNoStyle')
		browser.assert.hasClass(EMTTrackFooterStorageButton, 'OLSKLayoutElementTappable')
	});
	
	it('sends EMTTrackFootetDispatchStorage', function () {
		browser.assert.text('#TestEMTTrackFootetDispatchStorage', '1')
	});

});

});
