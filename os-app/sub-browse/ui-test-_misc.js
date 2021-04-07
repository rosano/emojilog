const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLBrowse_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseJournal: JSON.stringify(StubJournalObjectValid()),
		});
	});

	describe('EMLBrowseCloseButton', function test_EMLBrowseCloseButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLBrowseCloseButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLBrowseCloseButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMLBrowseCloseButton, 'OLSKToolbarButton');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMLBrowseListDispatchClose', '0');
			});

			before(function () {
				return browser.pressButton(EMLBrowseCloseButton);
			});

			it('sends EMLBrowseListDispatchClose', function () {
				browser.assert.text('#TestEMLBrowseListDispatchClose', '1');
			});

		});

	});

	describe('EMLBrowseCloseButtonImage', function test_EMLBrowseCloseButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMLBrowseCloseButtonImage } #_OLSKSharedBack`, 1);
		});

	});

	describe('EMLBrowseFormButton', function test_EMLBrowseFormButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLBrowseFormButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLBrowseFormButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMLBrowseFormButton, 'OLSKToolbarButton');
		});

		it('sets accesskey', function () {
			browser.assert.attribute(EMLBrowseFormButton, 'accesskey', 'f');
		});

	});

	describe('EMLBrowseFormButtonImage', function test_EMLBrowseFormButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMLBrowseFormButtonImage } #_OLSKSharedEdit`, 1);
		});

	});

	describe('EMLBrowseCreateButton', function test_EMLBrowseCreateButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLBrowseCreateButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLBrowseCreateButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMLBrowseCreateButton, 'OLSKToolbarButton');
		});

		it('sets accesskey', function () {
			browser.assert.attribute(EMLBrowseCreateButton, 'accesskey', 'n');
		});

	});

	describe('EMLBrowseCreateButtonImage', function test_EMLBrowseCreateButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMLBrowseCreateButtonImage } #_OLSKSharedCreate`, 1);
		});

	});

	context('create', function test_create() {

		before(function () {
			browser.assert.elements('.OLSKCollectionItemLocus', 0);
		});

		before(function () {
			browser.assert.text('#TestEMLBrowseListDispatchTouch', '0');
			browser.assert.text('#TestEMLBrowseListDispatchTouchData', 'undefined');
		});

		before(function () {
			return browser.pressButton('.EMLBrowseCreateButton');
		});

		it('focuses EMLBrowseInfoFormNotesField', function () {
			browser.assert.hasFocus('.EMLBrowseInfoFormNotesField');
		});

		it('sends EMLBrowseListDispatchTouch', function () {
			browser.assert.text('#TestEMLBrowseListDispatchTouch', '1');
			browser.assert.text('#TestEMLBrowseListDispatchTouchData', (new Date()).toJSON().slice(0, 13));
		});

	});

	context('escape', function test_escape() {

		before(function () {
			browser.assert.text('#TestEMLBrowseListDispatchClose', '1');
		});

		before(function () {
			browser.fill('.OLSKMasterListFilterField', 'alfa');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('focuses OLSKMasterListFilterField', function () {
			browser.assert.hasFocus('.OLSKMasterListFilterField');
		});

		context('filter_empty', function () {

			before(function () {
				browser.assert.text('#TestEMLBrowseListDispatchClose', '1');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it.skip('sends EMLBrowseListDispatchClose', function () {
				browser.assert.text('#TestEMLBrowseListDispatchClose', '2');
			});

		});

	});

	context('select', function test_select() {

		before(function () {
			return browser.click('.EMLBrowseListItem');
		});

		it('sets OLSKCollectionItemsLocus', function () {
			browser.assert.elements('.OLSKCollectionItemLocus', 1);
		});

		it('sets EMLBrowseInfoItem', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('focus EMLBrowseInfoFormNotesField', function () {
			browser.assert.hasFocus('.EMLBrowseInfoFormNotesField');
		});

	});

	context('selection', function test_selection() {

		before(function () {
			return browser.click('.EMLBrowseListItem');
		});

		it('sets OLSKCollectionItemsLocus', function () {
			browser.assert.hasClass('.OLSKCollectionItem:first-of-type', 'OLSKCollectionItemLocus');
		});

		context('arrow', function () {

			before(function () {
				return browser.focus('.EMLBrowseInfoFormNotesField');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			});

			it('sets no OLSKCollectionItemLocus', function () {
				browser.assert.hasClass('.OLSKCollectionItem:first-of-type', 'OLSKCollectionItemLocus');
			});

		});

	});

	describe('EMLBrowseInfoLauncherItemDebug', function test_EMLBrowseInfoLauncherItemDebug() {

		before(function () {
			return browser.OLSKLauncherRun('EMLBrowseInfoLauncherItemDebug');
		});

		it.skip('sets window location', function () {
			browser.assert.evaluate('window.FakeWindowOpen', 'https://inspektor.5apps.com/inspect?path=emojilog%2Feml_journals%2F01EB9SZTJRC76TNBQRZSFQ3N6T%2Feml_memos%2F2020-06-25%2F01EBPK47QV90N1WFJ4W9QMN0Z3%2F');
		});

	});

});
