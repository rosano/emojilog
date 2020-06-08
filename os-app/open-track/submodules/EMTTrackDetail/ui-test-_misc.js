import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTTrackDetail_Misc', function  test_EMTTrackDetail_Misc () {

	const uItem = function () {
		return {
			EMTDocumentName: 'alfa',
		};
	};

	describe('EMTTrackDetail', function  test_EMTTrackDetail () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackDetailItem: JSON.stringify(uItem()),
			});
		});
		
		it('classes OLSKViewportDetail', function () {
			browser.assert.hasClass(EMTTrackDetail, 'OLSKViewportDetail');
		});

		context('OLSKMobileViewInactive', function () {

			before(function () {
				browser.assert.hasNoClass(EMTTrackDetail, 'OLSKMobileViewInactive');
			});
			
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKMobileViewInactive: true,
				});
			});

			it('classes OLSKMobileViewInactive', function () {
				browser.assert.hasClass(EMTTrackDetail, 'OLSKMobileViewInactive');
			});
		
		});

	});

	describe('EMTTrackDetailToolbar', function  test_EMTTrackDetailToolbar () {

		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(EMTTrackDetailToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(EMTTrackDetailToolbar, 'OLSKToolbarJustify');
		});
	
	});

	describe('EMTTrackDetailToolbarBackButton', function  test_EMTTrackDetailToolbarBackButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(EMTTrackDetailToolbarBackButton, 'OLSKLayoutButtonNoStyle');
		});
		
		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(EMTTrackDetailToolbarBackButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMTTrackDetailDispatchBack', '0');
			});
			
			before(function () {
				return browser.pressButton(EMTTrackDetailToolbarBackButton);
			});

			it('sends EMTTrackDetailDispatchBack', function () {
				browser.assert.text('#TestEMTTrackDetailDispatchBack', '1');
			});
		
		});
	
	});

	describe('EMTTrackDetailToolbarDiscardButton', function  test_EMTTrackDetailToolbarDiscardButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(EMTTrackDetailToolbarDiscardButton, 'OLSKLayoutElementTappable');
		});
		
		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(EMTTrackDetailToolbarDiscardButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMTTrackDetailDispatchDiscard', '0');
				browser.assert.text('#TestEMTTrackDetailDispatchDiscardData', 'undefined');
			});
			
			before(function () {
				return browser.pressButton(EMTTrackDetailToolbarDiscardButton);
			});

			it('sends EMTTrackDetailDispatchDiscard', function () {
				browser.assert.text('#TestEMTTrackDetailDispatchDiscard', '1');
			});

			it('sends EMTTrackDetailDispatchDiscardData', function () {
				browser.assert.text('#TestEMTTrackDetailDispatchDiscardData', JSON.stringify(uItem()));
			});
		
		});
	
	});
	
	describe('EMTTrackDetailFormNameField', function test_EMTTrackDetailFormNameField () {
		
		it('sets autofocus', function () {
			browser.assert.attribute(EMTTrackDetailFormNameField, 'autofocus', '');
		});
		
		it('binds EMTDocumentName', function () {
			browser.assert.input(EMTTrackDetailFormNameField, uItem().EMTDocumentName);
		});

		context('input', function () {

			before(function () {
				browser.fill(EMTTrackDetailFormNameField, 'alfa');
			});

			it('sends EMTTrackDetailDispatchUpdate', function () {
				browser.assert.text('#TestEMTTrackDetailDispatchUpdate', '1');
			});
		
		});

	});

});
