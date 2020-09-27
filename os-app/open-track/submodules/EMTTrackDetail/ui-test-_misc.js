const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTTrackForm_Misc', function  test_EMTTrackForm_Misc () {

	const uItem = function () {
		return {
			EMTJournalName: 'alfa',
		};
	};

	describe('EMTTrackForm', function  test_EMTTrackForm () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackFormItem: JSON.stringify(uItem()),
			});
		});
		
		it('classes OLSKViewportDetail', function () {
			browser.assert.hasClass(EMTTrackForm, 'OLSKViewportDetail');
		});

	});

	describe('EMTTrackFormToolbar', function  test_EMTTrackFormToolbar () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackFormItem: JSON.stringify(uItem()),
			});
		});
		
		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(EMTTrackFormToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(EMTTrackFormToolbar, 'OLSKToolbarJustify');
		});
	
	});

	describe('EMTTrackFormToolbarBackButton', function  test_EMTTrackFormToolbarBackButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(EMTTrackFormToolbarBackButton, 'OLSKLayoutButtonNoStyle');
		});
		
		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(EMTTrackFormToolbarBackButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMTTrackFormDispatchBack', '0');
			});
			
			before(function () {
				return browser.pressButton(EMTTrackFormToolbarBackButton);
			});

			it('sends EMTTrackFormDispatchBack', function () {
				browser.assert.text('#TestEMTTrackFormDispatchBack', '1');
			});
		
		});
	
	});

	describe('EMTTrackFormToolbarDiscardButton', function  test_EMTTrackFormToolbarDiscardButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(EMTTrackFormToolbarDiscardButton, 'OLSKLayoutElementTappable');
		});
		
		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(EMTTrackFormToolbarDiscardButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMTTrackFormDispatchDiscard', '0');
				browser.assert.text('#TestEMTTrackFormDispatchDiscardData', 'undefined');
			});
			
			before(function () {
				return browser.pressButton(EMTTrackFormToolbarDiscardButton);
			});

			it('sends EMTTrackFormDispatchDiscard', function () {
				browser.assert.text('#TestEMTTrackFormDispatchDiscard', '1');
				browser.assert.text('#TestEMTTrackFormDispatchDiscardData', JSON.stringify(uItem()));
			});
		
		});
	
	});
	
	describe('EMTTrackFormBodyNameField', function test_EMTTrackFormBodyNameField () {
		
		it('sets autofocus', function () {
			browser.assert.attribute(EMTTrackFormBodyNameField, 'autofocus', '');
		});
		
		it('binds EMTJournalName', function () {
			browser.assert.input(EMTTrackFormBodyNameField, uItem().EMTJournalName);
		});

		context('input', function () {

			before(function () {
				browser.fill(EMTTrackFormBodyNameField, 'alfa');
			});

			it('sends EMTTrackFormDispatchUpdate', function () {
				browser.assert.text('#TestEMTTrackFormDispatchUpdate', '1');
			});
		
		});

	});

});
