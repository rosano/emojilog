import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTTrackList_Misc', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});

	describe('EMTTrackList', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(EMTTrackList, 'OLSKViewportMaster')
		});
	
	});

	describe('EMTTrackListCreateButton', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(EMTTrackListCreateButton, 'OLSKLayoutButtonNoStyle')
			browser.assert.hasClass(EMTTrackListCreateButton, 'OLSKLayoutElementTappable')
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(EMTTrackListCreateButton, 'accesskey', 'n')
		});


		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMTTrackListDispatchCreate', '0')
			});
			
			before(function () {
				return browser.pressButton(EMTTrackListCreateButton);
			});

			it('sends EMTTrackListDispatchCreate', function () {
				browser.assert.text('#TestEMTTrackListDispatchCreate', '1')
			});
		
		});
	
	});

	describe('EMTTrackListItem', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackListItems: JSON.stringify([{
					EMTDocumentID: 'alfa',
					EMTDocumentName: 'bravo',
				}]),
			});
		});

		it('sets text', function () {
			browser.assert.text(EMTTrackListItem, 'bravo');
		});
		
	});

	describe('EMTTrackListItemSelected', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackListItems: JSON.stringify([{
					EMTDocumentID: 'alfa',
					EMTDocumentName: 'bravo',
				}, {
					EMTDocumentID: 'charlie',
					EMTDocumentName: 'delta',
				}]),
				EMTTrackListItemSelected: JSON.stringify({
					EMTDocumentID: 'charlie',
					EMTDocumentName: 'delta',
				}),
			});
		});

		it('sets class', function () {
			browser.assert.elements('.EMTTrackListItemSelected', 1);
			browser.assert.hasClass(`${ EMTTrackListItem }:nth-child(1)`, 'EMTTrackListItemSelected');
		});
		
	});

});
