import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTTrackUnit: '.EMTTrackUnit',
	
	EMTTrackUnitPlaceholder: '.EMTTrackUnitPlaceholder',

	EMTTrackUnitToolbar: '.EMTTrackUnitToolbar',
	EMTTrackUnitToolbarBackButton: '.EMTTrackUnitToolbarBackButton',
	EMTTrackUnitToolbarDiscardButton: '.EMTTrackUnitToolbarDiscardButton',
	
	EMTTrackUnitForm: '.EMTTrackUnitForm',
	EMTTrackUnitFormNameField: '.EMTTrackUnitFormNameField',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTTrackUnit_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMTTrackUnit', function () {
		browser.assert.elements(EMTTrackUnit, 1);
	});

	it('shows EMTTrackUnitPlaceholder', function () {
		browser.assert.elements(EMTTrackUnitPlaceholder, 1);
	});

	it('hides EMTTrackUnitToolbar', function () {
		browser.assert.elements(EMTTrackUnitToolbar, 0);
	});

	it('hides EMTTrackUnitForm', function () {
		browser.assert.elements(EMTTrackUnitForm, 0);
	});

	context('EMTTrackUnitItem', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackUnitItem: JSON.stringify({
					EMTDocumentName: 'alfa',
				}),
			});
		});

		it('hides EMTTrackUnitPlaceholder', function () {
			browser.assert.elements(EMTTrackUnitPlaceholder, 0);
		});

		it('shows OLSKToolbar', function () {
			browser.assert.elements('.OLSKToolbar', 1);
		});

		it('shows EMTTrackUnitToolbar', function () {
			browser.assert.elements(EMTTrackUnitToolbar, 1);
		});

		it('shows EMTTrackUnitToolbarBackButton', function () {
			browser.assert.elements(EMTTrackUnitToolbarBackButton, 1);
		});

		it('shows EMTTrackUnitToolbarDiscardButton', function () {
			browser.assert.elements(EMTTrackUnitToolbarDiscardButton, 1);
		});

		it('shows EMTTrackUnitForm', function () {
			browser.assert.elements(EMTTrackUnitForm, 1);
		});

		it('shows EMTTrackUnitFormNameField', function () {
			browser.assert.elements(EMTTrackUnitFormNameField, 1);
		});
		
	});

});
