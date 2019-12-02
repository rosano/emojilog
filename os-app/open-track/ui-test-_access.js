import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTTrackCreateButton: '#EMTTrackCreateButton',

	EMTTrackListItem: '.ListItem',

	EMTTrackDetailPlaceholderContainer: '.PlaceholderContainer',

	EMTTrackDetailToolbar: '#EMTTrackDetailToolbar',
	EMTTrackDetailToolbarBackButton: '#EMTTrackDetailToolbarBackButton',

	EMTTrackDetailToolbarDiscardButton: '#EMTTrackDetailToolbarDiscardButton',

	EMTTrackDetailFormContainer: '.FormContainer',
	EMTTrackFormNameField: '#EMTTrackFormNameField',

	EMTTrackStorageWidget: '#EMTTrackStorageWidget',

	async uCreateItem (browser) {
		browser.pressButton(EMTTrackCreateButton);
		await browser.wait({ element: EMTTrackListItem });
	},
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTTrack_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMTTrackCreateButton', function () {
		browser.assert.elements(EMTTrackCreateButton, 1);
	});

	it('hides EMTTrackListItem', function () {
		browser.assert.elements(EMTTrackListItem, 0);
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

		browser.assert.elements(EMTTrackListItem, 1);

		browser.assert.elements(EMTTrackDetailPlaceholderContainer, 0);

		browser.assert.elements(EMTTrackDetailToolbar, 1);
		browser.assert.elements(EMTTrackDetailToolbarDiscardButton, 1);

		browser.assert.elements(EMTTrackDetailFormContainer, 1);
		browser.assert.elements(EMTTrackFormNameField, 1);
	});

	it('on create nth item', async function() {
		await uCreateItem(browser);

		browser.assert.elements(EMTTrackListItem, 2);

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

			await browser.wait({ element: EMTTrackListItem });

			browser.assert.elements(EMTTrackDetailPlaceholderContainer, 0);

			browser.assert.elements(EMTTrackDetailToolbar, 1);
		});

		it('on confirm', async function() {
			await browser.OLSKConfirm(async function () {
				browser.pressButton(EMTTrackDetailToolbarDiscardButton);
			});

			await browser.wait({ element: EMTTrackListItem });

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
