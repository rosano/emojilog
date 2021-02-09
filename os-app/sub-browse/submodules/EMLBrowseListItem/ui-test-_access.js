const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLBrowseListItem: '.EMLBrowseListItem',
	
	EMLBrowseListItemEventDate: '.EMLBrowseListItemEventDate',
	EMLBrowseListItemNotesSnippet: '.EMLBrowseListItemNotesSnippet',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EMLBrowseListItem_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseListItemObject: JSON.stringify({
				EMLMemoEventDate: new Date('2019-02-23T13:56:36Z'),
				EMLMemoNotes: 'alfa',
			}),
		});
	});

	it('shows EMLBrowseListItem', function () {
		browser.assert.elements(EMLBrowseListItem, 1);
	});

	it('shows EMLBrowseListItemEventDate', function () {
		browser.assert.elements(EMLBrowseListItemEventDate, 1);
	});

	it('shows EMLBrowseListItemNotesSnippet', function () {
		browser.assert.elements(EMLBrowseListItemNotesSnippet, 1);
	});

});
