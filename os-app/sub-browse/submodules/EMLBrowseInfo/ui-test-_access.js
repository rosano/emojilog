const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLBrowseInfo: '.EMLBrowseInfo',

	EMLBrowseInfoToolbar: '.EMLBrowseInfoToolbar',
	EMLBrowseInfoToolbarBackButton: '.EMLBrowseInfoToolbarBackButton',
	EMLBrowseInfoToolbarBackButtonImage: '.EMLBrowseInfoToolbarBackButtonImage',
	EMLBrowseInfoToolbarDiscardButton: '.EMLBrowseInfoToolbarDiscardButton',
	EMLBrowseInfoToolbarDiscardButtonImage: '.EMLBrowseInfoToolbarDiscardButtonImage',

	EMLBrowseInfoForm: '.EMLBrowseInfoForm',

	EMLBrowseInfoFormCustomField: '.EMLBrowseInfoFormCustomField',

	EMLBrowseInfoFormNotesField: '.EMLBrowseInfoFormNotesField',

	EMLBrowseInfoFormDateButton: '.EMLBrowseInfoFormDateButton',
	EMLBrowseInfoFormDateForm: '.EMLBrowseInfoFormDateForm',
	EMLBrowseInfoFormDateField: '.EMLBrowseInfoFormDateField',
	EMLBrowseInfoFormDateSaveButton: '.EMLBrowseInfoFormDateSaveButton',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EMLBrowseInfo_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseInfoItem: null,
		});
	});

	it('shows EMLBrowseInfo', function () {
		browser.assert.elements(EMLBrowseInfo, 1);
	});

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('hides EMLBrowseInfoToolbar', function () {
		browser.assert.elements(EMLBrowseInfoToolbar, 0);
	});

	it('hides EMLBrowseInfoForm', function () {
		browser.assert.elements(EMLBrowseInfoForm, 0);
	});

	it('hides EMLBrowseInfoLauncherItemDebug', function () {
		return browser.assert.OLSKLauncherItems('EMLBrowseInfoLauncherItemDebug', 0);
	});

	context('EMLBrowseInfoItem', function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLBrowseInfoItem: JSON.stringify(StubMemoObjectValid()),
			});
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('shows EMLBrowseInfoToolbar', function () {
			browser.assert.elements(EMLBrowseInfoToolbar, 1);
		});

		it('shows EMLBrowseInfoToolbarBackButton', function () {
			browser.assert.elements(EMLBrowseInfoToolbarBackButton, 1);
		});

		it('shows EMLBrowseInfoToolbarBackButtonImage', function () {
			browser.assert.elements(EMLBrowseInfoToolbarBackButtonImage, 1);
		});

		it('shows EMLBrowseInfoToolbarDiscardButton', function () {
			browser.assert.elements(EMLBrowseInfoToolbarDiscardButton, 1);
		});

		it('shows EMLBrowseInfoToolbarDiscardButtonImage', function () {
			browser.assert.elements(EMLBrowseInfoToolbarDiscardButtonImage, 1);
		});

		it('shows EMLBrowseInfoForm', function () {
			browser.assert.elements(EMLBrowseInfoForm, 1);
		});

		it('hides EMLBrowseInfoFormCustomField', function () {
			browser.assert.elements(EMLBrowseInfoFormCustomField, 0);
		});

		it('shows EMLBrowseInfoFormNotesField', function () {
			browser.assert.elements(EMLBrowseInfoFormNotesField, 1);
		});

		it('shows EMLBrowseInfoFormDateButton', function () {
			browser.assert.elements(EMLBrowseInfoFormDateButton, 1);
		});

		it('hides EMLBrowseInfoFormDateForm', function () {
			browser.assert.elements(EMLBrowseInfoFormDateForm, 0);
		});

		it('hides EMLBrowseInfoFormDateField', function () {
			browser.assert.elements(EMLBrowseInfoFormDateField, 0);
		});

		it('hides EMLBrowseInfoFormDateSaveButton', function () {
			browser.assert.elements(EMLBrowseInfoFormDateSaveButton, 0);
		});

		it('shows EMLBrowseInfoLauncherItemDebug', function () {
			return browser.assert.OLSKLauncherItems('EMLBrowseInfoLauncherItemDebug', 1);
		});

		context('EMLBrowseInfoFormDateButton', function test_EMLBrowseInfoFormDateButton () {

			before(function () {
				return browser.pressButton(EMLBrowseInfoFormDateButton);
			});

			it('shows EMLBrowseInfoFormDateForm', function () {
				browser.assert.elements(EMLBrowseInfoFormDateForm, 1);
			});

			it('hides EMLBrowseInfoFormDateButton', function () {
				browser.assert.elements(EMLBrowseInfoFormDateButton, 0);
			});

			it('shows EMLBrowseInfoFormDateField', function () {
				browser.assert.elements(EMLBrowseInfoFormDateField, 1);
			});

			it('shows EMLBrowseInfoFormDateSaveButton', function () {
				browser.assert.elements(EMLBrowseInfoFormDateSaveButton, 1);
			});
		
		});

		context('EMLBrowseInfoFormDateSaveButton', function test_EMLBrowseInfoFormDateSaveButton () {

			before(function () {
				return browser.pressButton(EMLBrowseInfoFormDateSaveButton);
			});

			it('hides EMLBrowseInfoFormDateForm', function () {
				browser.assert.elements(EMLBrowseInfoFormDateForm, 0);
			});

			it('shows EMLBrowseInfoFormDateButton', function () {
				browser.assert.elements(EMLBrowseInfoFormDateButton, 1);
			});

			it('hides EMLBrowseInfoFormDateField', function () {
				browser.assert.elements(EMLBrowseInfoFormDateField, 0);
			});

			it('hides EMLBrowseInfoFormDateSaveButton', function () {
				browser.assert.elements(EMLBrowseInfoFormDateSaveButton, 0);
			});
		
		});

		context('EMLBrowseInfoFields', function () {

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					EMLBrowseInfoItem: JSON.stringify(StubMemoObjectValid({
						EMLMemoCustomData: {},
					})),
					EMLBrowseInfoFields: JSON.stringify([StubFieldObjectValid()]),
				});
			});

			it('shows EMLBrowseInfoFormCustomField', function () {
				browser.assert.elements(EMLBrowseInfoFormCustomField, 1);
			});

		});

	});

});
