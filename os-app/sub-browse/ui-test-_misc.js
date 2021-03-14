const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLBrowse_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseJournalSelected: JSON.stringify(StubJournalObjectValid()),
		});
	});

	describe('EMLBrowseListToolbarCloseButton', function test_EMLBrowseListToolbarCloseButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLBrowseListToolbarCloseButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLBrowseListToolbarCloseButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMLBrowseListToolbarCloseButton, 'OLSKToolbarButton');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMLBrowseListDispatchClose', '0');
			});

			before(function () {
				return browser.pressButton(EMLBrowseListToolbarCloseButton);
			});

			it('sends EMLBrowseListDispatchClose', function () {
				browser.assert.text('#TestEMLBrowseListDispatchClose', '1');
			});

		});

	});

	describe('EMLBrowseListToolbarCloseButtonImage', function test_EMLBrowseListToolbarCloseButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMLBrowseListToolbarCloseButtonImage } #_OLSKSharedBack`, 1);
		});

	});

	describe('EMLBrowseListToolbarFormButton', function test_EMLBrowseListToolbarFormButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLBrowseListToolbarFormButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLBrowseListToolbarFormButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMLBrowseListToolbarFormButton, 'OLSKToolbarButton');
		});

		it('sets accesskey', function () {
			browser.assert.attribute(EMLBrowseListToolbarFormButton, 'accesskey', 'f');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMLBrowseListDispatchForm', '0');
			});

			before(function () {
				return browser.pressButton(EMLBrowseListToolbarFormButton);
			});

			it('sends EMLBrowseListDispatchForm', function () {
				browser.assert.text('#TestEMLBrowseListDispatchForm', '1');
			});

		});

	});

	describe('EMLBrowseListToolbarFormButtonImage', function test_EMLBrowseListToolbarFormButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMLBrowseListToolbarFormButtonImage } #_OLSKSharedEdit`, 1);
		});

	});

	describe('EMLBrowseListToolbarCreateButton', function test_EMLBrowseListToolbarCreateButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLBrowseListToolbarCreateButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLBrowseListToolbarCreateButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMLBrowseListToolbarCreateButton, 'OLSKToolbarButton');
		});

		it('sets accesskey', function () {
			browser.assert.attribute(EMLBrowseListToolbarCreateButton, 'accesskey', 'n');
		});

	});

	describe('EMLBrowseListToolbarCreateButtonImage', function test_EMLBrowseListToolbarCreateButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMLBrowseListToolbarCreateButtonImage } #_OLSKSharedCreate`, 1);
		});

	});

	context('create', function test_create() {

		before(function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 0);
		});

		before(function () {
			browser.assert.text('#TestEMLBrowseListDispatchCreate', '0');
			browser.assert.text('#TestEMLBrowseListDispatchCreateData', 'undefined');
			browser.assert.text('#TestEMLBrowseListDispatchTouch', '0');
			browser.assert.text('#TestEMLBrowseListDispatchTouchData', 'undefined');
		});

		before(function () {
			return browser.pressButton('.EMLBrowseListToolbarCreateButton');
		});

		it('focuses EMLBrowseInfoFormNotesField', function () {
			browser.assert.hasFocus('.EMLBrowseInfoFormNotesField');
		});

		it('sends EMLBrowseListDispatchCreate', function () {
			browser.assert.text('#TestEMLBrowseListDispatchCreate', '1');
			browser.assert.text('#TestEMLBrowseListDispatchCreateData', JSON.stringify([
				'EMLMemoEventDate',
				'EMLMemoNotes',
				'EMLMemoID',
				'EMLMemoJournalID',
				'EMLMemoCreationDate',
				'EMLMemoModificationDate',
			]));
		});

		it('sends EMLBrowseListDispatchTouch', function () {
			browser.assert.text('#TestEMLBrowseListDispatchTouch', '1');
			browser.assert.text('#TestEMLBrowseListDispatchTouchData', (new Date()).toJSON().slice(0, 13));
		});

	});

	context('back', function test_back() {

		before(function () {
			return browser.pressButton('.EMLBrowseInfoToolbarBackButton');
		});

		it('sets EMLBrowseInfoItem', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

	});

	context.skip('tab', function test_tab() {

		context('master focused', function () {

			before(function () {
				browser.focus('.OLSKMasterListFilterField');
			});

			before(function () {
				browser.assert.hasFocus('.OLSKMasterListFilterField');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});

			it('focuses EMLBrowseInfoFormNotesField', function () {
				browser.assert.hasFocus('.EMLBrowseInfoFormNotesField');
			});

		});

		context('master not focused', function () {

			before(function () {
				browser.assert.hasFocus('.EMLBrowseInfoFormNotesField');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});

			it.skip('focuses other field', function () {
				browser.assert.hasFocus('.EMLBrowseInfoFormNotesField');
			});

		});

		context('shiftKey', function () {

			context.skip('other field focused', function () {

				before(function () {
					browser.assert.hasFocus('.EMLBrowseInfoFormNotesField');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('focuses EMLBrowseInfoFormNotesField', function () {
					browser.assert.hasFocus('.EMLBrowseInfoFormNotesField');
				});

			});

			context('first field focused', function () {

				before(function () {
					browser.assert.hasFocus('.EMLBrowseInfoFormNotesField');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('focuses OLSKMasterListFilterField', function () {
					browser.assert.hasFocus('.OLSKMasterListFilterField');
				});

			});

			context('master focused', function () {

				before(function () {
					browser.assert.hasFocus('.OLSKMasterListFilterField');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('focuses EMLBrowseInfoFormNotesField', function () {
					browser.assert.hasFocus('.EMLBrowseInfoFormNotesField');
				});

			});

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

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

		it('classes OLSKMobileViewInactive', function () {
			browser.assert.hasNoClass('.EMLBrowseInfo', 'OLSKMobileViewInactive');
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

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.hasClass('.OLSKResultsListItem:first-of-type', 'OLSKResultsListItemSelected');
		});

		context('arrow', function () {

			before(function () {
				return browser.focus('.EMLBrowseInfoFormNotesField');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
			});

			it('sets no OLSKResultsListItemSelected', function () {
				browser.assert.hasClass('.OLSKResultsListItem:first-of-type', 'OLSKResultsListItemSelected');
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
