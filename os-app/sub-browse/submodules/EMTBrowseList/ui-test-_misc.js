const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uItem = function (inputData = 'alfa') {
	return {
		EMTMemoID: inputData,
		EMTMemoEventDate: new Date('2019-02-23T13:56:36Z'),
		EMTMemoNotes: 'alfa',
	};
};

describe('EMTBrowseList_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTBrowseListItems: JSON.stringify([uItem('alfa'), uItem('bravo')]),
			EMTBrowseListItemSelected: JSON.stringify(uItem('alfa')),
			EMTBrowseListFilterText: 'alfa',
		});
	});

	describe('EMTBrowseListToolbarCloseButton', function test_EMTBrowseListToolbarCloseButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMTBrowseListToolbarCloseButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMTBrowseListToolbarCloseButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMTBrowseListToolbarCloseButton, 'OLSKToolbarButton');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMTBrowseListDispatchClose', '0');
			});

			before(function () {
				return browser.pressButton(EMTBrowseListToolbarCloseButton);
			});

			it('sends EMTBrowseListDispatchClose', function () {
				browser.assert.text('#TestEMTBrowseListDispatchClose', '1');
			});

		});

	});

	describe('EMTBrowseListToolbarCloseButtonImage', function test_EMTBrowseListToolbarCloseButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMTBrowseListToolbarCloseButtonImage } #_OLSKSharedBack`, 1);
		});

	});

	describe('OLSKMasterList', function test_OLSKMasterList() {

		it('binds OLSKMasterListFilterText', function () {
			browser.assert.input('.OLSKMasterListFilterField', 'alfa');
		});

		it('sets OLSKMasterListItemAccessibilitySummaryFor', function () {
			browser.assert.attribute('.OLSKResultsListItem:nth-child(1) .OLSKMasterListItem', 'aria-label', 'Untitled');
		});

		it('sets OLSKMasterListItemSelected', function () {
			browser.assert.hasClass('.OLSKResultsListItem:nth-child(1)', 'OLSKResultsListItemSelected');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestEMTBrowseListDispatchFilter', '0');
				browser.assert.text('#TestEMTBrowseListDispatchFilterData', 'undefined');
			});

			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'charlie');
			});

			it('sends EMTBrowseListDispatchFilter', function () {
				browser.assert.text('#TestEMTBrowseListDispatchFilter', '1');
				browser.assert.text('#TestEMTBrowseListDispatchFilterData', 'charlie');
			});

		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMTBrowseListDispatchClick', '0');
				browser.assert.text('#TestEMTBrowseListDispatchClickData', 'undefined');
			});

			before(function () {
				return browser.click('.EMTBrowseListItem');
			});

			it('sends EMTBrowseListDispatchClick', function () {
				browser.assert.text('#TestEMTBrowseListDispatchClick', '1');
				browser.assert.text('#TestEMTBrowseListDispatchClickData', JSON.stringify(uItem()));
			});

		});

	});

	describe('EMTBrowseListToolbarFormButton', function test_EMTBrowseListToolbarFormButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMTBrowseListToolbarFormButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMTBrowseListToolbarFormButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMTBrowseListToolbarFormButton, 'OLSKToolbarButton');
		});

		it('sets accesskey', function () {
			browser.assert.attribute(EMTBrowseListToolbarFormButton, 'accesskey', 'f');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMTBrowseListDispatchForm', '0');
			});

			before(function () {
				return browser.pressButton(EMTBrowseListToolbarFormButton);
			});

			it('sends EMTBrowseListDispatchForm', function () {
				browser.assert.text('#TestEMTBrowseListDispatchForm', '1');
			});

		});

	});

	describe('EMTBrowseListToolbarFormButtonImage', function test_EMTBrowseListToolbarFormButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMTBrowseListToolbarFormButtonImage } #_OLSKSharedCreate`, 1);
		});

	});

	describe('EMTBrowseListToolbarCreateButton', function test_EMTBrowseListToolbarCreateButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMTBrowseListToolbarCreateButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMTBrowseListToolbarCreateButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMTBrowseListToolbarCreateButton, 'OLSKToolbarButton');
		});

		it('sets accesskey', function () {
			browser.assert.attribute(EMTBrowseListToolbarCreateButton, 'accesskey', 'n');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMTBrowseListDispatchCreate', '0');
			});

			before(function () {
				return browser.pressButton(EMTBrowseListToolbarCreateButton);
			});

			it('sends EMTBrowseListDispatchCreate', function () {
				browser.assert.text('#TestEMTBrowseListDispatchCreate', '1');
			});

		});

	});

	describe('EMTBrowseListToolbarCreateButtonImage', function test_EMTBrowseListToolbarCreateButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMTBrowseListToolbarCreateButtonImage } #_OLSKSharedCreate`, 1);
		});

	});

	describe('EMTBrowseListItem', function test_EMTBrowseListItem() {

		it('sets EMTBrowseListItemNotesSnippet', function () {
			browser.assert.text('.OLSKResultsListItem:nth-child(1) .EMTBrowseListItemNotesSnippet', 'alfa');
		});

	});

});
