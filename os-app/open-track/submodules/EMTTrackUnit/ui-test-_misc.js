import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTTrackUnit_Misc', function () {

	const uItem = function () {
		return {
			EMTDocumentName: 'alfa',
		};
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTTrackUnitItem: JSON.stringify(uItem()),
		});
	});

	describe('EMTTrackUnit', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(EMTTrackUnit, 'OLSKViewportDetail')
		});
	
	});

	describe('OLSKToolbar', function () {
		
		it('sets class', function () {
			browser.assert.hasClass('.OLSKToolbar', 'OLSKToolbarJustify')
		});
	
	});

	describe('EMTTrackUnitToolbarBackButton', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(EMTTrackUnitToolbarBackButton, 'OLSKLayoutButtonNoStyle')
			browser.assert.hasClass(EMTTrackUnitToolbarBackButton, 'OLSKLayoutElementTappable')
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMTTrackUnitDispatchBack', '0')
			});
			
			before(function () {
				return browser.pressButton(EMTTrackUnitToolbarBackButton);
			});

			it('sends EMTTrackUnitDispatchBack', function () {
				browser.assert.text('#TestEMTTrackUnitDispatchBack', '1')
			});
		
		});
	
	});

	describe('EMTTrackUnitToolbarDiscardButton', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(EMTTrackUnitToolbarDiscardButton, 'OLSKLayoutButtonNoStyle')
			browser.assert.hasClass(EMTTrackUnitToolbarDiscardButton, 'OLSKLayoutElementTappable')
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMTTrackUnitDispatchDiscard', '0')
			});
			
			before(function () {
				return browser.pressButton(EMTTrackUnitToolbarDiscardButton);
			});

			it('sends EMTTrackUnitDispatchDiscard', function () {
				browser.assert.text('#TestEMTTrackUnitDispatchDiscard', '1')
			});
		
		});
	
	});
	
	describe('EMTTrackUnitFormNameField', function() {
		
		it('sets autofocus', function () {
			browser.assert.attribute(EMTTrackUnitFormNameField, 'autofocus', '')
		});
		
		it('binds EMTDocumentName', function () {
			browser.assert.input(EMTTrackUnitFormNameField, uItem().EMTDocumentName);
		});

	});

});
