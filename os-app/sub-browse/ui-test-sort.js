const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLBrowse_Sort', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseJournalSelected: JSON.stringify(StubJournalObjectValid()),
		});
	});

	before(function () {
		return browser.pressButton('.EMLBrowseCreateButton');
	});

	before(function () {
		return browser.fill('.EMLBrowseInfoFormNotesField', 'alfa');
	});

	before(function () {
		return browser.pressButton('.EMLBrowseCreateButton');
	});

	before(function () {
		return browser.fill('.EMLBrowseInfoFormNotesField', 'bravo');
	});

	before(function () {
		return browser.pressButton('.EMLBrowseCreateButton');
	});

	before(function () {
		return browser.fill('.EMLBrowseInfoFormNotesField', 'charlie');
	});

	it('sorts list', function () {
		browser.assert.text('.EMLBrowseListItemNotesSnippet', 'charliebravoalfa');
	});

});
