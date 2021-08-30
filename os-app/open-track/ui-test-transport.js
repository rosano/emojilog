const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLTrack_Transport', function () {	

	const json = {};

	describe('OLSKTransportDispatchImportJSON', function test_OLSKTransportDispatchImportJSON() {

		const EMLJournalName = Math.random().toString();

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'OLSKTransportLauncherFakeItemImportSerialized');
		});

		before(function () {
			return browser.OLSKPrompt(function () {
				return browser.click('.LCHLauncherPipeItem');
			}, function (dialog) {
				const EMLJournalID = Math.random().toString();

				dialog.response = JSON.stringify({
					EMLJournal: [StubJournalObjectValid({
						EMLJournalName,
						EMLJournalID,
						$EMLJournalMemos: [StubMemoObjectValid({
							EMLMemoJournalID: EMLJournalID,
						})],
					})],
					EMLSetting: [StubSettingObjectValid()],
				});

				Object.assign(json, JSON.parse(dialog.response));

				return dialog;
			});
		});

		it('creates journal', function () {
			browser.assert.text('.EMLTrackTimerLabel', EMLJournalName);
		});

		context('click', function () {

			before(function () {
				return browser.click('.EMLTrackJournalsListItem');
			});
			
			it('creates memo', function () {
				browser.assert.elements('.EMLBrowseListItem', 1);
			});
		
		});

	});

	describe('OLSKTransportDispatchExportInput', function test_OLSKTransportDispatchExportInput() {

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'OLSKTransportLauncherFakeItemExportSerialized');
		});

		it('exports file', async function() {
			const response = JSON.parse(await browser.OLSKAlertAsync(function () {
    		return browser.click('.LCHLauncherPipeItem');
    	}));

    	const date = response.OLSKDownloadName.split('-').pop().split('.').shift();

    	browser.assert.deepEqual(Object.assign(response, {
    		OLSKDownloadData: JSON.parse(response.OLSKDownloadData),
    	}), {
    		OLSKDownloadName: `${ browser.window.location.hostname }-${ date }.json`,
    		OLSKDownloadData: json,
    	});
    });

	});

	describe('EMLTrackLauncherItemExportSelectedJSON', function test_EMLTrackLauncherItemExportSelectedJSON() {

		const EMLJournalName = Math.random().toString();

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		before(function () {
			return browser.pressButton('.EMLTrackJournalsCreateButton');
		});

		before(function () {
			return browser.fill('.EMLTemplateNameField', EMLJournalName);
		});

		before(function () {
			return browser.pressButton('.OLSKModalViewCloseButton');
		});

		before(function () {
			return browser.pressButton('.OLSKAppToolbarLauncherButton');
		});

		before(function () {
			return browser.fill('.LCHLauncherFilterInput', 'EMLTrackLauncherItemDebug_AlertFakeExportSelectedSerialized');
		});

		it('exports file', async function() {
			const response = JSON.parse(await browser.OLSKAlertAsync(function () {
    		return browser.click('.LCHLauncherPipeItem');
    	}));

    	const date = response.OLSKDownloadName.split('-').pop().split('.').shift();
    	const item = JSON.parse(response.OLSKDownloadData).EMLJournal.shift();

    	browser.assert.deepEqual(Object.assign(response, {
    		OLSKDownloadData: JSON.parse(response.OLSKDownloadData),
    	}), {
    		OLSKDownloadName: `${ browser.window.location.hostname }-${ date }.json`,
    		OLSKDownloadData: {
    			EMLJournal: [StubJournalObjectValid(Object.assign(item, {
    				EMLJournalName,
    			}))],
	    		EMLSetting: [],
    		},
    	});
    });

	});

});
