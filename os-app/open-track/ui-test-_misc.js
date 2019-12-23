import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTTrack_Misc', function () {

	describe('EMTTrackMaster', function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
		
		it('sets class', function () {
			browser.assert.hasNoClass('.EMTTrackMaster', 'OLSKMobileViewInactive');
		});

		context('create', function() {

			before(function () {
				return browser.pressButton(EMTTrackMasterCreateButton);
			});

			it('sets class', function() {
				browser.assert.hasClass('.EMTTrackMaster', 'OLSKMobileViewInactive');
			});

		});

		context('back', function() {

			before(function () {
				return browser.pressButton(EMTTrackDetailToolbarBackButton);
			});

			it('sets class', function() {
				browser.assert.hasNoClass('.EMTTrackMaster', 'OLSKMobileViewInactive');
			});

		});
	
	});

	describe('EMTTrackDetail', function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
		
		it('sets class', function () {
			browser.assert.hasClass('.EMTTrackDetail', 'OLSKMobileViewInactive');
		});

		context('create', function() {

			before(function () {
				return browser.pressButton(EMTTrackMasterCreateButton);
			});

			it('sets class', function() {
				browser.assert.hasNoClass('.EMTTrackDetail', 'OLSKMobileViewInactive');
			});

		});

		context('back', function() {

			before(function () {
				return browser.pressButton(EMTTrackDetailToolbarBackButton);
			});

			it('sets class', function() {
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

		it('sets class', function () {
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

		it('sets document.activeElement', function() {
			deepEqual(browser.document.activeElement, browser.query('.EMTTrackDetailFormNameField'));
		});

	});

});
