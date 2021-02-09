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

describe('EMLBrowse_Sort', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseJournalSelected: JSON.stringify(kTesting.StubJournalObjectValid()),
		});
	});

	before(function () {
		return browser.pressButton('.EMLBrowseListToolbarCreateButton');
	});

	before(function () {
		return browser.fill('.EMLBrowseInfoFormNotesField', 'alfa');
	});

	before(function () {
		return browser.pressButton('.EMLBrowseListToolbarCreateButton');
	});

	before(function () {
		return browser.fill('.EMLBrowseInfoFormNotesField', 'bravo');
	});

	before(function () {
		return browser.pressButton('.EMLBrowseListToolbarCreateButton');
	});

	before(function () {
		return browser.fill('.EMLBrowseInfoFormNotesField', 'charlie');
	});

	it('sorts list', function () {
		browser.assert.text('.EMLBrowseListItemNotesSnippet', 'charliebravoalfa');
	});

});
