import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTTrackMaster: '.EMTTrackMaster',

	EMTTrackDetailPlaceholderContainer: '.PlaceholderContainer',

	EMTTrackDetailToolbar: '#EMTTrackDetailToolbar',
	EMTTrackDetailToolbarBackButton: '#EMTTrackDetailToolbarBackButton',

	EMTTrackDetailToolbarDiscardButton: '#EMTTrackDetailToolbarDiscardButton',

	EMTTrackDetailFormContainer: '.FormContainer',
	EMTTrackFormNameField: '#EMTTrackFormNameField',

	EMTTrackStorageWidget: '#EMTTrackStorageWidget',

	async uCreateItem (browser) {
		browser.pressButton(EMTTrackMasterCreateButton);
		await browser.wait({ element: EMTTrackMasterListItem });
	},
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTTrack_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMTTrackMaster', function () {
		browser.assert.elements(EMTTrackMaster, 1);
	});

	it('shows EMTTrackDetailPlaceholderContainer', function () {
		browser.assert.elements(EMTTrackDetailPlaceholderContainer, 1);
	});

	it('hides EMTTrackDetailToolbar', function () {
		browser.assert.elements(EMTTrackDetailToolbar, 0);
	});

	it('hides EMTTrackDetailFormContainer', function () {
		browser.assert.elements(EMTTrackDetailFormContainer, 0);
	});

	it('shows EMTTrackStorageWidget', function () {
		browser.assert.elements(EMTTrackStorageWidget, 1);
	});

	it('on create', async function() {
		await uCreateItem(browser);

		browser.assert.elements(EMTTrackMasterListItem, 1);

		browser.assert.elements(EMTTrackDetailPlaceholderContainer, 0);

		browser.assert.elements(EMTTrackDetailToolbar, 1);
		browser.assert.elements(EMTTrackDetailToolbarDiscardButton, 1);

		browser.assert.elements(EMTTrackDetailFormContainer, 1);
		browser.assert.elements(EMTTrackFormNameField, 1);
	});

	it('on create nth item', async function() {
		await uCreateItem(browser);

		browser.assert.elements(EMTTrackMasterListItem, 2);

		browser.assert.elements(EMTTrackDetailToolbar, 1);
	});

	context('delete', function () {

		it('on cancel', async function() {
			await browser.OLSKConfirm(async function () {
				browser.pressButton(EMTTrackDetailToolbarDiscardButton);
			}, function (dialog) {
				dialog.response = false;

				return dialog;
			});

			await browser.wait({ element: EMTTrackMasterListItem });

			browser.assert.elements(EMTTrackDetailPlaceholderContainer, 0);

			browser.assert.elements(EMTTrackDetailToolbar, 1);
		});

		it('on confirm', async function() {
			await browser.OLSKConfirm(async function () {
				browser.pressButton(EMTTrackDetailToolbarDiscardButton);
			});

			await browser.wait({ element: EMTTrackMasterListItem });

			browser.assert.elements(EMTTrackDetailPlaceholderContainer, 1);

			browser.assert.elements(EMTTrackDetailToolbar, 0);
		});
		
	});

	context.skip('EMTTrackFooterStorageButton', function testEMTTrackFooterStorageButton () {
		
		it('shows widget', function () {
			browser.assert.className(EMTTrackStorageWidget, '');
		});
	
	});

});
