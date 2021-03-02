const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLTrackViewportFooter: '.EMLTrackViewportFooter',

	EMLTrackStorageToolbar: '.EMLTrackStorageToolbar',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMLTrack_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMLTrackMaster', function () {
		browser.assert.elements('.EMLTrackMaster', 1);
	});

	it('hides EMLTrackMasterListItem', function () {
		browser.assert.elements('.EMLTrackMasterListItem', 0);
	});

	it('hides EMLTemplate', function () {
		browser.assert.elements('.EMLTemplate', 0);
	});

	it('hides EMLBrowseList', function () {
		browser.assert.elements('.EMLBrowseList', 0);
	});

	it('shows EMLTrackViewportFooter', function () {
		browser.assert.elements(EMLTrackViewportFooter, 1);
	});

	it('hides EMLTrackStorageToolbar', function () {
		browser.assert.elements(EMLTrackStorageToolbar, 0);
	});

	it('shows OLSKAppToolbar', function () {
		browser.assert.elements('.OLSKAppToolbar', 1);
	});

	it('shows OLSKAppToolbarAproposButton', function () {
		browser.assert.elements('.OLSKAppToolbarAproposButton', 1);
	});

	it('shows OLSKAppToolbarLauncherButton', function () {
		browser.assert.elements('.OLSKAppToolbarLauncherButton', 1);
	});

	it('shows EMLTrackLauncherItemImportJSON', function () {
		return browser.assert.OLSKLauncherItems('EMLTrackLauncherItemImportJSON', 1);
	});

	it('shows EMLTrackLauncherItemExportJSON', function () {
		return browser.assert.OLSKLauncherItems('EMLTrackLauncherItemExportJSON', 1);
	});

	it('shows OLSKRemoteStorageLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKRemoteStorageLauncherFakeItemProxy', 1);
	});

	it('shows OLSKServiceWorkerLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKServiceWorkerLauncherFakeItemProxy', 1);
	});

	it('shows EMLTrackMasterLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('EMLTrackMasterLauncherFakeItemProxy', 1);
	});

	it('hides EMLBrowseLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('EMLBrowseLauncherFakeItemProxy', 0);
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

		it('shows EMLTrackStorageToolbar', function () {
			browser.assert.elements(EMLTrackStorageToolbar, 1);
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
			return browser.pressButton('.EMLTrackMasterCreateButton');
		});

		it('hides EMLTrackMaster', function () {
			browser.assert.elements('.EMLTrackMaster', 0);
		});

		it('hides EMLBrowseList', function () {
			browser.assert.elements('.EMLBrowseList', 0);
		});

		it('shows EMLTemplate', function () {
			browser.assert.elements('.EMLTemplate', 1);
		});
	
	});

	context('done', function () {
		
		before(function () {
			return browser.pressButton('.EMLTemplateToolbarDoneButton');
		});

		it('hides EMLTemplate', function () {
			browser.assert.elements('.EMLTemplate', 0);
		});

		it('shows EMLBrowseList', function () {
			browser.assert.elements('.EMLBrowseList', 1);
		});
	
	});

	context('close', function () {
		
		before(function () {
			return browser.pressButton('.EMLBrowseListToolbarCloseButton');
		});

		it('hides EMLBrowseList', function () {
			browser.assert.elements('.EMLBrowseList', 0);
		});

		it('shows EMLTrackMaster', function () {
			browser.assert.elements('.EMLTrackMaster', 1);
		});

		it('shows EMLTrackMasterListItem', function () {
			browser.assert.elements('.EMLTrackMasterListItem', 1);
		});
	
	});

	context('delete', function test_delete () {

		before(function () {
			return browser.pressButton('.EMLTrackMasterListItem');
		});

		before(function () {
			return browser.pressButton('.EMLBrowseListToolbarFormButton');
		});

		context('cancel', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					browser.pressButton('.EMLTemplateToolbarDiscardButton');
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});
			});

			it('shows EMLTemplate', function () {
				browser.assert.elements('.EMLTemplate', 1);
			});
		
		});

		context('confirm', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton('.EMLTemplateToolbarDiscardButton');
				});
			});

			it('hides EMLTrackMasterListItem', function () {
				browser.assert.elements('.EMLTrackMasterListItem', 0);
			});

			it('hides EMLBrowseList', function () {
				browser.assert.elements('.EMLBrowseList', 0);
			});

			it('hides EMLTemplate', function () {
				browser.assert.elements('.EMLTemplate', 0);
			});

			it('shows EMLTrackMaster', function () {
				browser.assert.elements('.EMLTrackMaster', 1);
			});
		
		});
		
	});

	context('browse', function test_browse () {
		
		before(function () {
			return browser.pressButton('.EMLTrackMasterCreateButton');
		});

		before(function () {
			return browser.pressButton('.EMLTemplateToolbarDoneButton');
		});

		it('hides EMLTrackMaster', function () {
			browser.assert.elements('.EMLTrackMaster', 0);
		});

		it('hides EMLTemplate', function () {
			browser.assert.elements('.EMLTemplate', 0);
		});

		it('shows EMLBrowseList', function () {
			browser.assert.elements('.EMLBrowseList', 1);
		});

		it('shows EMLBrowseLauncherFakeItemProxy', function () {
			return browser.assert.OLSKLauncherItems('EMLBrowseLauncherFakeItemProxy', 1);
		});

		context('form', function () {

			before(function () {
				return browser.pressButton('.EMLBrowseListToolbarFormButton');
			});
			
			it('hides EMLBrowseList', function () {
				browser.assert.elements('.EMLBrowseList', 0);
			});

			it('shows EMLTemplate', function () {
				browser.assert.elements('.EMLTemplate', 1);
			});
		
		});

		context('close', function () {

			before(function () {
				return browser.pressButton('.EMLTemplateToolbarDoneButton');
			});

			before(function () {
				return browser.pressButton('.EMLBrowseListToolbarCloseButton');
			});

			it('shows EMLTrackMaster', function () {
				browser.assert.elements('.EMLTrackMaster', 1);
			});

			it('hides EMLTemplate', function () {
				browser.assert.elements('.EMLTemplate', 0);
			});

			it('hides EMLBrowseList', function () {
				browser.assert.elements('.EMLBrowseList', 0);
			});

		});
	
	});

});
