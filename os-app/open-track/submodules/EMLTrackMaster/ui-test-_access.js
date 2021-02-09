const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLTrackMaster: '.EMLTrackMaster',
	
	EMLTrackMasterHead: '.EMLTrackMasterHead',
	EMLTrackMasterCreateButton: '.EMLTrackMasterCreateButton',

	EMLTrackMasterListItem: '.EMLTrackMasterListItem',
	EMLTrackMasterListItemName: '.EMLTrackMasterListItemName',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMLTrackMaster_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMLTrackMaster', function () {
		browser.assert.elements(EMLTrackMaster, 1);
	});

	it('shows EMLTrackMasterHead', function () {
		browser.assert.elements(EMLTrackMasterHead, 1);
	});

	it('shows EMLTrackMasterCreateButton', function () {
		browser.assert.elements(EMLTrackMasterCreateButton, 1);
	});

	it('hides EMLTrackMasterListItem', function () {
		browser.assert.elements(EMLTrackMasterListItem, 0);
	});

	it('shows EMLTrackMasterLauncherItemImportData', function () {
		return browser.assert.OLSKLauncherItems('EMLTrackMasterLauncherItemImportData', 1);
	});

	context('EMLTrackMasterListItems', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLTrackMasterListItems: JSON.stringify([{
					EMLJournalName: 'alfa',
				}]),
			});
		});

		it('shows EMLTrackMasterListItem', function () {
			browser.assert.elements(EMLTrackMasterListItem, 1);
		});
		
	});

});
