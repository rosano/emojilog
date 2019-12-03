import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTTrackDetail_Misc', function () {

	const uItem = function () {
		return {
			EMTDocumentName: 'alfa',
		};
	};

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTTrackDetailItem: JSON.stringify(uItem()),
		});
	});

	describe('EMTTrackDetail', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(EMTTrackDetail, 'OLSKViewportDetail')
		});
	
	});

	describe('OLSKToolbar', function () {
		
		it('sets class', function () {
			browser.assert.hasClass('.OLSKToolbar', 'OLSKToolbarJustify')
		});
	
	});

	describe('EMTTrackDetailToolbarBackButton', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(EMTTrackDetailToolbarBackButton, 'OLSKLayoutButtonNoStyle')
			browser.assert.hasClass(EMTTrackDetailToolbarBackButton, 'OLSKLayoutElementTappable')
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMTTrackDetailDispatchBack', '0')
			});
			
			before(function () {
				return browser.pressButton(EMTTrackDetailToolbarBackButton);
			});

			it('sends EMTTrackDetailDispatchBack', function () {
				browser.assert.text('#TestEMTTrackDetailDispatchBack', '1')
			});
		
		});
	
	});

	describe('EMTTrackDetailToolbarDiscardButton', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(EMTTrackDetailToolbarDiscardButton, 'OLSKLayoutButtonNoStyle')
			browser.assert.hasClass(EMTTrackDetailToolbarDiscardButton, 'OLSKLayoutElementTappable')
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMTTrackDetailDispatchDiscard', '0')
				browser.assert.text('#TestEMTTrackDetailDispatchDiscardData', 'undefined')
			});
			
			before(function () {
				return browser.pressButton(EMTTrackDetailToolbarDiscardButton);
			});

			it('sends EMTTrackDetailDispatchDiscard', function () {
				browser.assert.text('#TestEMTTrackDetailDispatchDiscard', '1')
			});

			it('sends EMTTrackDetailDispatchDiscardData', function () {
				browser.assert.text('#TestEMTTrackDetailDispatchDiscardData', JSON.stringify(uItem()))
			});
		
		});
	
	});
	
	describe('EMTTrackDetailFormNameField', function() {
		
		it('sets autofocus', function () {
			browser.assert.attribute(EMTTrackDetailFormNameField, 'autofocus', '')
		});
		
		it('binds EMTDocumentName', function () {
			browser.assert.input(EMTTrackDetailFormNameField, uItem().EMTDocumentName);
		});

		context('input', function () {

			before(function () {
				browser.fill(EMTTrackDetailFormNameField, 'alfa');
			});

			it('sends EMTTrackDetailDispatchUpdate', function () {
				browser.assert.text('#TestEMTTrackDetailDispatchUpdate', '1')
			});
		
		});

	});

});
