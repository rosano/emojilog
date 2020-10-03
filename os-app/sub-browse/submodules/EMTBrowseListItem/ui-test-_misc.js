const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const OLSKString = require('OLSKString');

describe('EMTBrowseListItem_Misc', function () {

	const item = {
		EMTMemoEventDate: new Date('2019-02-23T13:56:36Z'),
		EMTMemoNotes: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
	};

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTBrowseListItemObject: JSON.stringify(item),
		});
	});

	describe('EMTBrowseListItemEventDate', function test_EMTBrowseListItemEventDate () {
		
		it('binds EMTMemoEventDate', function () {
			browser.assert.text(EMTBrowseListItemEventDate, item.EMTMemoEventDate.valueOf().toString());
		});

	});

	describe('EMTBrowseListItemNotesSnippet', function test_EMTBrowseListItemNotesSnippet () {
		
		it('binds and snips EMTMemoNotes', function () {
			browser.assert.text(EMTBrowseListItemNotesSnippet, OLSKString.OLSKStringSnippet(item.EMTMemoNotes));
		});

	});

});
