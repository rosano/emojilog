const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTBrowseList: '.EMTBrowseList',

	EMTBrowseListToolbarCloseButton: '.EMTBrowseListToolbarCloseButton',
	EMTBrowseListToolbarCloseButtonImage: '.EMTBrowseListToolbarCloseButtonImage',

	EMTBrowseListToolbarCreateButton: '.EMTBrowseListToolbarCreateButton',
	EMTBrowseListToolbarCreateButtonImage: '.EMTBrowseListToolbarCreateButtonImage',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EMTBrowseList_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMTBrowseList', function () {
		browser.assert.elements(EMTBrowseList, 1);
	});

	it('shows OLSKMasterList', function () {
		browser.assert.elements('.OLSKMasterList', 1);
	});

	it('shows EMTBrowseListToolbarCloseButton', function () {
		browser.assert.elements(EMTBrowseListToolbarCloseButton, 1);
	});

	it('shows EMTBrowseListToolbarCloseButtonImage', function () {
		browser.assert.elements(EMTBrowseListToolbarCloseButtonImage, 1);
	});

	it('shows EMTBrowseListToolbarCreateButton', function () {
		browser.assert.elements(EMTBrowseListToolbarCreateButton, 1);
	});

	it('shows EMTBrowseListToolbarCreateButtonImage', function () {
		browser.assert.elements(EMTBrowseListToolbarCreateButtonImage, 1);
	});

	it('hides EMTBrowseListItem', function () {
		browser.assert.elements('.EMTBrowseListItem', 0);
	});

	context('EMTBrowseListItems', function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTBrowseListItems: JSON.stringify([{
					EMTMemoEventDate: new Date('2019-02-23T13:56:36Z'),
					EMTMemoNotes: 'alfa',
				}]),
			});
		});

		it('shows EMTBrowseListItem', function () {
			browser.assert.elements('.EMTBrowseListItem', 1);
		});

	});

});
