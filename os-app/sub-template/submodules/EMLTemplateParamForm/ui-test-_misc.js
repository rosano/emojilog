const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLTemplateParamForm_Misc', function  test_EMLTemplateParamForm_Misc () {

	const EMLFieldName = Math.random().toString();
	const item = Math.random().toString();

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			EMLTemplateParamFormItem: JSON.stringify({
				EMLFieldName,
			}),
		});
	});
	
	describe('EMLTemplateParamFormNameField', function test_EMLTemplateParamFormNameField () {

		it('sets autofocus', function () {
			browser.assert.attribute(EMLTemplateParamFormNameField, 'autofocus', '');
		});
		
		it('binds EMLFieldName', function () {
			browser.assert.input(EMLTemplateParamFormNameField, EMLFieldName);
		});

		context('input', function () {

			before(function () {
				browser.assert.text('#TestEMLTemplateParamFormDispatchUpdate', '0');
			});

			before(function () {
				browser.fill(EMLTemplateParamFormNameField, item);
			});

			it('sends EMLTemplateParamFormDispatchUpdate', function () {
				browser.assert.text('#TestEMLTemplateParamFormDispatchUpdate', '1');
			});
		
		});

		context('submit', function () {

			before(function () {
				browser.assert.text('#TestEMLTemplateParamFormDispatchDone', '0');
			});

			before(function () {
				return browser.fire(EMLTemplateParamForm, 'submit');
			});

			it('sends EMLTemplateParamFormDispatchUpdate', function () {
				browser.assert.text('#TestEMLTemplateParamFormDispatchDone', '1');
			});
		
		});

	});
	
	describe('EMLTemplateParamFormDoneButton', function test_EMLTemplateParamFormDoneButton () {

		context('click', function () {

			before(function () {
				browser.assert.text('#TestEMLTemplateParamFormDispatchDone', '1');
			});

			before(function () {
				return browser.pressButton(EMLTemplateParamFormDoneButton);
			});

			it('sends EMLTemplateParamFormDispatchDone', function () {
				browser.assert.text('#TestEMLTemplateParamFormDispatchDone', '3');
			});
		
		});

	});
	
});
