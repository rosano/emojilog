import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTTrackStorageWidget: '#EMTTrackStorageWidget',

	async uCreateItem (browser) {
		browser.pressButton(EMTTrackMasterCreateButton);
		await browser.wait({ element: '.EMTTrackMasterListItem' });
	},
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTTrack_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMTTrackMaster', function () {
		browser.assert.elements('.EMTTrackMaster', 1);
	});

	it('shows EMTTrackUnit', function () {
		browser.assert.elements('.EMTTrackUnit', 1);
	});

	it('shows EMTTrackUnitPlaceholder', function () {
		browser.assert.elements('.EMTTrackUnitPlaceholder', 1);
	});

	it('shows EMTTrackFooter', function () {
		browser.assert.elements('.EMTTrackFooter', 1);
	});

	it('shows EMTTrackStorageWidget', function () {
		browser.assert.elements(EMTTrackStorageWidget, 1);
	});

	context('create', function () {
		
		before(function () {
			return browser.pressButton(EMTTrackMasterCreateButton);
		});

		it('shows EMTTrackMasterListItem', function () {
			browser.assert.elements('.EMTTrackMasterListItem', 1);
		});

		it('hides EMTTrackUnitPlaceholder', function () {
			browser.assert.elements('.EMTTrackUnitPlaceholder', 0);
		});
	
	});

	context('delete', function () {

		context('cancel', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					browser.pressButton('.EMTTrackUnitToolbarDiscardButton');
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});
			});

			it('hides EMTTrackUnitPlaceholder', function () {
				browser.assert.elements('.EMTTrackUnitPlaceholder', 0);
			});
		
		});

		context('confirm', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.EMTTrackUnitToolbarDiscardButton');
				});
			});

			it('hides EMTTrackMasterListItem', function () {
				browser.assert.elements('.EMTTrackMasterListItem', 0);
			});

			it('shows EMTTrackUnitPlaceholder', function () {
				browser.assert.elements('.EMTTrackUnitPlaceholder', 1);
			});
		
		});
		
	});

});
