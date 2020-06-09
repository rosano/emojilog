const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTTrack_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('assigns link:apple-touch-icon', function () {
		browser.assert.attribute('link[rel=apple-touch-icon]', 'href', process.env.EMT_TOUCH_ICON_URL);
	});
	
	it('assigns meta:viewport', function () {
		browser.assert.attribute('meta[name=viewport]', 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
	});
	
	it('assigns meta:mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=mobile-web-app-capable]', 'content', 'yes');
	});
	
	it('assigns meta:apple-mobile-web-app-capable', function () {
		browser.assert.attribute('meta[name=apple-mobile-web-app-capable]', 'content', 'yes');
	});

	describe('EMTTrackMaster', function test_EMTTrackMaster () {

		it('classes OLSKMobileViewInactive', function () {
			browser.assert.hasNoClass('.EMTTrackMaster', 'OLSKMobileViewInactive');
		});

		context('create', function() {

			before(function () {
				return browser.pressButton(EMTTrackMasterCreateButton);
			});

			it('classes OLSKMobileViewInactive', function() {
				browser.assert.hasClass('.EMTTrackMaster', 'OLSKMobileViewInactive');
			});

		});

		context('back', function() {

			before(function () {
				return browser.pressButton(EMTTrackDetailToolbarBackButton);
			});

			it('classes OLSKMobileViewInactive', function() {
				browser.assert.hasNoClass('.EMTTrackMaster', 'OLSKMobileViewInactive');
			});

		});
	
	});

	describe('EMTTrackDetail', function test_EMTTrackDetail () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
		
		it('classes OLSKMobileViewInactive', function () {
			browser.assert.hasClass('.EMTTrackDetail', 'OLSKMobileViewInactive');
		});

		context('create', function() {

			before(function () {
				return browser.pressButton(EMTTrackMasterCreateButton);
			});

			it('classes OLSKMobileViewInactive', function() {
				browser.assert.hasNoClass('.EMTTrackDetail', 'OLSKMobileViewInactive');
			});

		});

		context('back', function() {

			before(function () {
				return browser.pressButton(EMTTrackDetailToolbarBackButton);
			});

			it('classes OLSKMobileViewInactive', function() {
				browser.assert.hasClass('.EMTTrackDetail', 'OLSKMobileViewInactive');
			});

		});
	
	});

	describe('EMTTrackStorageWidget', function test_EMTTrackStorageWidget () {
		
		it('classes EMTTrackStorageWidgetHidden', function () {
			browser.assert.hasClass(EMTTrackStorageWidget, 'EMTTrackStorageWidgetHidden');
		});

		context('click OLSKAppToolbarStorageButton', function () {
			
			before(function () {
				return browser.pressButton('.OLSKAppToolbarStorageButton');
			});
			
			it('classes EMTTrackStorageWidgetHidden', function () {
				browser.assert.hasNoClass(EMTTrackStorageWidget, 'EMTTrackStorageWidgetHidden');
			});
		
		});
	
	});

	describe('EMTTrackViewportFooter', function test_EMTTrackViewportFooter () {

		it('classes OLSKMobileViewFooter', function () {
			browser.assert.hasClass(EMTTrackViewportFooter, 'OLSKMobileViewFooter');
		});

	});

	describe('OLSKAppToolbar', function test_OLSKAppToolbar () {

		it('sets OLSKAppToolbarDonateURL', function () {
			browser.assert.attribute('.OLSKAppToolbarDonateLink', 'href', process.env.EMT_SHARED_DONATE_URL);
		});

	});

	context('create', function() {

		before(function () {
			return browser.pressButton(EMTTrackMasterCreateButton);
		});

		it('focuses EMTTrackDetailFormNameField', function() {
			browser.assert.hasFocus('.EMTTrackDetailFormNameField');
		});

	});

});
