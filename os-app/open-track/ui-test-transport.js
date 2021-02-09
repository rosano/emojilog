const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLTrack_Transport', function () {	

	const EMLJournalName = Math.random().toString();

	const count = Math.max(1, Date.now() % 10);

	const json = [];

	describe('ImportJSON', function test_ImportJSON() {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'EMLTrackLauncherItemDebug_PromptFakeImportSerialized');
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click('.LCHLauncherPipeItem');
			}, function (dialog) {
				dialog.response = JSON.stringify([StubJournalObjectValid({
					EMLJournalName,
					$EMLJournalMemos: Array.from(Array(count)).map(function (e) {
						return StubMemoObjectValid({
							EMLMemoID: Math.random().toString(),
						});
					}),
				})]);

				json.push(dialog.response);

				return dialog;
			});
		});

		it('creates journal', function () {
			browser.assert.text('.EMLTrackMasterListItemName', EMLJournalName);
		});

		context('click', function () {

			before(function () {
				return browser.pressButton('.EMLTrackMasterListItem');
			});
			
			it('creates memo', function () {
				browser.assert.elements('.EMLBrowseListItem', count);
			});
		
		});

	});

	describe('ExportJSON', function test_ExportJSON() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'EMLTrackLauncherItemDebug_AlertFakeExportSerialized');
		});

		it('exports file', async function() {
			const response = JSON.parse(await browser.OLSKAlertTextAsync(function () {
    		return browser.click('.LCHLauncherPipeItem');
    	}));

    	const date = response.OLSKDownloadName.split('-').pop().split('.').shift();

    	browser.assert.deepEqual(Object.assign(response, {
    		OLSKDownloadData: JSON.parse(response.OLSKDownloadData),
    	}), {
    		OLSKDownloadName: `${ browser.window.location.hostname }-${ date }.json`,
    		OLSKDownloadData: JSON.parse(json.pop()),
    	});
    });

	});

	describe('EMLBrowseLauncherItemExport', function test_EMLBrowseLauncherItemExport() {

		const EMLJournalName = Math.random().toString();

		before(function () {
			return browser.pressButton('.EMLBrowseListToolbarCloseButton');
		});

		before(function () {
			return browser.pressButton('.EMLTrackMasterCreateButton');
		});

		before(function () {
			return browser.fill('.EMLTemplateFormNameField', EMLJournalName);
		});

		before(function () {
			return browser.pressButton('.EMLTemplateToolbarDoneButton');
		});

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'EMLBrowseLauncherItemExport');
		});

		it('exports file', async function() {
			const response = JSON.parse(await browser.OLSKAlertTextAsync(function () {
    		return browser.click('.LCHLauncherPipeItem');
    	}));

    	const date = response.OLSKDownloadName.split('-').pop().split('.').shift();
    	const item = JSON.parse(response.OLSKDownloadData).pop();

    	browser.assert.deepEqual(Object.assign(response, {
    		OLSKDownloadData: JSON.parse(response.OLSKDownloadData),
    	}), {
    		OLSKDownloadName: `${ browser.window.location.hostname }-${ date }.json`,
    		OLSKDownloadData: [StubJournalObjectValid(Object.assign(item, {
    			EMLJournalName,
    		}))],
    	});
    });

	});

});