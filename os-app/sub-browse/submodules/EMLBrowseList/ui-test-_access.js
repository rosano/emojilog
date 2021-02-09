const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLBrowseList: '.EMLBrowseList',

	EMLBrowseListToolbarCloseButton: '.EMLBrowseListToolbarCloseButton',
	EMLBrowseListToolbarCloseButtonImage: '.EMLBrowseListToolbarCloseButtonImage',

	EMLBrowseListToolbarFormButton: '.EMLBrowseListToolbarFormButton',
	EMLBrowseListToolbarFormButtonImage: '.EMLBrowseListToolbarFormButtonImage',

	EMLBrowseListToolbarCreateButton: '.EMLBrowseListToolbarCreateButton',
	EMLBrowseListToolbarCreateButtonImage: '.EMLBrowseListToolbarCreateButtonImage',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EMLBrowseList_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMLBrowseList', function () {
		browser.assert.elements(EMLBrowseList, 1);
	});

	it('shows OLSKMasterList', function () {
		browser.assert.elements('.OLSKMasterList', 1);
	});

	it('shows EMLBrowseListToolbarCloseButton', function () {
		browser.assert.elements(EMLBrowseListToolbarCloseButton, 1);
	});

	it('shows EMLBrowseListToolbarCloseButtonImage', function () {
		browser.assert.elements(EMLBrowseListToolbarCloseButtonImage, 1);
	});

	it('shows EMLBrowseListToolbarFormButton', function () {
		browser.assert.elements(EMLBrowseListToolbarFormButton, 1);
	});

	it('shows EMLBrowseListToolbarFormButtonImage', function () {
		browser.assert.elements(EMLBrowseListToolbarFormButtonImage, 1);
	});

	it('shows EMLBrowseListToolbarCreateButton', function () {
		browser.assert.elements(EMLBrowseListToolbarCreateButton, 1);
	});

	it('shows EMLBrowseListToolbarCreateButtonImage', function () {
		browser.assert.elements(EMLBrowseListToolbarCreateButtonImage, 1);
	});

	it('hides EMLBrowseListItem', function () {
		browser.assert.elements('.EMLBrowseListItem', 0);
	});

	context('EMLBrowseListItems', function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLBrowseListItems: JSON.stringify([{
					EMLMemoEventDate: new Date('2019-02-23T13:56:36Z'),
					EMLMemoNotes: 'alfa',
				}]),
			});
		});

		it('shows EMLBrowseListItem', function () {
			browser.assert.elements('.EMLBrowseListItem', 1);
		});

	});

});
