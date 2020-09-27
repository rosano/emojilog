const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTTemplate_Misc', function  test_EMTTemplate_Misc () {

	const uItem = function () {
		return {
			EMTJournalName: 'alfa',
		};
	};

	describe('EMTTemplate', function  test_EMTTemplate () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTemplateItem: JSON.stringify(uItem()),
			});
		});
		
		it('classes OLSKViewportDetail', function () {
			browser.assert.hasClass(EMTTemplate, 'OLSKViewportDetail');
		});

	});

	describe('EMTTemplateToolbar', function  test_EMTTemplateToolbar () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTemplateItem: JSON.stringify(uItem()),
			});
		});
		
		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(EMTTemplateToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(EMTTemplateToolbar, 'OLSKToolbarJustify');
		});
	
	});

	describe('EMTTemplateToolbarDoneButton', function  test_EMTTemplateToolbarDoneButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(EMTTemplateToolbarDoneButton, 'OLSKLayoutButtonNoStyle');
		});
		
		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(EMTTemplateToolbarDoneButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMTTemplateDispatchDone', '0');
			});
			
			before(function () {
				return browser.pressButton(EMTTemplateToolbarDoneButton);
			});

			it('sends EMTTemplateDispatchDone', function () {
				browser.assert.text('#TestEMTTemplateDispatchDone', '1');
			});
		
		});
	
	});

	describe('EMTTemplateToolbarDiscardButton', function  test_EMTTemplateToolbarDiscardButton () {
		
		it('classes OLSKLayoutButtonNoStyle', function () {
			browser.assert.hasClass(EMTTemplateToolbarDiscardButton, 'OLSKLayoutElementTappable');
		});
		
		it('classes OLSKLayoutElementTappable', function () {
			browser.assert.hasClass(EMTTemplateToolbarDiscardButton, 'OLSKLayoutElementTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMTTemplateDispatchDiscard', '0');
				browser.assert.text('#TestEMTTemplateDispatchDiscardData', 'undefined');
			});
			
			before(function () {
				return browser.pressButton(EMTTemplateToolbarDiscardButton);
			});

			it('sends EMTTemplateDispatchDiscard', function () {
				browser.assert.text('#TestEMTTemplateDispatchDiscard', '1');
				browser.assert.text('#TestEMTTemplateDispatchDiscardData', JSON.stringify(uItem()));
			});
		
		});
	
	});
	
	describe('EMTTemplateFormNameField', function test_EMTTemplateFormNameField () {
		
		it('sets autofocus', function () {
			browser.assert.attribute(EMTTemplateFormNameField, 'autofocus', '');
		});
		
		it('binds EMTJournalName', function () {
			browser.assert.input(EMTTemplateFormNameField, uItem().EMTJournalName);
		});

		context('input', function () {

			before(function () {
				browser.fill(EMTTemplateFormNameField, 'alfa');
			});

			it('sends EMTTemplateDispatchUpdate', function () {
				browser.assert.text('#TestEMTTemplateDispatchUpdate', '1');
			});
		
		});

	});

});
