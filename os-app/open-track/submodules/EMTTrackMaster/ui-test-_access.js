const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTTrackMaster: '.EMTTrackMaster',
	
	EMTTrackMasterHead: '.EMTTrackMasterHead',
	EMTTrackMasterCreateButton: '.EMTTrackMasterCreateButton',

	EMTTrackMasterListItem: '.EMTTrackMasterListItem',
	EMTTrackMasterListItemName: '.EMTTrackMasterListItemName',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTTrackMaster_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMTTrackMaster', function () {
		browser.assert.elements(EMTTrackMaster, 1);
	});

	it('shows EMTTrackMasterHead', function () {
		browser.assert.elements(EMTTrackMasterHead, 1);
	});

	it('shows EMTTrackMasterCreateButton', function () {
		browser.assert.elements(EMTTrackMasterCreateButton, 1);
	});

	it('hides EMTTrackMasterListItem', function () {
		browser.assert.elements(EMTTrackMasterListItem, 0);
	});

	it('shows EMTTrackMasterLauncherItemImportData', function () {
		return browser.assert.OLSKLauncherItems('EMTTrackMasterLauncherItemImportData', 1);
	});

	context('EMTTrackMasterListItems', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackMasterListItems: JSON.stringify([{
					EMTJournalName: 'alfa',
				}]),
			});
		});

		it('shows EMTTrackMasterListItem', function () {
			browser.assert.elements(EMTTrackMasterListItem, 1);
		});
		
	});

});
