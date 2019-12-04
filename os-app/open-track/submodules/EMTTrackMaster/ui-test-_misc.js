import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTTrackMaster_Misc', function () {

	describe('EMTTrackMaster', function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
		
		it('sets class', function () {
			browser.assert.hasClass(EMTTrackMaster, 'OLSKViewportMaster')
		});

		context('OLSKMobileViewInactive', function () {

			before(function () {
				browser.assert.hasNoClass(EMTTrackMaster, 'OLSKMobileViewInactive');
			});
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKMobileViewInactive: true,
				});
			});

			it('sets class', function () {
				browser.assert.hasClass(EMTTrackMaster, 'OLSKMobileViewInactive');
			});
		
		});
	
	});

	describe('EMTTrackMasterToolbar', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(EMTTrackMasterToolbar, 'OLSKMobileViewHeader')
		});
	
	});

	describe('EMTTrackMasterCreateButton', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(EMTTrackMasterCreateButton, 'OLSKLayoutButtonNoStyle')
			browser.assert.hasClass(EMTTrackMasterCreateButton, 'OLSKLayoutElementTappable')
		});
		
		it('sets accesskey', function () {
			browser.assert.attribute(EMTTrackMasterCreateButton, 'accesskey', 'n')
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMTTrackMasterDispatchCreate', '0')
			});
			
			before(function () {
				return browser.pressButton(EMTTrackMasterCreateButton);
			});

			it('sends EMTTrackMasterDispatchCreate', function () {
				browser.assert.text('#TestEMTTrackMasterDispatchCreate', '1')
			});
		
		});
	
	});

	describe('EMTTrackMasterBody', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(EMTTrackMasterBody, 'OLSKMobileViewBody')
		});
	
	});

	describe('EMTTrackMasterListItem', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackMasterListItems: JSON.stringify([{
					EMTDocumentID: 'alfa',
					EMTDocumentName: 'bravo',
				}]),
			});
		});

		it('sets text', function () {
			browser.assert.text(EMTTrackMasterListItem, 'bravo');
		});


		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMTTrackMasterDispatchSelect', '0')
				browser.assert.text('#TestEMTTrackMasterDispatchSelectData', 'undefined')
			});
			
			before(function () {
				return browser.click(EMTTrackMasterListItem);
			});

			it('sends EMTTrackMasterDispatchSelect', function () {
				browser.assert.text('#TestEMTTrackMasterDispatchSelect', '1')
				browser.assert.text('#TestEMTTrackMasterDispatchSelectData', JSON.stringify({
					EMTDocumentID: 'alfa',
					EMTDocumentName: 'bravo',
				}));
			});
		
		});
		
	});

	describe('EMTTrackMasterListItemSelected', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackMasterListItems: JSON.stringify([{
					EMTDocumentID: 'alfa',
					EMTDocumentName: 'bravo',
				}, {
					EMTDocumentID: 'charlie',
					EMTDocumentName: 'delta',
				}]),
				EMTTrackMasterListItemSelected: JSON.stringify({
					EMTDocumentID: 'charlie',
					EMTDocumentName: 'delta',
				}),
			});
		});

		it('sets class', function () {
			browser.assert.elements('.EMTTrackMasterListItemSelected', 1);
			browser.assert.hasClass(`${ EMTTrackMasterListItem }:nth-child(2)`, 'EMTTrackMasterListItemSelected');
		});
		
	});

});
