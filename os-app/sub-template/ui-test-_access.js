const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLTemplate: '.EMLTemplate',

	EMLTemplateToolbar: '.EMLTemplateToolbar',
	EMLTemplateToolbarDoneButton: '.EMLTemplateToolbarDoneButton',
	EMLTemplateToolbarDiscardButton: '.EMLTemplateToolbarDiscardButton',
	
	EMLTemplateForm: '.EMLTemplateForm',
	EMLTemplateFormNameField: '.EMLTemplateFormNameField',
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

	it('shows EMLTemplateToolbar', function () {
		browser.assert.elements(EMLTemplateToolbar, 1);
	});

	it('shows EMLTemplateToolbarDoneButton', function () {
		browser.assert.elements(EMLTemplateToolbarDoneButton, 1);
	});

	it('shows EMLTemplateToolbarDiscardButton', function () {
		browser.assert.elements(EMLTemplateToolbarDiscardButton, 1);
	});

	it('shows EMLTemplateForm', function () {
		browser.assert.elements(EMLTemplateForm, 1);
	});

	it('shows EMLTemplateFormNameField', function () {
		browser.assert.elements(EMLTemplateFormNameField, 1);
	});

});
