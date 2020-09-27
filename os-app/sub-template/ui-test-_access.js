const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTTemplate: '.EMTTemplate',

	EMTTemplateToolbar: '.EMTTemplateToolbar',
	EMTTemplateToolbarBackButton: '.EMTTemplateToolbarBackButton',
	EMTTemplateToolbarDiscardButton: '.EMTTemplateToolbarDiscardButton',
	
	EMTTemplateForm: '.EMTTemplateForm',
	EMTTemplateFormNameField: '.EMTTemplateFormNameField',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTTemplate_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EMTTemplateItem: JSON.stringify({
				EMTJournalName: 'alfa',
			}),
		});
	});

	it('shows EMTTemplate', function () {
		browser.assert.elements(EMTTemplate, 1);
	});

	it('shows EMTTemplateToolbar', function () {
		browser.assert.elements(EMTTemplateToolbar, 1);
	});

	it('shows EMTTemplateToolbarBackButton', function () {
		browser.assert.elements(EMTTemplateToolbarBackButton, 1);
	});

	it('shows EMTTemplateToolbarDiscardButton', function () {
		browser.assert.elements(EMTTemplateToolbarDiscardButton, 1);
	});

	it('shows EMTTemplateForm', function () {
		browser.assert.elements(EMTTemplateForm, 1);
	});

	it('shows EMTTemplateFormNameField', function () {
		browser.assert.elements(EMTTemplateFormNameField, 1);
	});

});
