const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMLTemplateParamForm: '.EMLTemplateParamForm',

	EMLTemplateParamFormNameField: '.EMLTemplateParamFormNameField',
	
	EMLTemplateParamFormDoneButton: '.EMLTemplateParamFormDoneButton',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMLTemplateParamForm_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLTemplateParamFormItem: JSON.stringify({
				EMLJournalName: 'alfa',
			}),
		});
	});

	it('shows EMLTemplateParamForm', function () {
		browser.assert.elements(EMLTemplateParamForm, 1);
	});

	it('shows EMLTemplateParamFormNameField', function () {
		browser.assert.elements(EMLTemplateParamFormNameField, 1);
	});

	it('shows EMLTemplateParamFormDoneButton', function () {
		browser.assert.elements(EMLTemplateParamFormDoneButton, 1);
	});

});
