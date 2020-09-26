const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTBrowseInfo: '.EMTBrowseInfo',

	EMTBrowseInfoToolbar: '.EMTBrowseInfoToolbar',
	EMTBrowseInfoToolbarBackButton: '.EMTBrowseInfoToolbarBackButton',
	EMTBrowseInfoToolbarBackButtonImage: '.EMTBrowseInfoToolbarBackButtonImage',
	EMTBrowseInfoToolbarDiscardButton: '.EMTBrowseInfoToolbarDiscardButton',
	EMTBrowseInfoToolbarDiscardButtonImage: '.EMTBrowseInfoToolbarDiscardButtonImage',

	EMTBrowseInfoForm: '.EMTBrowseInfoForm',

	EMTBrowseInfoFormNotesField: '.EMTBrowseInfoFormNotesField',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EMTBrowseInfo_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTBrowseInfoItem: null,
		});
	});

	it('shows EMTBrowseInfo', function () {
		browser.assert.elements(EMTBrowseInfo, 1);
	});

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('hides EMTBrowseInfoToolbar', function () {
		browser.assert.elements(EMTBrowseInfoToolbar, 0);
	});

	it('hides EMTBrowseInfoForm', function () {
		browser.assert.elements(EMTBrowseInfoForm, 0);
	});

	it('hides EMTBrowseInfoLauncherItemDebug', function () {
		return browser.assert.OLSKLauncherItems('EMTBrowseInfoLauncherItemDebug', 0);
	});

	context('EMTBrowseInfoItem', function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTBrowseInfoItem: JSON.stringify({}),
			});
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('shows EMTBrowseInfoToolbar', function () {
			browser.assert.elements(EMTBrowseInfoToolbar, 1);
		});

		it('shows EMTBrowseInfoToolbarBackButton', function () {
			browser.assert.elements(EMTBrowseInfoToolbarBackButton, 1);
		});

		it('shows EMTBrowseInfoToolbarBackButtonImage', function () {
			browser.assert.elements(EMTBrowseInfoToolbarBackButtonImage, 1);
		});

		it('shows EMTBrowseInfoToolbarDiscardButton', function () {
			browser.assert.elements(EMTBrowseInfoToolbarDiscardButton, 1);
		});

		it('shows EMTBrowseInfoToolbarDiscardButtonImage', function () {
			browser.assert.elements(EMTBrowseInfoToolbarDiscardButtonImage, 1);
		});

		it('shows EMTBrowseInfoForm', function () {
			browser.assert.elements(EMTBrowseInfoForm, 1);
		});

		it('shows EMTBrowseInfoFormNotesField', function () {
			browser.assert.elements(EMTBrowseInfoFormNotesField, 1);
		});

		it('shows EMTBrowseInfoLauncherItemDebug', function () {
			return browser.assert.OLSKLauncherItems('EMTBrowseInfoLauncherItemDebug', 1);
		});

	});

});
