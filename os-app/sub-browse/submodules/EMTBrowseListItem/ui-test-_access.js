const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTBrowseListItem: '.EMTBrowseListItem',
	
	EMTBrowseListItemEventDate: '.EMTBrowseListItemEventDate',
	EMTBrowseListItemNotesSnippet: '.EMTBrowseListItemNotesSnippet',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EMTBrowseListItem_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTBrowseListItemObject: JSON.stringify({
				EMTMemoEventDate: new Date('2019-02-23T13:56:36Z'),
				EMTMemoNotes: 'alfa',
			}),
		});
	});

	it('shows EMTBrowseListItem', function () {
		browser.assert.elements(EMTBrowseListItem, 1);
	});

	it('shows EMTBrowseListItemEventDate', function () {
		browser.assert.elements(EMTBrowseListItemEventDate, 1);
	});

	it('shows EMTBrowseListItemNotesSnippet', function () {
		browser.assert.elements(EMTBrowseListItemNotesSnippet, 1);
	});

});
