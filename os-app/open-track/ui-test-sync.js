const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLTrack_Sync', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('ZDRSchemaDispatchSyncCreateJournal', function test_ZDRSchemaDispatchSyncCreateJournal () {

		before(function () {
			browser.assert.elements('.EMLTrackJournalsListItem', 0);
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateJournal');
		});

		it('adds item', function () {
			browser.assert.elements('.EMLTrackJournalsListItem', 1);
		});

	});

	describe('ZDRSchemaDispatchSyncUpdateJournal', function test_ZDRSchemaDispatchSyncUpdateJournal () {

		before(function () {
			browser.assert.text('.EMLTrackJournalsListItem', 'FakeZDRSchemaDispatchSyncCreateJournal');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateJournal');
		});

		it('updates item', function () {
			browser.assert.text('.EMLTrackJournalsListItem', 'FakeZDRSchemaDispatchSyncUpdateJournal');
		});

		context('selected same', function () {
			
			before(function () {
				return browser.click('.EMLTrackJournalsListItem');
			});

			before(function () {
				return browser.pressButton('.EMLBrowseFormButton');
			});

			before(function () {
				return browser.fill('.EMLTemplateNameField', 'FakeZDRSchemaDispatchSyncCreateJournal');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncUpdateJournal');
			});

			it('updates detail', function () {
				browser.assert.input('.EMLTemplateNameField', 'FakeZDRSchemaDispatchSyncUpdateJournal');
			});

		});

	});

	describe('ZDRSchemaDispatchSyncDeleteJournal', function test_ZDRSchemaDispatchSyncDeleteJournal () {

		before(function () {
			return browser.pressButton('.EMLBrowseCloseButton');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteJournal');
		});

		it('removes item', function () {
			browser.assert.elements('.EMLTrackJournalsListItem', 0);
		});

		context('selected same', function () {
			
			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncCreateJournal');
			});

			before(function () {
				return browser.click('.EMLTrackJournalsListItem');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncDeleteJournal');
			});

			it('clears detail', function () {
				browser.assert.elements('.EMLTrackDetail', 0);
			});
		
		});

	});

	describe('ZDRSchemaDispatchSyncConflictJournal', function test_ZDRSchemaDispatchSyncConflictJournal () {

		before(function () {
			return browser.pressButton('.EMLTrackJournalsCreateButton');
		});

		before(function () {
			return browser.fill('.EMLTemplateNameField', 'FakeZDRSchemaDispatchSyncConflictJournal');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeZDRSchemaDispatchSyncConflictJournal');
		});

		it('selects local', function () {
			browser.assert.input('.EMLTemplateNameField', 'FakeZDRSchemaDispatchSyncConflictJournal-local');
		});

	});

});
