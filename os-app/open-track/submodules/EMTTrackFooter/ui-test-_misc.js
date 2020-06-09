const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTTrackFooter_Misc', function () {


	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('EMTTrackFooter', function test_EMTTrackFooter () {

		it('classes OLSKMobileViewFooter', function () {
			browser.assert.hasClass(EMTTrackFooter, 'OLSKMobileViewFooter');
		});

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(EMTTrackFooter, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(EMTTrackFooter, 'OLSKToolbarJustify');
		});

	});

	describe('EMTTrackFooterDonateLink', function test_EMTTrackFooterDonateLink () {

		it('sets href', function () {
			browser.assert.attribute(EMTTrackFooterDonateLink, 'href', process.env.EMT_SHARED_DONATE_URL);
		});

		it('sets target', function () {
			browser.assert.attribute(EMTTrackFooterDonateLink, 'target', '_blank');
		});

	});

	describe('EMTTrackFooterStorageStatus', function test_EMTTrackFooterStorageStatus () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackFooterStorageStatus: 'alfa',
			});
		});

		it('sets text', function () {
			browser.assert.text(EMTTrackFooterStorageStatus, 'alfa');
		});

	});

	describe('EMTTrackFooterStorageButton', function test_EMTTrackFooterStorageButton () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
	
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(EMTTrackFooterStorageButton, 'OLSKLayoutButtonNoStyle');
		});
	
		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(EMTTrackFooterStorageButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMTTrackFooterDispatchStorage', '0');
			});

			before(function () {
				browser.click(EMTTrackFooterStorageButton);
			});
	
			it('sends EMTTrackFooterDispatchStorage', function () {
				browser.assert.text('#TestEMTTrackFooterDispatchStorage', '1');
			});
	
		});

	});

	describe('EMTTrackFooterStorageButtonImage', function test_EMTTrackFooterStorageButtonImage () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
	
		it('sets src', function () {
			browser.assert.elements(`${ EMTTrackFooterStorageButtonImage } #_OLSKSharedCloud`, 1);
		});
	
	});

});
