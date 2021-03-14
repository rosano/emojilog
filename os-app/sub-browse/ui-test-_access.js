const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLBrowseListToolbarCloseButton: '.EMLBrowseListToolbarCloseButton',
	EMLBrowseListToolbarCloseButtonImage: '.EMLBrowseListToolbarCloseButtonImage',

	EMLBrowseListToolbarFormButton: '.EMLBrowseListToolbarFormButton',
	EMLBrowseListToolbarFormButtonImage: '.EMLBrowseListToolbarFormButtonImage',

	EMLBrowseListToolbarCreateButton: '.EMLBrowseListToolbarCreateButton',
	EMLBrowseListToolbarCreateButtonImage: '.EMLBrowseListToolbarCreateButtonImage',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EMLBrowse_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseJournalSelected: JSON.stringify(StubJournalObjectValid()),
		});
	});

	it('shows OLSKCatalog', function () {
		browser.assert.elements('.OLSKCatalog', 1);
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

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('hides EMLBrowseInfoForm', function () {
		browser.assert.elements('.EMLBrowseInfoForm', 0);
	});

	it('hides EMLBrowseInfoLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('EMLBrowseInfoLauncherFakeItemProxy', 0);
	});

	context('create', function test_create() {

		before(function () {
			return browser.pressButton('.EMLBrowseListToolbarCreateButton');
		});

		it('shows EMLBrowseListItem', function () {
			browser.assert.elements('.EMLBrowseListItem', 1);
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('shows EMLBrowseInfoForm', function () {
			browser.assert.elements('.EMLBrowseInfoForm', 1);
		});

	});

	context('select', function test_select() {

		it('shows EMLBrowseInfoLauncherFakeItemProxy', function () {
			return browser.assert.OLSKLauncherItems('EMLBrowseInfoLauncherFakeItemProxy', 1);
		});

	});

	context('discard', function test_discard() {

		before(function () {
			return browser.pressButton('.EMLBrowseInfoToolbarDiscardButton');
		});

		it('hides EMLBrowseListItem', function () {
			browser.assert.elements('.EMLBrowseListItem', 0);
		});

		it('shows OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 1);
		});

		it('hides EMLBrowseInfoForm', function () {
			browser.assert.elements('.EMLBrowseInfoForm', 0);
		});

	});

});
