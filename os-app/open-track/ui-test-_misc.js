import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTTrack_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('EMTTrackStorageWidget', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(EMTTrackStorageWidget, 'EMTTrackStorageWidgetHidden');
		});

		context('click EMTTrackFooterStorageButton', function () {
			
			before(function () {
				return browser.pressButton('.EMTTrackFooterStorageButton');
			});
			
			it('sets class', function () {
				browser.assert.hasNoClass(EMTTrackStorageWidget, 'EMTTrackStorageWidgetHidden');
			});
		
		});
	
	});

	context('on create', function() {

		before(function () {
			return browser.pressButton(EMTTrackMasterCreateButton);
		});

		it('sets document.activeElement', function() {
			deepEqual(browser.document.activeElement, browser.query('.EMTTrackDetailFormNameField'));
		});

	});

});
