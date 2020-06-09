const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTTrackDetail: '.EMTTrackDetail',

	EMTTrackDetailToolbar: '.EMTTrackDetailToolbar',
	EMTTrackDetailToolbarBackButton: '.EMTTrackDetailToolbarBackButton',
	EMTTrackDetailToolbarDiscardButton: '.EMTTrackDetailToolbarDiscardButton',
	
	EMTTrackDetailForm: '.EMTTrackDetailForm',
	EMTTrackDetailFormNameField: '.EMTTrackDetailFormNameField',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTTrackDetail_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMTTrackDetail', function () {
		browser.assert.elements(EMTTrackDetail, 1);
	});

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('hides EMTTrackDetailToolbar', function () {
		browser.assert.elements(EMTTrackDetailToolbar, 0);
	});

	it('hides EMTTrackDetailForm', function () {
		browser.assert.elements(EMTTrackDetailForm, 0);
	});

	context('EMTTrackDetailItem', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackDetailItem: JSON.stringify({
					EMTDocumentName: 'alfa',
				}),
			});
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('shows EMTTrackDetailToolbar', function () {
			browser.assert.elements(EMTTrackDetailToolbar, 1);
		});

		it('shows EMTTrackDetailToolbarBackButton', function () {
			browser.assert.elements(EMTTrackDetailToolbarBackButton, 1);
		});

		it('shows EMTTrackDetailToolbarDiscardButton', function () {
			browser.assert.elements(EMTTrackDetailToolbarDiscardButton, 1);
		});

		it('shows EMTTrackDetailForm', function () {
			browser.assert.elements(EMTTrackDetailForm, 1);
		});

		it('shows EMTTrackDetailFormNameField', function () {
			browser.assert.elements(EMTTrackDetailFormNameField, 1);
		});
		
	});

});
