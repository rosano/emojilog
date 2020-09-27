const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTTrackViewportFooter: '.EMTTrackViewportFooter',

	EMTTrackStorageToolbar: '.EMTTrackStorageToolbar',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTTrack_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMTTrackMaster', function () {
		browser.assert.elements('.EMTTrackMaster', 1);
	});

	it('hides EMTTrackMasterListItem', function () {
		browser.assert.elements('.EMTTrackMasterListItem', 0);
	});

	it('shows EMTTrackDetail', function () {
		browser.assert.elements('.EMTTrackDetail', 1);
	});

	it('shows OLSKDetailPlaceholder', function () {
		browser.assert.elements('.OLSKDetailPlaceholder', 1);
	});

	it('shows EMTTrackViewportFooter', function () {
		browser.assert.elements(EMTTrackViewportFooter, 1);
	});

	it('hides EMTTrackStorageToolbar', function () {
		browser.assert.elements(EMTTrackStorageToolbar, 0);
	});

	it('shows OLSKAppToolbar', function () {
		browser.assert.elements('.OLSKAppToolbar', 1);
	});

	context('click OLSKAppToolbarStorageButton', function () {
		
		before(function () {
			return browser.pressButton('.OLSKAppToolbarStorageButton');
		});

		it('shows EMTTrackStorageToolbar', function () {
			browser.assert.elements(EMTTrackStorageToolbar, 1);
		});

		it('shows OLSKStorageWidget', function () {
			browser.assert.elements('.OLSKStorageWidget', 1);
		});
	
	});

	context('create', function () {
		
		before(function () {
			return browser.pressButton(EMTTrackMasterCreateButton);
		});

		it('shows EMTTrackMasterListItem', function () {
			browser.assert.elements('.EMTTrackMasterListItem', 1);
		});

		it('hides OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 0);
		});

		it('shows EMTTrackDetailForm', function () {
			browser.assert.elements('.EMTTrackDetailForm', 1);
		});
	
	});

	context('delete', function () {

		context('cancel', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					browser.pressButton('.EMTTrackDetailToolbarDiscardButton');
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});
			});

			it('hides OLSKDetailPlaceholder', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 0);
			});

			it('shows EMTTrackDetailForm', function () {
				browser.assert.elements('.EMTTrackDetailForm', 1);
			});
		
		});

		context('confirm', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.EMTTrackDetailToolbarDiscardButton');
				});
			});

			it('hides EMTTrackMasterListItem', function () {
				browser.assert.elements('.EMTTrackMasterListItem', 0);
			});

			it('hides EMTTrackDetailForm', function () {
				browser.assert.elements('.EMTTrackDetailForm', 0);
			});

			it('shows OLSKDetailPlaceholder', function () {
				browser.assert.elements('.OLSKDetailPlaceholder', 1);
			});
		
		});
		
	});

	context('browse', function test_browse () {
		
		before(function () {
			return browser.pressButton('.EMTTrackMasterCreateButton');
		});

		before(function () {
			return browser.pressButton('.EMTTrackMasterListItem');
		});

		it('hides EMTTrackMaster', function () {
			browser.assert.elements('.EMTTrackMaster', 0);
		});

		it('hides EMTTrackDetail', function () {
			browser.assert.elements('.EMTTrackDetail', 0);
		});

		it('shows EMTBrowseList', function () {
			browser.assert.elements('.EMTBrowseList', 1);
		});
	
	});

	context('close', function test_close() {

		before(function () {
			return browser.pressButton('.EMTBrowseListToolbarCloseButton');
		});

		it('shows EMTTrackMaster', function () {
			browser.assert.elements('.EMTTrackMaster', 1);
		});

		it('shows EMTTrackDetail', function () {
			browser.assert.elements('.EMTTrackDetail', 1);
		});

		it('hides EMTTrackDetailForm', function () {
			browser.assert.elements('.EMTTrackDetailForm', 0);
		});

		it('shows OLSKDetailPlaceholder', function () {
			browser.assert.elements('.OLSKDetailPlaceholder', 1);
		});

		it('hides EMTBrowseList', function () {
			browser.assert.elements('.EMTBrowseList', 0);
		});

	});

});
