const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLTrackViewportFooter: '.EMLTrackViewportFooter',

	EMLTrackCloudToolbar: '.EMLTrackCloudToolbar',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EMLTrack_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMLTrackJournals', function () {
		browser.assert.elements('.EMLTrackJournals', 1);
	});

	it('hides EMLTrackJournalsListItem', function () {
		browser.assert.elements('.EMLTrackJournalsListItem', 0);
	});

	it('hides OLSKCatalog', function () {
		browser.assert.elements('.OLSKCatalog', 0);
	});

	it('shows EMLTrackViewportFooter', function () {
		browser.assert.elements(EMLTrackViewportFooter, 1);
	});

	it('hides EMLTrackCloudToolbar', function () {
		browser.assert.elements(EMLTrackCloudToolbar, 0);
	});

	it('shows OLSKAppToolbar', function () {
		browser.assert.elements('.OLSKAppToolbar', 1);
	});

	it('shows OLSKAppToolbarAproposButton', function () {
		browser.assert.elements('.OLSKAppToolbarAproposButton', 1);
	});

	it('shows OLSKAppToolbarLanguageButton', function () {
		browser.assert.elements('.OLSKAppToolbarLanguageButton', 1);
	});

	it('shows OLSKAppToolbarGuideLink', function () {
		browser.assert.elements('.OLSKAppToolbarGuideLink', 1);
	});

	it('shows OLSKAppToolbarLauncherButton', function () {
		browser.assert.elements('.OLSKAppToolbarLauncherButton', 1);
	});

	it('shows OLSKInstall', function () {
		browser.assert.elements('.OLSKInstall', 1);
	});

	it('hides EMLTrackLauncherItemExportSelectedJSON', function () {
		return browser.assert.OLSKLauncherItems('EMLTrackLauncherItemExportSelectedJSON', 0);
	});

	it('shows ZDRLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('ZDRLauncherFakeItemProxy', 1);
	});

	it('shows OLSKTransportLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKTransportLauncherFakeItemProxy', 1);
	});

	it('shows OLSKRemoteStorageLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKRemoteStorageLauncherFakeItemProxy', 1);
	});

	it('shows OLSKServiceWorkerLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKServiceWorkerLauncherFakeItemProxy', 1);
	});

	it('shows OLSKFundLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('OLSKFundLauncherFakeItemProxy', 1);
	});

	it('shows EMLTrackJournalsLauncherFakeItemProxy', function () {
		return browser.assert.OLSKLauncherItems('EMLTrackJournalsLauncherFakeItemProxy', 1);
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

	context('click OLSKAppToolbarCloudButton', function () {
		
		before(function () {
			return browser.pressButton('.OLSKAppToolbarCloudButton');
		});

		it('shows EMLTrackCloudToolbar', function () {
			browser.assert.elements(EMLTrackCloudToolbar, 1);
		});

		it('shows OLSKCloud', function () {
			browser.assert.elements('.OLSKCloud', 1);
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

	context('create', function test_create () {
		
		before(function () {
			return browser.pressButton('.EMLTrackJournalsCreateButton');
		});

		it('hides EMLTrackJournals', function () {
			browser.assert.elements('.EMLTrackJournals', 0);
		});

		it('show OLSKCatalog', function () {
			browser.assert.elements('.OLSKCatalog', 1);
		});

		it('shows EMLTemplate', function () {
			browser.assert.elements('.EMLTemplate', 1);
		});
	
	});

	context('close', function test_close () {
		
		before(function () {
			return browser.pressButton('.OLSKModalViewCloseButton');
		});

		before(function () {
			return browser.pressButton('.EMLBrowseCloseButton');
		});

		it('hides OLSKCatalog', function () {
			browser.assert.elements('.OLSKCatalog', 0);
		});

		it('shows EMLTrackJournals', function () {
			browser.assert.elements('.EMLTrackJournals', 1);
		});

		it('shows EMLTrackJournalsListItem', function () {
			browser.assert.elements('.EMLTrackJournalsListItem', 1);
		});
	
	});

	context('delete', function test_delete () {

		before(function () {
			return browser.click('.EMLTrackJournalsListItem');
		});

		before(function () {
			return browser.pressButton('.EMLBrowseFormButton');
		});

		before(function () {
			return browser.OLSKConfirm(function () {
				return browser.pressButton('.EMLTemplateDiscardButton');
			});
		});

		it('hides EMLTrackJournalsListItem', function () {
			browser.assert.elements('.EMLTrackJournalsListItem', 0);
		});

		it('hides OLSKCatalog', function () {
			browser.assert.elements('.OLSKCatalog', 0);
		});

		it('shows EMLTrackJournals', function () {
			browser.assert.elements('.EMLTrackJournals', 1);
		});
		
	});

	context('browse', function test_browse () {
		
		before(function () {
			return browser.pressButton('.EMLTrackJournalsCreateButton');
		});

		before(function () {
			return browser.pressButton('.OLSKModalViewCloseButton');
		});

		it('hides EMLTrackJournals', function () {
			browser.assert.elements('.EMLTrackJournals', 0);
		});

		it('shows OLSKCatalog', function () {
			browser.assert.elements('.OLSKCatalog', 1);
		});

		it('shows EMLTrackLauncherItemExportSelectedJSON', function () {
			return browser.assert.OLSKLauncherItems('EMLTrackLauncherItemExportSelectedJSON', 1);
		});

		it('shows EMLBrowseLauncherFakeItemProxy', function () {
			return browser.assert.OLSKLauncherItems('EMLBrowseLauncherFakeItemProxy', 1);
		});

		context('close', function () {

			before(function () {
				return browser.pressButton('.EMLBrowseCloseButton');
			});

			it('shows EMLTrackJournals', function () {
				browser.assert.elements('.EMLTrackJournals', 1);
			});

			it('hides OLSKCatalog', function () {
				browser.assert.elements('.OLSKCatalog', 0);
			});

		});
	
	});

});
