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

describe('EMTBrowse_Sort', function () {

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

	it('sorts list', function () {
		browser.assert.text('.EMTBrowseListItemNotesSnippet', 'charliebravoalfa');
	});

});
