const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLTemplate_Misc', function  test_EMLTemplate_Misc () {

	const uItem = function () {
		return {
			EMLJournalName: 'alfa',
		};
	};

	describe('EMLTemplate', function  test_EMLTemplate () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLTemplateItem: JSON.stringify(uItem()),
			});
		});
		
		it('classes OLSKViewportDetail', function () {
			browser.assert.hasClass(EMLTemplate, 'OLSKViewportDetail');
		});

	});

	describe('EMLTemplateToolbar', function  test_EMLTemplateToolbar () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLTemplateItem: JSON.stringify(uItem()),
			});
		});
		
		it('classes OLSKToolbar', function () {
			browser.assert.hasClass(EMLTemplateToolbar, 'OLSKToolbar');
		});

		it('classes OLSKToolbarJustify', function () {
			browser.assert.hasClass(EMLTemplateToolbar, 'OLSKToolbarJustify');
		});

		it('classes OLSKCommonEdgeBottom', function () {
			browser.assert.hasClass(EMLTemplateToolbar, 'OLSKCommonEdgeBottom');
		});
	
	});

	describe('EMLTemplateToolbarDoneButton', function  test_EMLTemplateToolbarDoneButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLTemplateToolbarDoneButton, 'OLSKDecorButtonNoStyle');
		});
		
		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLTemplateToolbarDoneButton, 'OLSKDecorTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMLTemplateDispatchDone', '0');
			});
			
			before(function () {
				return browser.pressButton(EMLTemplateToolbarDoneButton);
			});

			it('sends EMLTemplateDispatchDone', function () {
				browser.assert.text('#TestEMLTemplateDispatchDone', '1');
			});
		
		});
	
	});

	describe('EMLTemplateToolbarDiscardButton', function  test_EMLTemplateToolbarDiscardButton () {
		
		it('classes OLSKDecorButtonNoStyle', function () {
			browser.assert.hasClass(EMLTemplateToolbarDiscardButton, 'OLSKDecorTappable');
		});
		
		it('classes OLSKDecorTappable', function () {
			browser.assert.hasClass(EMLTemplateToolbarDiscardButton, 'OLSKDecorTappable');
		});

		context('click', function () {
			
			before(function () {
				browser.assert.text('#TestEMLTemplateDispatchDiscard', '0');
				browser.assert.text('#TestEMLTemplateDispatchDiscardData', 'undefined');
			});
			
			before(function () {
				return browser.pressButton(EMLTemplateToolbarDiscardButton);
			});

			it('sends EMLTemplateDispatchDiscard', function () {
				browser.assert.text('#TestEMLTemplateDispatchDiscard', '1');
				browser.assert.text('#TestEMLTemplateDispatchDiscardData', JSON.stringify(uItem()));
			});
		
		});
	
	});
	
	describe('EMLTemplateFormNameField', function test_EMLTemplateFormNameField () {
		
		it('sets autofocus', function () {
			browser.assert.attribute(EMLTemplateFormNameField, 'autofocus', '');
		});
		
		it('binds EMLJournalName', function () {
			browser.assert.input(EMLTemplateFormNameField, uItem().EMLJournalName);
		});

		context('input', function () {

			before(function () {
				browser.fill(EMLTemplateFormNameField, 'alfa');
			});

			it('sends EMLTemplateDispatchUpdate', function () {
				browser.assert.text('#TestEMLTemplateDispatchUpdate', '1');
			});
		
		});

	});

});
