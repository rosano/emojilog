const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLTrack_Transport', function () {	

	describe('ImportJSON', function test_ImportJSON() {

		const EMLJournalName = Math.random().toString();

		const count = Math.max(1, Date.now() % 10);

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

});