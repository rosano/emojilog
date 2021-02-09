const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLTrackMaster_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('EMLTrackMasterHead', function () {
		
		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(EMLTrackMasterHead, 'OLSKToolbar');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(EMLTrackMasterHead, 'OLSKCommonEdgeBottom');
		});
		
	});

	describe('EMLTrackMasterCreateButton', function () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLTrackMasterCreateButton, 'OLSKDecorButtonNoStyle');
		});
		
		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLTrackMasterCreateButton, 'OLSKDecorTappable');
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(EMLTrackMasterCreateButton, 'accesskey', 'n');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMLTrackMasterDispatchCreate', '0');
			});
			
			before(function () {
				return browser.pressButton(EMLTrackMasterCreateButton);
			});

			it('sends EMLTrackMasterDispatchCreate', function () {
				browser.assert.text('#TestEMLTrackMasterDispatchCreate', '1');
			});
		
		});
	
	});

	describe('EMLTrackMasterListItem', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLTrackMasterListItems: JSON.stringify([{
					EMLJournalID: 'alfa',
					EMLJournalName: 'bravo',
				}]),
			});
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(EMLTrackMasterListItem, 'OLSKCommonEdgeBottom');
		});

		it('sets binds EMLJournalName', function () {
			browser.assert.text(EMLTrackMasterListItemName, 'bravo');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMLTrackMasterDispatchSelect', '0');
				browser.assert.text('#TestEMLTrackMasterDispatchSelectData', 'undefined');
			});
			
			before(function () {
				return browser.click(EMLTrackMasterListItem);
			});

			it('sends EMLTrackMasterDispatchSelect', function () {
				browser.assert.text('#TestEMLTrackMasterDispatchSelect', '1');
				browser.assert.text('#TestEMLTrackMasterDispatchSelectData', JSON.stringify({
					EMLJournalID: 'alfa',
					EMLJournalName: 'bravo',
				}));
			});
		
		});
		
	});

	describe('EMLTrackMasterListItemSelected', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLTrackMasterListItems: JSON.stringify([{
					EMLJournalID: 'alfa',
					EMLJournalName: 'bravo',
				}, {
					EMLJournalID: 'charlie',
					EMLJournalName: 'delta',
				}]),
				EMLTrackMasterListItemSelected: JSON.stringify({
					EMLJournalID: 'charlie',
					EMLJournalName: 'delta',
				}),
			});
		});

		it('classes 1', function () {
			browser.assert.elements('.EMLTrackMasterListItemSelected', 1);
			browser.assert.hasClass(`${ EMLTrackMasterListItem }:nth-child(2)`, 'EMLTrackMasterListItemSelected');
		});
		
	});

	describe.skip('EMLTrackMasterLauncherItemImportData', function test_EMLTrackMasterLauncherItemImportData() {

		before(function () {
			browser.assert.text('#TestEMLTrackMasterDispatchImportData', '0');
		});

		before(function () {
			return browser.OLSKLauncherRun('EMLTrackMasterLauncherItemImportData');
		});

		it('sends EMLTrackMasterDispatchImportData', function () {
			browser.assert.text('#TestEMLTrackMasterDispatchImportData', '1');
		});

	});

});
