const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const kTesting = {
	StubJournalObjectValid() {
		return {
			EMTJournalID: 'alfa',
			EMTJournalName: '',
			EMTJournalCreationDate: new Date('2019-02-23T13:56:36Z'),
			EMTJournalModificationDate: new Date('2019-02-23T13:56:36Z'),
		};
	},
};

describe('EMTBrowse_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTBrowseJournalSelected: JSON.stringify(kTesting.StubJournalObjectValid()),
		});
	});

	it('classes OLSKMobileViewInactive', function () {
		browser.assert.hasNoClass('.EMTBrowseList', 'OLSKMobileViewInactive');
		browser.assert.hasClass('.EMTBrowseInfo', 'OLSKMobileViewInactive');
	});

	it('classes OLSKMasterListFocused', function () {
		browser.assert.hasClass('.EMTBrowseList', 'OLSKMasterListFocused');
	});

	it('sets OLSKResultsListItemSelected', function () {
		browser.assert.elements('.OLSKResultsListItemSelected', 0);
	});

	it('focuses OLSKMasterListFilterField', function () {
		browser.assert.hasFocus('.OLSKMasterListFilterField');
	});

	context('create', function test_create() {

		before(function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 0);
		});

		before(function () {
			browser.assert.text('#TestEMTBrowseDispatchCreate', '0');
			browser.assert.text('#TestEMTBrowseDispatchCreateData', 'undefined');
		});

		before(function () {
			return browser.pressButton('.EMTBrowseListToolbarCreateButton');
		});

		it('classes OLSKMobileViewInactive', function () {
			browser.assert.hasClass('.EMTBrowseList', 'OLSKMobileViewInactive');
			browser.assert.hasNoClass('.EMTBrowseInfo', 'OLSKMobileViewInactive');
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

		it('sets EMTBrowseInfoItem', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('focuses EMTBrowseInfoFormNotesField', function () {
			browser.assert.hasFocus('.EMTBrowseInfoFormNotesField');
		});

		it('sends EMTBrowseDispatchCreate', function () {
			browser.assert.text('#TestEMTBrowseDispatchCreate', '1');
			browser.assert.text('#TestEMTBrowseDispatchCreateData', JSON.stringify([
				'EMTMemoID',
				'EMTMemoJournalID',
				'EMTMemoCreationDate',
				'EMTMemoModificationDate',
				'EMTMemoEventDate',
				'EMTMemoNotes',
			]));
		});

	});

	context('back', function test_back() {

		before(function () {
			return browser.pressButton('.EMTBrowseInfoToolbarBackButton');
		});

		it('classes OLSKMobileViewInactive', function () {
			browser.assert.hasNoClass('.EMTBrowseList', 'OLSKMobileViewInactive');
			browser.assert.hasClass('.EMTBrowseInfo', 'OLSKMobileViewInactive');
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

		it('sets EMTBrowseInfoItem', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

	});

	context('arrow', function test_arrow() { // #pendext

		before(function () {
			return browser.focus('.OLSKMasterListFilterField');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('classes OLSKMasterListFocused', function () {
			browser.assert.hasClass('.EMTBrowseList', 'OLSKMasterListFocused');
		});

		it('classes OLSKMobileViewInactive', function () {
			browser.assert.hasNoClass('.EMTBrowseList', 'OLSKMobileViewInactive');
			browser.assert.hasClass('.EMTBrowseInfo', 'OLSKMobileViewInactive');
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

		it('sets EMTBrowseInfoItem', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

	});

	context('tab', function test_tab() {

		context('master focused', function () {

			before(function () {
				browser.assert.hasFocus('.OLSKMasterListFilterField');
			});

			before(function () {
				browser.assert.hasClass('.EMTBrowseList', 'OLSKMasterListFocused');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});

			it('classes OLSKMasterListFocused', function () {
				browser.assert.hasNoClass('.EMTBrowseList', 'OLSKMasterListFocused');
			});

			it('focuses EMTBrowseInfoFormNotesField', function () {
				browser.assert.hasFocus('.EMTBrowseInfoFormNotesField');
			});

		});

		context('master not focused', function () {

			before(function () {
				browser.assert.hasFocus('.EMTBrowseInfoFormNotesField');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Tab');
			});

			it.skip('focuses other field', function () {
				browser.assert.hasFocus('.EMTBrowseInfoFormNotesField');
			});

		});

		context('shiftKey', function () {

			context.skip('other field focused', function () {

				before(function () {
					browser.assert.hasFocus('.EMTBrowseInfoFormNotesField');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('focuses EMTBrowseInfoFormNotesField', function () {
					browser.assert.hasFocus('.EMTBrowseInfoFormNotesField');
				});

			});

			context('first field focused', function () {

				before(function () {
					browser.assert.hasFocus('.EMTBrowseInfoFormNotesField');
				});

				before(function () {
					browser.assert.hasNoClass('.EMTBrowseList', 'OLSKMasterListFocused');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('focuses OLSKMasterListFilterField', function () {
					browser.assert.hasFocus('.OLSKMasterListFilterField');
				});

				it('classes OLSKMasterListFocused', function () {
					browser.assert.hasClass('.EMTBrowseList', 'OLSKMasterListFocused');
				});

			});

			context('master focused', function () {

				before(function () {
					browser.assert.hasFocus('.OLSKMasterListFilterField');
				});

				before(function () {
					browser.assert.hasClass('.EMTBrowseList', 'OLSKMasterListFocused');
				});

				before(function () {
					return browser.OLSKFireKeyboardEvent(browser.window, 'Tab', {
						shiftKey: true,
					});
				});

				it('classes OLSKMasterListFocused', function () {
					browser.assert.hasNoClass('.EMTBrowseList', 'OLSKMasterListFocused');
				});

				it('focuses EMTBrowseInfoFormNotesField', function () {
					browser.assert.hasFocus('.EMTBrowseInfoFormNotesField');
				});

			});

		});

	});

	context('escape', function test_escape() {

		before(function () {
			browser.fill('.EMTBrowseInfoFormNotesField', 'alfa');
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

		it.skip('clears EMTBrowseListFilterText', function () {
			browser.assert.input('.OLSKMasterListFilterField', '');
		});

		context('filter_empty', function () {

			before(function () {
				browser.assert.text('#TestEMTBrowseListDispatchClose', '0');
			});

			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
			});

			it('sends EMTBrowseListDispatchClose', function () {
				browser.assert.text('#TestEMTBrowseListDispatchClose', '1');
			});

		});

	});

	context('select', function test_select() {

		before(function () {
			return browser.click('.EMTBrowseListItem');
		});

		it('classes OLSKMasterListFocused', function () {
			browser.assert.hasNoClass('.EMTBrowseList', 'OLSKMasterListFocused');
		});

		it('classes OLSKMobileViewInactive', function () {
			browser.assert.hasClass('.EMTBrowseList', 'OLSKMobileViewInactive');
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.elements('.OLSKResultsListItemSelected', 1);
		});

		it('classes OLSKMobileViewInactive', function () {
			browser.assert.hasNoClass('.EMTBrowseInfo', 'OLSKMobileViewInactive');
		});

		it('sets EMTBrowseInfoItem', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('focus EMTBrowseInfoFormNotesField', function () {
			browser.assert.hasFocus('.EMTBrowseInfoFormNotesField');
		});

	});

	context('filter', function test_filter() {

		before(function () {
			return browser.pressButton('.EMTBrowseListToolbarCreateButton');
		});

		before(function () {
			browser.fill('.EMTBrowseInfoFormNotesField', 'bravo');
		});

		context('no match', function () {

			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'delta');
			});

			it('filters all EMTBrowseListItem', function () {
				browser.assert.elements('.EMTBrowseListItem', 0);
			});

			it('sets EMTBrowseInfoItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 1);
			});

		});

		context('partial match', function () {

			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'a');
			});

			it('filters partial EMTBrowseListItem', function () {
				browser.assert.elements('.EMTBrowseListItem', 2);
			});

			it('sets OLSKResultsListItemSelected', function () {
				browser.assert.elements('.OLSKResultsListItemSelected', 1);
			});

			it('sets EMTBrowseInfoItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 0);
			});

		});

		context('exact match', function () {

			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'bravo');
			});

			it('filters exact EMTBrowseListItem', function () {
				browser.assert.elements('.EMTBrowseListItem', 1);
			});

			it('sets OLSKResultsListItemSelected', function () {
				browser.assert.elements('.OLSKResultsListItemSelected', 1);
			});

			it('sets EMTBrowseInfoItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 0);
			});

		});

		context('clear', function () {

			before(function () {
				return browser.pressButton('.OLSKInputWrapperClearButton');
			});

			it('filters no EMTBrowseListItem', function () {
				browser.assert.elements('.EMTBrowseListItem', 2);
			});

			it('sets OLSKResultsListItemSelected', function () {
				browser.assert.elements('.OLSKResultsListItemSelected', 0);
			});

			it('sets EMTBrowseInfoItem', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 1);
			});

			it('sorts EMTBrowseListItem', function () {
				browser.assert.text('.EMTBrowseListItemNotesSnippet', 'bravoalfa');
			});

		});

	});

	context('selection', function test_selection() {

		before(function () {
			return browser.click('.EMTBrowseListItem');
		});

		it('sets OLSKResultsListItemSelected', function () {
			browser.assert.hasClass('.OLSKResultsListItem:first-of-type', 'OLSKResultsListItemSelected');
		});

		context('arrow', function () {

			before(function () {
				return browser.focus('.EMTBrowseInfoFormNotesField');
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

			it('sets EMTBrowseListItemNotesSnippet', function () {
				browser.assert.text('.OLSKResultsListItemSelected .EMTBrowseListItemNotesSnippet', 'bravo');
			});

		});

	});

	context('form', function test_form() {

		before(function () {
			browser.assert.text('#TestEMTBrowseListDispatchForm', '0');
		});

		before(function () {
			return browser.pressButton('.EMTBrowseListToolbarFormButton');
		});

		it('sends EMTBrowseListDispatchForm', function () {
			browser.assert.text('#TestEMTBrowseListDispatchForm', '1');
		});

	});

	context('close', function test_close() {

		before(function () {
			browser.assert.text('#TestEMTBrowseListDispatchClose', '1');
		});

		before(function () {
			return browser.pressButton('.EMTBrowseListToolbarCloseButton');
		});

		it('sends EMTBrowseListDispatchClose', function () {
			browser.assert.text('#TestEMTBrowseListDispatchClose', '2');
		});

	});

	describe('EMTBrowseInfoLauncherItemDebug', function test_EMTBrowseInfoLauncherItemDebug() {

		before(function () {
			return browser.OLSKLauncherRun('EMTBrowseInfoLauncherItemDebug');
		});

		it.skip('sets window location', function () {
			browser.assert.evaluate('window.FakeWindowOpen', 'https://inspektor.5apps.com/inspect?path=emojitimer%2Femt_journals%2F01EB9SZTJRC76TNBQRZSFQ3N6T%2Femt_memos%2F2020-06-25%2F01EBPK47QV90N1WFJ4W9QMN0Z3%2F');
		});

	});

});
