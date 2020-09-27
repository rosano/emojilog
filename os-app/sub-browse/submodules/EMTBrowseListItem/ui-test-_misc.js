const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTBrowseListItem_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTBrowseListItemObject: JSON.stringify({
				EMTMemoEventDate: new Date('2019-02-23T13:56:36Z'),
				EMTMemoNotes: 'alfa',
			}),
		});
	});

	describe('EMTBrowseListItemEventDate', function test_EMTBrowseListItemEventDate () {
		
		it('binds EMTMemoEventDate', function () {
			browser.assert.text(EMTBrowseListItemEventDate, Date.parse('2019-02-23T13:56:36Z'));
		});
		
		it('binds EMTMemoNotes', function () {
			browser.assert.text(EMTBrowseListItemNotesSnippet, 'alfa');
		});

	});

});
