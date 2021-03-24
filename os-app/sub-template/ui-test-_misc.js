const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLTemplate_Misc', function  test_EMLTemplate_Misc () {

	const EMLJournalName = Math.random().toString();
	const item = Math.random().toString();

	describe('EMLTemplate', function  test_EMLTemplate () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLTemplateItem: JSON.stringify({
					EMLJournalName,
				}),
			});
		});
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(EMLTemplate, 'OLSKDecor');
		});

		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(EMLTemplate, 'OLSKDecorBigForm');
		});

	});
	
	describe('EMLTemplateNameField', function test_EMLTemplateNameField () {

		it('sets autofocus', function () {
			browser.assert.attribute(EMLTemplateNameField, 'autofocus', '');
		});
		
		it('binds EMLJournalName', function () {
			browser.assert.input(EMLTemplateNameField, EMLJournalName);
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestEMLTemplateDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(EMLTemplateNameField, item);
			});

			it('sends EMLTemplateDispatchUpdate', function () {
				browser.assert.text('#TestEMLTemplateDispatchUpdate', '1');
			});
		
		});

	});
	
	describe('OLSKEmojiPicker', function test_OLSKEmojiPicker () {

		const item = Math.random().toString();
		
		context('input single', function () {

			before(function () {
				// browser.pressButton(item);
			});
			
			it.skip('sets OLSKEmojiPickerDispatchSelect', function () {
				browser.assert.input(EMLTemplateNameField, item);
			});

			it.skip('sends EMLTemplateDispatchUpdate', function () {
				browser.assert.text('#TestEMLTemplateDispatchUpdate', '2');
			});

		});
		
		context('input multiple', function () {

			before(function () {
				// browser.pressButton(item);
			});
			
			it.skip('sets OLSKEmojiPickerDispatchSelect', function () {
				browser.assert.input(EMLTemplateNameField, item + ' ' + item);
			});

			it.skip('sends EMLTemplateDispatchUpdate', function () {
				browser.assert.text('#TestEMLTemplateDispatchUpdate', '3');
			});

		});

	});
	
	describe('EMLTemplateCreateParamButton', function test_EMLTemplateCreateParamButton () {

		context('click', function () {

			before(function () {
				browser.pressButton(EMLTemplateCreateParamButton);
			});

			it('sends EMLTemplateDispatchUpdate', function () {
				browser.assert.text('#TestEMLTemplateDispatchUpdate', '2');
			});
		
		});

	});

	describe('EMLTemplateParamForm', function test_EMLTemplateParamForm () {

		const item = Math.random().toString();
		
		before(function () {
			return browser.pressButton(EMLTemplateEditParamButton);
		});

		before(function () {
			browser.assert.text('#TestEMLTemplateDispatchUpdate', '2');
		});

		before(function () {
			browser.fill('.EMLTemplateParamFormNameField', item);
		});

		it('sends EMLTemplateDispatchUpdate', function () {
			browser.assert.text('#TestEMLTemplateDispatchUpdate', '3');
		});

		context('save', function () {
			
			before(function () {
				return browser.pressButton('.EMLTemplateParamFormDoneButton');
			});

			it('localizes EMLTemplateEditParamButton', function () {
				browser.assert.text(EMLTemplateEditParamButton, item);
			});

		});

	});

	describe('EMLTemplateDiscardButton', function  test_EMLTemplateDiscardButton () {
		
		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(EMLTemplateDiscardButton, 'OLSKDecorPress');
		});

		it('classes OLSKDecorPressDestroy', function () {
			browser.assert.hasClass(EMLTemplateDiscardButton, 'OLSKDecorPressDestroy');
		});

		context('cancel', function () {
			
			before(function () {
				browser.assert.text('#TestEMLTemplateDispatchDiscard', '0');
				browser.assert.text('#TestEMLTemplateDispatchDiscardData', 'undefined');
			});
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton(EMLTemplateDiscardButton);
				}, function (dialog) {
					dialog.response = false;

					return dialog;
				});
			});

			it('does nothing', function () {
				browser.assert.text('#TestEMLTemplateDispatchDiscard', '0');
			});
		
		});

		context('confirm', function () {
			
			before(async function () {
				return browser.OLSKConfirm(function () {
					return browser.pressButton(EMLTemplateDiscardButton);
				});
			});

			it('sends EMLTemplateDispatchDiscard', function () {
				browser.assert.text('#TestEMLTemplateDispatchDiscard', '1');
				browser.assert.text('#TestEMLTemplateDispatchDiscardData', item);
			});
		
		});
	
	});

});
