const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLBrowse_Sync', function () {	

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLBrowseJournalSelected: JSON.stringify(StubJournalObjectValid()),
		});
	});

	describe('SyncCreateMemo', function test_SyncCreateMemo () {

		before(function () {
			browser.assert.elements('.OLSKResultsListItem', 0);
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeSyncCreateMemo');
		});

		it('adds item', function () {
			browser.assert.elements('.OLSKResultsListItem', 1);
		});

	});

	describe('SyncUpdateMemo', function test_SyncUpdateMemo () {

		before(function () {
			browser.assert.text('.EMLBrowseListItemNotesSnippet', 'FakeSyncCreateMemo');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeSyncUpdateMemo');
		});

		it('updates item', function () {
			browser.assert.text('.EMLBrowseListItemNotesSnippet', 'FakeSyncUpdateMemo');
		});

		context('selected same', function () {
			
			before(function () {
				return browser.click('.OLSKResultsListItem');
			});

			before(function () {
				return browser.fill('.EMLBrowseInfoFormNotesField', 'FakeSyncCreateMemo');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeSyncUpdateMemo');
			});

			it('updates detail', function () {
				browser.assert.input('.EMLBrowseInfoFormNotesField', 'FakeSyncUpdateMemo');
			});

		});

	});

	describe('SyncDeleteMemo', function test_SyncDeleteMemo () {

		before(function () {
			return browser.OLSKLauncherRun('FakeSyncDeleteMemo');
		});

		it('removes item', function () {
			browser.assert.elements('.OLSKResultsListItem', 0);
		});

		context('selected same', function () {
			
			before(function () {
				return browser.OLSKLauncherRun('FakeSyncCreateMemo');
			});

			before(function () {
				return browser.click('.OLSKResultsListItem');
			});

			before(function () {
				return browser.OLSKLauncherRun('FakeSyncDeleteMemo');
			});

			it('clears detail', function () {
				browser.assert.elements('.EMLBrowseDetail', 0);
			});
		
		});

	});

	describe('SyncConflictMemo', function test_SyncConflictMemo () {

		before(function () {
			return browser.pressButton('.EMLBrowseCreateButton');
		});

		before(function () {
			return browser.fill('.EMLBrowseInfoFormNotesField', 'FakeSyncConflictMemo');
		});

		before(function () {
			return browser.OLSKLauncherRun('FakeSyncConflictMemo');
		});

		it('selects local', function () {
			browser.assert.text('.EMLBrowseListItemNotesSnippet', 'FakeSyncConflictMemo-local');
		});

	});

});
