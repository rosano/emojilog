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
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(EMLTemplate, 'OLSKDecor');
		});

		it('classes OLSKDecorBigForm', function () {
			browser.assert.hasClass(EMLTemplate, 'OLSKDecorBigForm');
		});

	});
	
	describe('EMLTemplateNameField', function test_EMLTemplateNameField () {

		it('classes OLSKMobileSafariRemoveDefaultInputStyle', function () {
			browser.assert.hasClass(EMLTemplateNameField, 'OLSKMobileSafariRemoveDefaultInputStyle');
		});
		
		it('sets autofocus', function () {
			browser.assert.attribute(EMLTemplateNameField, 'autofocus', '');
		});
		
		it('binds EMLJournalName', function () {
			browser.assert.input(EMLTemplateNameField, uItem().EMLJournalName);
		});

		context('input', function () {

			before(function () {
				browser.fill(EMLTemplateNameField, 'alfa');
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
				browser.assert.text('#TestEMLTemplateDispatchDiscardData', JSON.stringify(uItem()));
			});
		
		});
	
	});

});
