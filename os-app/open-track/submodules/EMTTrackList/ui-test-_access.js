import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTTrackList: '.EMTTrackList',
	
	EMTTrackListCreateButton: '.EMTTrackListCreateButton',

	EMTTrackListItem: '.EMTTrackListItem',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTTrackList_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	it('shows EMTTrackList', function () {
		browser.assert.elements(EMTTrackList, 1);
	});

	it('shows OLSKToolbar', function () {
		browser.assert.elements('.OLSKToolbar', 1);
	});

	it('shows EMTTrackListCreateButton', function () {
		browser.assert.elements(EMTTrackListCreateButton, 1);
	});

	it('hides EMTTrackListItem', function () {
		browser.assert.elements(EMTTrackListItem, 0);
	});

	context('EMTTrackListItems', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackListItems: JSON.stringify([{
					EMTDocumentName: 'alfa',
				}]),
			});
		});

		it('shows EMTTrackListItem', function () {
			browser.assert.elements(EMTTrackListItem, 1);
		});
		
	});

});
