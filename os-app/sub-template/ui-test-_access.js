const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLTemplate: '.EMLTemplate',

	EMLTemplateNameField: '.EMLTemplateNameField',
	
	EMLTemplateCreateParamButton: '.EMLTemplateCreateParamButton',
	
	EMLTemplateEditParamButton: '.EMLTemplateEditParamButton',
	
	EMLTemplateDiscardButton: '.EMLTemplateDiscardButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMLTemplate_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLTemplateItem: JSON.stringify({
				EMLJournalName: 'alfa',
			}),
		});
	});

	it('shows EMLTemplate', function () {
		browser.assert.elements(EMLTemplate, 1);
	});

	it('shows EMLTemplateNameField', function () {
		browser.assert.elements(EMLTemplateNameField, 1);
	});

	it('shows OLSKEmojiPicker', function () {
		browser.assert.elements('.OLSKEmojiPicker', 1);
	});

	it('shows EMLTemplateCreateParamButton', function () {
		browser.assert.elements(EMLTemplateCreateParamButton, 1);
	});

	it('hides EMLTemplateEditParamButton', function () {
		browser.assert.elements(EMLTemplateEditParamButton, 0);
	});

	it('hides EMLTemplateParamForm', function () {
		browser.assert.elements('.EMLTemplateParamForm', 0);
	});

	it('shows EMLTemplateDiscardButton', function () {
		browser.assert.elements(EMLTemplateDiscardButton, 1);
	});

	context('EMLTemplateCreateParamButton', function () {
		
		before(function () {
			return browser.pressButton(EMLTemplateCreateParamButton);
		});

		it('shows EMLTemplateEditParamButton', function () {
			browser.assert.elements(EMLTemplateEditParamButton, 1);
		});
	
	});

	context('EMLTemplateEditParamButton', function () {
		
		before(function () {
			return browser.pressButton(EMLTemplateEditParamButton);
		});

		it('shows EMLTemplateParamForm', function () {
			browser.assert.elements('.EMLTemplateParamForm', 1);
		});

		context('EMLTemplateParamFormDispatchDone', function () {
			
			before(function () {
				return browser.pressButton('.EMLTemplateParamFormDoneButton');
			});

			it('hides EMLTemplateParamForm', function () {
				browser.assert.elements('.EMLTemplateParamForm', 0);
			});
		
		});
	
	});

});
