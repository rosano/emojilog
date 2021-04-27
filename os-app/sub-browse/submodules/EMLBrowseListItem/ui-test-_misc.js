const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const OLSKString = require('OLSKString');

describe('EMLBrowseListItem_Misc', function () {

	const item = {
		EMLMemoEventDate: new Date('2019-02-23T13:56:36Z'),
		EMLMemoNotes: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
	};

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseListItemObject: JSON.stringify(item),
		});
	});

	describe('EMLBrowseListItemEventDate', function test_EMLBrowseListItemEventDate () {
		
		it('binds EMLMemoEventDate', function () {
			browser.assert.text(EMLBrowseListItemEventDate, item.EMLMemoEventDate.toLocaleString());
		});

	});

	describe('EMLBrowseListItemNotesSnippet', function test_EMLBrowseListItemNotesSnippet () {
		
		it('binds and snips EMLMemoNotes', function () {
			browser.assert.text(EMLBrowseListItemNotesSnippet, OLSKString.OLSKStringSnippet(item.EMLMemoNotes));
		});

	});

});
