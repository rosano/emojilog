import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTTrack_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	context('EMTTrackStorageWidget', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(EMTTrackStorageWidget, 'EMTTrackStorageWidgetHidden');
		});
	
	});

	context('on create', async function() {

		it('focuses EMTTrackFormNameField', async function() {
			await uCreateItem(browser);

			deepEqual(browser.document.activeElement, browser.query(EMTTrackFormNameField));
		});

	});

});
