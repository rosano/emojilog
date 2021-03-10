const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uItem = function (inputData = 'alfa') {
	return {
		EMLMemoID: inputData,
		EMLMemoEventDate: new Date('2019-02-23T13:56:36Z'),
		EMLMemoNotes: 'alfa',
	};
};

describe('EMLBrowseList_Misc', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseListItems: JSON.stringify([uItem('alfa'), uItem('bravo')]),
			EMLBrowseListItemSelected: JSON.stringify(uItem('alfa')),
			EMLBrowseListFilterText: 'alfa',
		});
	});

	describe('EMLBrowseListToolbarCloseButton', function test_EMLBrowseListToolbarCloseButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLBrowseListToolbarCloseButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLBrowseListToolbarCloseButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMLBrowseListToolbarCloseButton, 'OLSKToolbarButton');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMLBrowseListDispatchClose', '0');
			});

			before(function () {
				return browser.pressButton(EMLBrowseListToolbarCloseButton);
			});

			it('sends EMLBrowseListDispatchClose', function () {
				browser.assert.text('#TestEMLBrowseListDispatchClose', '1');
			});

		});

	});

	describe('EMLBrowseListToolbarCloseButtonImage', function test_EMLBrowseListToolbarCloseButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMLBrowseListToolbarCloseButtonImage } #_OLSKSharedBack`, 1);
		});

	});

	describe('OLSKMasterList', function test_OLSKMasterList() {

		it('binds OLSKMasterListFilterText', function () {
			browser.assert.input('.OLSKMasterListFilterField', 'alfa');
		});

		it('sets OLSKMasterListItemAccessibilitySummaryFunction', function () {
			browser.assert.attribute('.OLSKResultsListItem:nth-child(1) .OLSKMasterListItem', 'aria-label', 'Untitled');
		});

		it('sets OLSKMasterListItemSelected', function () {
			browser.assert.hasClass('.OLSKResultsListItem:nth-child(1)', 'OLSKResultsListItemSelected');
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestEMLBrowseListDispatchFilter', '0');
				browser.assert.text('#TestEMLBrowseListDispatchFilterData', 'undefined');
			});

			before(function () {
				browser.fill('.OLSKMasterListFilterField', 'charlie');
			});

			it('sends EMLBrowseListDispatchFilter', function () {
				browser.assert.text('#TestEMLBrowseListDispatchFilter', '1');
				browser.assert.text('#TestEMLBrowseListDispatchFilterData', 'charlie');
			});

		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMLBrowseListDispatchClick', '0');
				browser.assert.text('#TestEMLBrowseListDispatchClickData', 'undefined');
			});

			before(function () {
				return browser.click('.EMLBrowseListItem');
			});

			it('sends EMLBrowseListDispatchClick', function () {
				browser.assert.text('#TestEMLBrowseListDispatchClick', '1');
				browser.assert.text('#TestEMLBrowseListDispatchClickData', JSON.stringify(uItem()));
			});

		});

	});

	describe('EMLBrowseListToolbarFormButton', function test_EMLBrowseListToolbarFormButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLBrowseListToolbarFormButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLBrowseListToolbarFormButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMLBrowseListToolbarFormButton, 'OLSKToolbarButton');
		});

		it('sets accesskey', function () {
			browser.assert.attribute(EMLBrowseListToolbarFormButton, 'accesskey', 'f');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMLBrowseListDispatchForm', '0');
			});

			before(function () {
				return browser.pressButton(EMLBrowseListToolbarFormButton);
			});

			it('sends EMLBrowseListDispatchForm', function () {
				browser.assert.text('#TestEMLBrowseListDispatchForm', '1');
			});

		});

	});

	describe('EMLBrowseListToolbarFormButtonImage', function test_EMLBrowseListToolbarFormButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMLBrowseListToolbarFormButtonImage } #_OLSKSharedEdit`, 1);
		});

	});

	describe('EMLBrowseListToolbarCreateButton', function test_EMLBrowseListToolbarCreateButton() {

		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLBrowseListToolbarCreateButton, 'OLSKDecorButtonNoStyle');
		});

		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLBrowseListToolbarCreateButton, 'OLSKDecorTappable');
		});

		it('classes OLSKToolbarButton', function () {
			browser.assert.hasClass(EMLBrowseListToolbarCreateButton, 'OLSKToolbarButton');
		});

		it('sets accesskey', function () {
			browser.assert.attribute(EMLBrowseListToolbarCreateButton, 'accesskey', 'n');
		});

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMLBrowseListDispatchCreate', '0');
			});

			before(function () {
				return browser.pressButton(EMLBrowseListToolbarCreateButton);
			});

			it('sends EMLBrowseListDispatchCreate', function () {
				browser.assert.text('#TestEMLBrowseListDispatchCreate', '1');
			});

		});

	});

	describe('EMLBrowseListToolbarCreateButtonImage', function test_EMLBrowseListToolbarCreateButtonImage() {

		it('sets src', function () {
			browser.assert.elements(`${ EMLBrowseListToolbarCreateButtonImage } #_OLSKSharedCreate`, 1);
		});

	});

	describe('EMLBrowseListItem', function test_EMLBrowseListItem() {

		it('sets EMLBrowseListItemNotesSnippet', function () {
			browser.assert.text('.OLSKResultsListItem:nth-child(1) .EMLBrowseListItemNotesSnippet', 'alfa');
		});

	});

});
