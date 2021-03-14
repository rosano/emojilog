const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const kTesting = {
	StubJournalObjectValid() {
		return {
			EMLJournalID: 'alfa',
			EMLJournalName: '',
			EMLJournalCreationDate: new Date('2019-02-23T13:56:36Z'),
			EMLJournalModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('EMLBrowse_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseJournalSelected: JSON.stringify(kTesting.StubJournalObjectValid()),
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
			browser.fill('.EMLBrowseInfoFormNotesField', 'alfa');
		});

		before(function () {
			browser.fill('.OLSKMasterListFilterField', 'alfa');
		});

		before(function () {
			browser.assert.input('.OLSKMasterListFilterField', 'alfa');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		before(function () {
			return browser.click('.OLSKMasterListFilterField');
		});

		before(function () {
			return browser.focus('.OLSKMasterListFilterField');
		});

		it('focuses OLSKMasterListFilterField', function () {
			browser.assert.hasFocus('.OLSKMasterListFilterField');
		});

		it.skip('clears EMLBrowseListFilterText', function () {
			browser.assert.input('.OLSKMasterListFilterField', '');
		});

		context('filter_empty', function () {

			before(function () {
				browser.assert.text('#TestEMLBrowseListDispatchClose', '0');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('sends EMLBrowseListDispatchClose', function () {
				browser.assert.text('#TestEMLBrowseListDispatchClose', '1');
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

	context('filter', function test_filter() {

		before(function () {
			return browser.pressButton('.EMLBrowseListToolbarCreateButton');
		});

		before(function () {
			browser.fill('.EMLBrowseInfoFormNotesField', 'bravo');
		});

		context('no match', function () {

			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'delta');
			});

			it('filters all EMLBrowseListItem', function () {
				browser.assert.elements('.EMLBrowseListItem', 0);
			});

			it('sets EMLBrowseInfoItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 1);
			});

		});

		context('partial match', function () {

			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'a');
			});

			it('filters partial EMLBrowseListItem', function () {
				browser.assert.elements('.EMLBrowseListItem', 2);
			});

			it('sets OLSKResultsListItemSelected', function () {
				browser.assert.elements('.OLSKResultsListItemSelected', 1);
			});

			it('sets EMLBrowseInfoItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 0);
			});

		});

		context('exact match', function () {

			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'bravo');
			});

			it('filters exact EMLBrowseListItem', function () {
				browser.assert.elements('.EMLBrowseListItem', 1);
			});

			it('sets OLSKResultsListItemSelected', function () {
				browser.assert.elements('.OLSKResultsListItemSelected', 1);
			});

			it('sets EMLBrowseInfoItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 0);
			});

		});

		context('clear', function () {

			before(function () {
				return browser.pressButton('.OLSKInputWrapperClearButton');
			});

			it('filters no EMLBrowseListItem', function () {
				browser.assert.elements('.EMLBrowseListItem', 2);
			});

			it('sets OLSKResultsListItemSelected', function () {
				browser.assert.elements('.OLSKResultsListItemSelected', 0);
			});

			it('sets EMLBrowseInfoItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 1);
			});

			it('sorts EMLBrowseListItem', function () {
				browser.assert.text('.EMLBrowseListItemNotesSnippet', 'bravoalfa');
			});

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

	context('edit', function test_edit() {

		context('title', function () {

			it('sets EMLBrowseListItemNotesSnippet', function () {
				browser.assert.text('.OLSKResultsListItemSelected .EMLBrowseListItemNotesSnippet', 'bravo');
			});

		});

	});

	context('form', function test_form() {

		before(function () {
			browser.assert.text('#TestEMLBrowseListDispatchForm', '0');
		});

		before(function () {
			return browser.pressButton('.EMLBrowseListToolbarFormButton');
		});

		it('sends EMLBrowseListDispatchForm', function () {
			browser.assert.text('#TestEMLBrowseListDispatchForm', '1');
		});

	});

	context('close', function test_close() {

		before(function () {
			browser.assert.text('#TestEMLBrowseListDispatchClose', '1');
		});

		before(function () {
			return browser.pressButton('.EMLBrowseListToolbarCloseButton');
		});

		it('sends EMLBrowseListDispatchClose', function () {
			browser.assert.text('#TestEMLBrowseListDispatchClose', '2');
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
