const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLBrowse_Catalog', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseJournal: JSON.stringify(StubJournalObjectValid()),
		});
	});

	context('create', function test_create () {
		
		before(function () {
			return browser.pressButton('.EMLBrowseCreateButton');
		});

		it('adds item', function () {
			browser.assert.elements('.EMLBrowseListItem', 1);
		});
	
	});

	context('OLSKCollectionDispatchClick', function test_OLSKCollectionDispatchClick () {
		
		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'Escape');
		});

		before(function () {
			browser.assert.elements('.EMLBrowseInfo', 0);
		});

		before(function () {
			return browser.click('.EMLBrowseListItem');
		});

		it('selects item', function () {
			browser.assert.elements('.EMLBrowseInfo', 1);
		});
	
	});

	context('back', function test_back () {

		before(function () {
			return browser.pressButton('.EMLBrowseInfoToolbarBackButton');
		});

		it('sets focus', function () {
			browser.assert.hasClass('.OLSKCatalogDetail', 'OLSKMobileViewInactive');
		});

	});

	context('discard', function test_discard () {

		context('cancel', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					browser.pressButton('.EMLBrowseInfoToolbarDiscardButton');
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});
			});

			it('does nothing', function () {
				browser.assert.elements('.EMLBrowseInfo', 1);
			});
		
		});

		context('confirm', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.EMLBrowseInfoToolbarDiscardButton');
				});
			});

			it('removes item', function () {
				browser.assert.elements('.EMLBrowseListItem', 0);
			});
		
		});
		
	});

	context('OLSKCollectionDispatchArrow', function test_OLSKCollectionDispatchArrow () {
		
		before(function () {
			return browser.pressButton('.EMLBrowseCreateButton');
		});

		before(function () {
			return browser.pressButton('.EMLBrowseCreateButton');
		});

		before(function () {
			return browser.focus('.OLSKNarrowFilterField');
		});

		before(function () {
			return browser.OLSKFireKeyboardEvent(browser.window, 'ArrowDown');
		});

		it('binds OLSKCollectionItemsLocus', function () {
			browser.assert.hasClass('.OLSKCollectionItem:nth-child(2)', 'OLSKCollectionItemLocus');
		});
	
	});

});
