const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLBrowseInfo_Misc', function () {

	const EMLBrowseInfoItem = {
		EMLMemoNotes: Math.random().toString(),
		EMLMemoEventDate: new Date(),
	};

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseInfoItem: JSON.stringify(EMLBrowseInfoItem),
		});
	});

	describe('EMLBrowseInfo', function test_EMLBrowseInfo() {

		it('classes ROCOStandardView', function () {
			browser.assert.hasClass(EMLBrowseInfo, 'ROCOStandardView');
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

		it('classes ROCOStandardViewHead', function () {
			browser.assert.hasClass(EMLBrowseInfoToolbar, 'ROCOStandardViewHead');
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
				browser.assert.text('#TestEMLBrowseInfoDispatchDiscardData', JSON.stringify(EMLBrowseInfoItem));
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

		it('classes ROCOStandardViewBody', function () {
			browser.assert.hasClass(EMLBrowseInfoForm, 'ROCOStandardViewBody');
		});

	});

	describe('EMLBrowseInfoFormNotesField', function test_EMLBrowseInfoFormNotesField() {

		const EMLMemoNotes = Math.random().toString();

		it('binds EMLMemoNotes', function () {
			browser.assert.input(EMLBrowseInfoFormNotesField, EMLBrowseInfoItem.EMLMemoNotes);
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestEMLBrowseInfoItem', JSON.stringify(EMLBrowseInfoItem));
			});

			before(function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(EMLBrowseInfoFormNotesField, EMLMemoNotes);
			});

			it('updates EMLBrowseInfoItem', function () {
				browser.assert.text('#TestEMLBrowseInfoItem', JSON.stringify(Object.assign(EMLBrowseInfoItem, {
					EMLMemoNotes,
				})));
			});

			it('sends EMLBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '1');
			});

		});

	});

	describe('EMLBrowseInfoFormDateField', function test_EMLBrowseInfoFormDateField() {

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
			browser.assert.input(EMLBrowseInfoFormDateField, EMLBrowseInfoItem.EMLMemoEventDate.toJSON());
		});

		context('save not valid', function () {

			before(function () {
				browser.fill(EMLBrowseInfoFormDateField, 'alfa');
			});

			before(function () {
				browser.assert.text('#TestEMLBrowseInfoItem', JSON.stringify(EMLBrowseInfoItem));
			});

			before(function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '1');
			});

			before(function () {
				return browser.pressButton(EMLBrowseInfoFormDateSaveButton);
			});

			it('updates no EMLBrowseInfoItem', function () {
				browser.assert.text('#TestEMLBrowseInfoItem', JSON.stringify(EMLBrowseInfoItem));
			});

			it('sends no EMLBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '1');
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
				browser.assert.text('#TestEMLBrowseInfoItem', JSON.stringify(EMLBrowseInfoItem));
			});

			before(function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '1');
			});

			before(function () {
				return browser.pressButton(EMLBrowseInfoFormDateSaveButton);
			});

			it('updates EMLBrowseInfoItem', function () {
				browser.assert.text('#TestEMLBrowseInfoItem', JSON.stringify(Object.assign(EMLBrowseInfoItem, {
					EMLMemoEventDate,
				})));
			});

			it('sends EMLBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '2');
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
				browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '3');
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

	context('EMLBrowseInfoFields', function () {

		const field = StubFieldObjectValid();
		const memo = StubMemoObjectValid({
			EMLMemoCustomData: {
				[field.EMLFieldID]: Math.random().toString(),
			},
		});
		
		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLBrowseInfoFields: JSON.stringify([field]),
				EMLBrowseInfoItem: JSON.stringify(memo),
			});
		});

		describe('EMLBrowseInfoFormCustomField', function test_EMLBrowseInfoFormCustomField () {

			it('sets type', function () {
				browser.assert.attribute(EMLBrowseInfoFormCustomField, 'type', 'text');
			});

			it('sets placeholder', function () {
				browser.assert.attribute(EMLBrowseInfoFormCustomField, 'placeholder', field.EMLFieldName);
			});

			it('binds EMLMemoCustomData', function () {
				browser.assert.input(EMLBrowseInfoFormCustomField, memo.EMLMemoCustomData[field.EMLFieldID]);
			});

			context('input', function () {

				const item = Math.random().toString();

				before(function () {
					browser.assert.text('#TestEMLBrowseInfoItem', JSON.stringify(memo));
				});

				before(function () {
					browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '0');
				});

				before(function () {
					browser.fill(EMLBrowseInfoFormCustomField, item);
				});

				it('updates EMLBrowseInfoItem', function () {
					browser.assert.text('#TestEMLBrowseInfoItem', JSON.stringify(Object.assign(memo, {
						EMLMemoCustomData: Object.assign(memo.EMLMemoCustomData, {
							[field.EMLFieldID]: item,
						}),
					})));
				});

				it('sends EMLBrowseInfoDispatchUpdate', function () {
					browser.assert.text('#TestEMLBrowseInfoDispatchUpdate', '1');
				});

			});

		});

	});

});
