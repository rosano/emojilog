const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTTrackMaster: '.EMTTrackMaster',
	
	EMTTrackMasterToolbar: '.EMTTrackMasterToolbar',
	
	EMTTrackMasterCreateButton: '.EMTTrackMasterCreateButton',

	EMTTrackMasterBody: '.EMTTrackMasterBody',
	EMTTrackMasterListItem: '.EMTTrackMasterListItem',
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

	it('shows EMTTrackMasterToolbar', function () {
		browser.assert.elements(EMTTrackMasterToolbar, 1);
	});

	it('shows EMTTrackMasterCreateButton', function () {
		browser.assert.elements(EMTTrackMasterCreateButton, 1);
	});

	it('shows EMTTrackMasterBody', function () {
		browser.assert.elements(EMTTrackMasterBody, 1);
	});

	it('hides EMTTrackMasterListItem', function () {
		browser.assert.elements(EMTTrackMasterListItem, 0);
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
