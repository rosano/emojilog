const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTTrackForm: '.EMTTrackForm',

	EMTTrackFormToolbar: '.EMTTrackFormToolbar',
	EMTTrackFormToolbarBackButton: '.EMTTrackFormToolbarBackButton',
	EMTTrackFormToolbarDiscardButton: '.EMTTrackFormToolbarDiscardButton',
	
	EMTTrackFormBody: '.EMTTrackFormBody',
	EMTTrackFormBodyNameField: '.EMTTrackFormBodyNameField',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTTrackForm_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTTrackFormItem: JSON.stringify({
				EMTJournalName: 'alfa',
			}),
		});
	});

	it('shows EMTTrackForm', function () {
		browser.assert.elements(EMTTrackForm, 1);
	});

	it('shows EMTTrackFormToolbar', function () {
		browser.assert.elements(EMTTrackFormToolbar, 1);
	});

	it('shows EMTTrackFormToolbarBackButton', function () {
		browser.assert.elements(EMTTrackFormToolbarBackButton, 1);
	});

	it('shows EMTTrackFormToolbarDiscardButton', function () {
		browser.assert.elements(EMTTrackFormToolbarDiscardButton, 1);
	});

	it('shows EMTTrackFormBody', function () {
		browser.assert.elements(EMTTrackFormBody, 1);
	});

	it('shows EMTTrackFormBodyNameField', function () {
		browser.assert.elements(EMTTrackFormBodyNameField, 1);
	});

});
