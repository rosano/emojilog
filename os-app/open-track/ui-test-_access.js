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

	it('hides EMTTemplate', function () {
		browser.assert.elements('.EMTTemplate', 0);
	});

	it('hides EMTBrowseList', function () {
		browser.assert.elements('.EMTBrowseList', 0);
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

	it('shows OLSKAppToolbarLauncherButton', function () {
		browser.assert.elements('.OLSKAppToolbarLauncherButton', 1);
	});

	it('shows OLSKRemoteStorageLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKRemoteStorageLauncherFakeItemProxy', 1);
	});

	it('shows OLSKServiceWorkerLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKServiceWorkerLauncherFakeItemProxy', 1);
	});

	it('shows EMTTrackMasterLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('EMTTrackMasterLauncherFakeItemProxy', 1);
	});

	describe('tongue', function test_tongue() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLanguageButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'OLSKLanguageSwitcherLauncherFakeItemProxy');
		});

		it('shows OLSKLanguageSwitcherLauncherFakeItemProxy', function () {
			browser.assert.elements('.LCHLauncherPipeItem', 1);
		});

		after(function () {
			browser.pressButton('#TestLCHDebugCloseButton');
		});

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

	describe('OLSKAppToolbarLauncherButton', function test_OLSKAppToolbarLauncherButton() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		it('shows LCHLauncher', function () {
			browser.assert.elements('.LCHLauncher', 1);
		});

		context('AltSpace', function () {
			
			before(function () {
				return browser.OLSKFireKeyboardEvent(browser.window, 'Space', {
					altKey: true,
				});
			});
			
			it('hides LCHLauncher', function () {
				browser.assert.elements('.LCHLauncher', 0);
			});

		});

	});

	context('create', function () {
		
		before(function () {
			return browser.pressButton('.EMTTrackMasterCreateButton');
		});

		it('hides EMTTrackMaster', function () {
			browser.assert.elements('.EMTTrackMaster', 0);
		});

		it('hides EMTBrowseList', function () {
			browser.assert.elements('.EMTBrowseList', 0);
		});

		it('shows EMTTemplate', function () {
			browser.assert.elements('.EMTTemplate', 1);
		});
	
	});

	context('done', function () {
		
		before(function () {
			return browser.pressButton('.EMTTemplateToolbarDoneButton');
		});

		it('hides EMTTemplate', function () {
			browser.assert.elements('.EMTTemplate', 0);
		});

		it('shows EMTBrowseList', function () {
			browser.assert.elements('.EMTBrowseList', 1);
		});
	
	});

	context('close', function () {
		
		before(function () {
			return browser.pressButton('.EMTBrowseListToolbarCloseButton');
		});

		it('hides EMTBrowseList', function () {
			browser.assert.elements('.EMTBrowseList', 0);
		});

		it('shows EMTTrackMaster', function () {
			browser.assert.elements('.EMTTrackMaster', 1);
		});

		it('shows EMTTrackMasterListItem', function () {
			browser.assert.elements('.EMTTrackMasterListItem', 1);
		});
	
	});

	context('delete', function test_delete () {

		before(function () {
			return browser.pressButton('.EMTTrackMasterListItem');
		});

		before(function () {
			return browser.pressButton('.EMTBrowseListToolbarFormButton');
		});

		context('cancel', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					browser.pressButton('.EMTTemplateToolbarDiscardButton');
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});
			});

			it('shows EMTTemplate', function () {
				browser.assert.elements('.EMTTemplate', 1);
			});
		
		});

		context('confirm', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.EMTTemplateToolbarDiscardButton');
				});
			});

			it('hides EMTTrackMasterListItem', function () {
				browser.assert.elements('.EMTTrackMasterListItem', 0);
			});

			it('hides EMTBrowseList', function () {
				browser.assert.elements('.EMTBrowseList', 0);
			});

			it('hides EMTTemplate', function () {
				browser.assert.elements('.EMTTemplate', 0);
			});

			it('shows EMTTrackMaster', function () {
				browser.assert.elements('.EMTTrackMaster', 1);
			});
		
		});
		
	});

	context('browse', function test_browse () {
		
		before(function () {
			return browser.pressButton('.EMTTrackMasterCreateButton');
		});

		before(function () {
			return browser.pressButton('.EMTTemplateToolbarDoneButton');
		});

		it('hides EMTTrackMaster', function () {
			browser.assert.elements('.EMTTrackMaster', 0);
		});

		it('hides EMTTemplate', function () {
			browser.assert.elements('.EMTTemplate', 0);
		});

		it('shows EMTBrowseList', function () {
			browser.assert.elements('.EMTBrowseList', 1);
		});

		context('form', function () {

			before(function () {
				return browser.pressButton('.EMTBrowseListToolbarFormButton');
			});
			
			it('hides EMTBrowseList', function () {
				browser.assert.elements('.EMTBrowseList', 0);
			});

			it('shows EMTTemplate', function () {
				browser.assert.elements('.EMTTemplate', 1);
			});
		
		});

		context('close', function () {

			before(function () {
				return browser.pressButton('.EMTTemplateToolbarDoneButton');
			});

			before(function () {
				return browser.pressButton('.EMTBrowseListToolbarCloseButton');
			});

			it('shows EMTTrackMaster', function () {
				browser.assert.elements('.EMTTrackMaster', 1);
			});

			it('hides EMTTemplate', function () {
				browser.assert.elements('.EMTTemplate', 0);
			});

			it('hides EMTBrowseList', function () {
				browser.assert.elements('.EMTBrowseList', 0);
			});

		});
	
	});

});
