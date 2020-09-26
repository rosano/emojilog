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

describe.skip('EMTBrowse_Sort', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTBrowseJournalSelected: JSON.stringify(kTesting.StubJournalObjectValid()),
		});
	});

	before(function () {
		return browser.pressButton('.EMTBrowseListToolbarCreateButton');
	});

	before(function () {
		return browser.fill('.EMTBrowseInfoFormNotesField', 'alfa');
	});

	before(function () {
		return browser.pressButton('.EMTBrowseListToolbarCreateButton');
	});

	before(function () {
		return browser.fill('.EMTBrowseInfoFormNotesField', 'bravo');
	});

	before(function () {
		return browser.pressButton('.EMTBrowseListToolbarCreateButton');
	});

	before(function () {
		return browser.fill('.EMTBrowseInfoFormNotesField', 'charlie');
	});

	describe('update', function test_update() {

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(3) .EMTBrowseListItem');
		});

		before(function () {
			return browser.fill('.EMTBrowseInfoFormNotesField', 'alfa2');
		});

		it('skips sort', function () {
			browser.assert.text('.EMTBrowseListItem', 'charlie bravo alfa2');
		});

	});

	describe('deselect', function test_deselect() {

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		it('sorts list', function () {
			browser.assert.text('.EMTBrowseListItem', 'alfa2 charlie bravo');
		});

	});

	describe('delete', function test_delete() {

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(3) .EMTBrowseListItem');
		});

		before(function () {
			return browser.fill('.EMTBrowseInfoFormNotesField', 'bravo2');
		});

		before(function () {
			return browser.click('.OLSKResultsListItem:nth-child(2) .EMTBrowseListItem');
		});

		before(async function () {
			return browser.OLSKConfirm(function () {
				return browser.pressButton('.EMTBrowseInfoToolbarDiscardButton');
			});
		});

		it('skips sort', function () {
			browser.assert.text('.EMTBrowseListItem', 'alfa2 bravo2');
		});

	});

});
