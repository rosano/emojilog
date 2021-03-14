const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLBrowseInfo_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseInfoItem: JSON.stringify({}),
		});
	});

	describe('EMLBrowseInfoToolbar', function test_EMLBrowseInfoToolbar() {

		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(EMLBrowseInfoToolbar, 'OLSKMobileViewHeader');
		});

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(EMLBrowseInfoToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(EMLBrowseInfoToolbar, 'OLSKToolbarJustify');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(EMLBrowseInfoToolbar, 'OLSKCommonEdgeBottom');
		});

	});

	describe('EMLBrowseInfoToolbarBackButton', function test_EMLBrowseInfoToolbarBackButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLBrowseInfoToolbarBackButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLBrowseInfoToolbarBackButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMLBrowseInfoToolbarBackButton, 'OLSKToolbarButton');
		});

		it('classes OLSKVisibilityMobile', function () {
			browser.assert.hasClass(EMLBrowseInfoToolbarBackButton, 'OLSKVisibilityMobile');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchBack', '0');
			});

			before(function () {
				return browser.pressButton(EMLBrowseInfoToolbarBackButton);
			});

			it('sends EMLBrowseInfoDispatchBack', function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchBack', '1');
			});

		});

	});

	describe('EMLBrowseInfoToolbarBackButtonImage', function test_EMLBrowseInfoToolbarBackButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMLBrowseInfoToolbarBackButtonImage } #_OLSKSharedBack`, 1);
		});

	});

	describe('EMLBrowseInfoToolbarDiscardButton', function test_EMLBrowseInfoToolbarDiscardButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLBrowseInfoToolbarDiscardButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLBrowseInfoToolbarDiscardButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMLBrowseInfoToolbarDiscardButton, 'OLSKToolbarButton');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchDiscard', '0');
				browser.assert.text('#TestEMLBrowseInfoDispatchDiscardData', 'undefined');
			});

			before(function () {
				return browser.pressButton(EMLBrowseInfoToolbarDiscardButton);
			});

			it('sends EMLBrowseInfoDispatchDiscard', function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchDiscard', '1');
				browser.assert.text('#TestEMLBrowseInfoDispatchDiscardData', JSON.stringify({}));
			});

		});

	});

	describe('EMLBrowseInfoToolbarDiscardButtonImage', function test_EMLBrowseInfoToolbarDiscardButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMLBrowseInfoToolbarDiscardButtonImage } #_OLSKSharedDiscard`, 1);
		});

	});

	describe('EMLBrowseInfoForm', function test_EMLBrowseInfoForm() {

		it('classes OLSKDecor', function () {
			browser.assert.hasClass(EMLBrowseInfoForm, 'OLSKDecor');
		});

		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(EMLBrowseInfoForm, 'OLSKDecorBigForm');
		});

	});

	describe('EMLBrowseInfoFormNotesField', function test_EMLBrowseInfoFormNotesField() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLBrowseInfoItem: JSON.stringify({
					EMLMemoNotes: 'alfa',
				}),
			});
		});

		it('binds EMLMemoNotes', function () {
			browser.assert.input(EMLBrowseInfoFormNotesField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestEMLBrowseInfoItem', JSON.stringify({
					EMLMemoNotes: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(EMLBrowseInfoFormNotesField, 'bravo');
			});

			it('updates EMLBrowseInfoItem', function () {
				browser.assert.text('#TestEMLBrowseInfoItem', JSON.stringify({
					EMLMemoNotes: 'bravo',
				}));
			});

			it('sends EMLBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '1');
			});

		});

	});

	describe('EMLBrowseInfoFormDateField', function test_EMLBrowseInfoFormDateField() {

		const EMLMemoEventDate = new Date();
		const item = StubMemoObjectValid({
			EMLMemoEventDate,
		});

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLBrowseInfoItem: JSON.stringify(item),
			});
		});

		before(function () {
			return browser.pressButton(EMLBrowseInfoFormDateButton);
		});

		it('sets type', function () {
			browser.assert.attribute(EMLBrowseInfoFormDateField, 'type', 'text');
		});

		it('sets autofocus', function () {
			browser.assert.attribute(EMLBrowseInfoFormDateField, 'autofocus', '');
		});

		it('binds EMLMemoEventDate', function () {
			browser.assert.input(EMLBrowseInfoFormDateField, EMLMemoEventDate.toJSON());
		});

		context('save not valid', function () {

			before(function () {
				browser.fill(EMLBrowseInfoFormDateField, 'alfa');
			});

			before(function () {
				browser.assert.text('#TestEMLBrowseInfoItem', JSON.stringify(item));
			});

			before(function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '0');
			});

			before(function () {
				return browser.pressButton(EMLBrowseInfoFormDateSaveButton);
			});

			it('updates no EMLBrowseInfoItem', function () {
				browser.assert.text('#TestEMLBrowseInfoItem', JSON.stringify(item));
			});

			it('sends no EMLBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '0');
			});

		});

		context('save valid', function () {

			const EMLMemoEventDate = new Date(Math.random() * 1000 * 1000 * 1000);

			before(function () {
				return browser.pressButton(EMLBrowseInfoFormDateButton);
			});

			before(function () {
				browser.fill(EMLBrowseInfoFormDateField, EMLMemoEventDate.toJSON());
			});

			before(function () {
				browser.assert.text('#TestEMLBrowseInfoItem', JSON.stringify(item));
			});

			before(function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '0');
			});

			before(function () {
				return browser.pressButton(EMLBrowseInfoFormDateSaveButton);
			});

			it('updates EMLBrowseInfoItem', function () {
				browser.assert.text('#TestEMLBrowseInfoItem', JSON.stringify(Object.assign(item, {
					EMLMemoEventDate,
				})));
			});

			it('sends EMLBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '1');
			});

		});

		context('submit', function () {

			const EMLMemoEventDate = new Date(Math.random() * 1000 * 1000 * 1000);

			before(function () {
				return browser.pressButton(EMLBrowseInfoFormDateButton);
			});

			before(function () {
				browser.fill(EMLBrowseInfoFormDateField, EMLMemoEventDate.toJSON());
			});

			before(function () {
				return browser.fire(EMLBrowseInfoFormDateForm, 'submit');
			});

			it('sends EMLBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '2');
			});

		});

	});

	describe('EMLBrowseInfoLauncherItemDebug', function test_EMLBrowseInfoLauncherItemDebug() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLBrowseInfoItem: JSON.stringify({
					EMLMemoNotes: 'alfa',
				}),
			});
		});

		before(function () {
			browser.assert.text('#TestEMLBrowseInfoDispatchDebug', '0');
			browser.assert.text('#TestEMLBrowseInfoDispatchDebugData', 'undefined');
		});

		before(function () {
			return browser.OLSKLauncherRun('EMLBrowseInfoLauncherItemDebug');
		});

		it('sends EMLBrowseInfoDispatchDebug', function () {
			browser.assert.text('#TestEMLBrowseInfoDispatchDebug', '1');
			browser.assert.text('#TestEMLBrowseInfoDispatchDebugData', JSON.stringify({
				EMLMemoNotes: 'alfa',
			}));
		});

	});

});
