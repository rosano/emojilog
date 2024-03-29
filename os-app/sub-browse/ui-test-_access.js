const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLBrowseCloseButton: '.EMLBrowseCloseButton',
	EMLBrowseCloseButtonImage: '.EMLBrowseCloseButtonImage',

	EMLBrowseFormButton: '.EMLBrowseFormButton',
	EMLBrowseFormButtonImage: '.EMLBrowseFormButtonImage',

	EMLBrowseCreateButton: '.EMLBrowseCreateButton',
	EMLBrowseCreateButtonImage: '.EMLBrowseCreateButtonImage',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EMLBrowse_Access', function () {

	before(function () {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseJournal: JSON.stringify(StubJournalObjectValid()),
		});
	});

	it('shows OLSKCatalog', function () {
		browser.assert.elements('.OLSKCatalog', 1);
	});

	it('shows EMLBrowseCloseButton', function () {
		browser.assert.elements(EMLBrowseCloseButton, 1);
	});

	it('shows EMLBrowseCloseButtonImage', function () {
		browser.assert.elements(EMLBrowseCloseButtonImage, 1);
	});

	it('shows EMLBrowseFormButton', function () {
		browser.assert.elements(EMLBrowseFormButton, 1);
	});

	it('shows EMLBrowseFormButtonImage', function () {
		browser.assert.elements(EMLBrowseFormButtonImage, 1);
	});

	it('shows EMLBrowseCreateButton', function () {
		browser.assert.elements(EMLBrowseCreateButton, 1);
	});

	it('shows EMLBrowseCreateButtonImage', function () {
		browser.assert.elements(EMLBrowseCreateButtonImage, 1);
	});

	it('hides EMLBrowseListItem', function () {
		browser.assert.elements('.EMLBrowseListItem', 0);
	});

	it('shows OLSKPlaceholder', function () {
		browser.assert.elements('.OLSKCatalogDetail .OLSKPlaceholder', 1);
	});

	it('hides EMLBrowseInfoForm', function () {
		browser.assert.elements('.EMLBrowseInfoForm', 0);
	});

	it('hides EMLTemplate', function () {
		browser.assert.elements('.EMLTemplate', 0);
	});

	it('hides EMLBrowseInfoLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('EMLBrowseInfoLauncherFakeItemProxy', 0);
	});

	context('create', function test_create() {

		before(function () {
			return browser.pressButton('.EMLBrowseCreateButton');
		});

		it('shows EMLBrowseListItem', function () {
			browser.assert.elements('.EMLBrowseListItem', 1);
		});

		it('hides OLSKPlaceholder', function () {
			browser.assert.elements('.OLSKCatalogDetail .OLSKPlaceholder', 0);
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

		it('shows OLSKPlaceholder', function () {
			browser.assert.elements('.OLSKCatalogDetail .OLSKPlaceholder', 1);
		});

		it('hides EMLBrowseInfoForm', function () {
			browser.assert.elements('.EMLBrowseInfoForm', 0);
		});

	});

	context('form', function test_form() {

		before(function () {
			return browser.pressButton('.EMLBrowseFormButton');
		});

		it('shows EMLTemplate', function () {
			browser.assert.elements('.OLSKModalView .EMLTemplate', 1);
		});


		context('close', function close () {

			before(function () {
				return browser.pressButton('.OLSKModalViewCloseButton');
			});
			
			it('hides EMLTemplate', function () {
				browser.assert.elements('.EMLTemplate', 0);
			});
		
		});

	});

});
