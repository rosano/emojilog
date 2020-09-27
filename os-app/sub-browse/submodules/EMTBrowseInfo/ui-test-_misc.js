const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTBrowseInfo_Misc', function () {

	describe('EMTBrowseInfo', function test_EMTBrowseInfo() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTBrowseInfoItem: JSON.stringify({}),
			});
		});

		it('classes OLSKViewportDetail', function () {
			browser.assert.hasClass(EMTBrowseInfo, 'OLSKViewportDetail');
		});

		context('OLSKMobileViewInactive', function () {

			before(function () {
				browser.assert.hasNoClass(EMTBrowseInfo, 'OLSKMobileViewInactive');
			});

			before(function () {
				browser.assert.attribute(EMTBrowseInfo, 'aria-hidden', null);
			});

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					EMTBrowseInfoItem: JSON.stringify({}),
					OLSKMobileViewInactive: true,
				});
			});

			it('classes OLSKMobileViewInactive', function () {
				browser.assert.hasClass(EMTBrowseInfo, 'OLSKMobileViewInactive');
			});

			it('sets aria-hidden', function () {
				browser.assert.attribute(EMTBrowseInfo, 'aria-hidden', 'true');
			});

		});

	});

	describe('EMTBrowseInfoToolbar', function test_EMTBrowseInfoToolbar() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTBrowseInfoItem: JSON.stringify({}),
			});
		});

		it('classes OLSKMobileViewHeader', function () {
			browser.assert.hasClass(EMTBrowseInfoToolbar, 'OLSKMobileViewHeader');
		});

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(EMTBrowseInfoToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(EMTBrowseInfoToolbar, 'OLSKToolbarJustify');
		});

	});

	describe('EMTBrowseInfoToolbarBackButton', function test_EMTBrowseInfoToolbarBackButton() {

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(EMTBrowseInfoToolbarBackButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(EMTBrowseInfoToolbarBackButton, 'OLSKLayoutElementTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMTBrowseInfoToolbarBackButton, 'OLSKToolbarButton');
		});

		it('classes OLSKVisibilityMobile', function () {
			browser.assert.hasClass(EMTBrowseInfoToolbarBackButton, 'OLSKVisibilityMobile');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMTBrowseInfoDispatchBack', '0');
			});

			before(function () {
				return browser.pressButton(EMTBrowseInfoToolbarBackButton);
			});

			it('sends EMTBrowseInfoDispatchBack', function () {
				browser.assert.text('#TestEMTBrowseInfoDispatchBack', '1');
			});

		});

	});

	describe('EMTBrowseInfoToolbarBackButtonImage', function test_EMTBrowseInfoToolbarBackButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMTBrowseInfoToolbarBackButtonImage } #_OLSKSharedBack`, 1);
		});

	});

	describe('EMTBrowseInfoToolbarDiscardButton', function test_EMTBrowseInfoToolbarDiscardButton() {

		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(EMTBrowseInfoToolbarDiscardButton, 'OLSKLayoutButtonNoStyle');
		});

		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(EMTBrowseInfoToolbarDiscardButton, 'OLSKLayoutElementTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMTBrowseInfoToolbarDiscardButton, 'OLSKToolbarButton');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMTBrowseInfoDispatchDiscard', '0');
				browser.assert.text('#TestEMTBrowseInfoDispatchDiscardData', 'undefined');
			});

			before(function () {
				return browser.pressButton(EMTBrowseInfoToolbarDiscardButton);
			});

			it('sends EMTBrowseInfoDispatchDiscard', function () {
				browser.assert.text('#TestEMTBrowseInfoDispatchDiscard', '1');
				browser.assert.text('#TestEMTBrowseInfoDispatchDiscardData', JSON.stringify({}));
			});

		});

	});

	describe('EMTBrowseInfoToolbarDiscardButtonImage', function test_EMTBrowseInfoToolbarDiscardButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMTBrowseInfoToolbarDiscardButtonImage } #_OLSKSharedDiscard`, 1);
		});

	});

	describe('EMTBrowseInfoFormNotesField', function test_EMTBrowseInfoFormNotesField() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTBrowseInfoItem: JSON.stringify({
					EMTMemoNotes: 'alfa',
				}),
			});
		});

		it('binds EMTMemoNotes', function () {
			browser.assert.input(EMTBrowseInfoFormNotesField, 'alfa');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestEMTBrowseInfoItem', JSON.stringify({
					EMTMemoNotes: 'alfa',
				}));
			});

			before(function () {
				browser.assert.text('#TestEMTBrowseInfoDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(EMTBrowseInfoFormNotesField, 'bravo');
			});

			it('updates EMTBrowseInfoItem', function () {
				browser.assert.text('#TestEMTBrowseInfoItem', JSON.stringify({
					EMTMemoNotes: 'bravo',
				}));
			});

			it('sends EMTBrowseInfoDispatchUpdate', function () {
				browser.assert.text('#TestEMTBrowseInfoDispatchUpdate', '1');
			});

		});

	});

	describe('EMTBrowseInfoLauncherItemDebug', function test_EMTBrowseInfoLauncherItemDebug() {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTBrowseInfoItem: JSON.stringify({
					EMTMemoNotes: 'alfa',
				}),
			});
		});

		before(function () {
			browser.assert.text('#TestEMTBrowseInfoDispatchDebug', '0');
			browser.assert.text('#TestEMTBrowseInfoDispatchDebugData', 'undefined');
		});

		before(function () {
			return browser.OLSKLauncherRun('EMTBrowseInfoLauncherItemDebug');
		});

		it('sends EMTBrowseInfoDispatchDebug', function () {
			browser.assert.text('#TestEMTBrowseInfoDispatchDebug', '1');
			browser.assert.text('#TestEMTBrowseInfoDispatchDebugData', JSON.stringify({
				EMTMemoNotes: 'alfa',
			}));
		});

	});

});
