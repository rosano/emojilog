const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`EMLTemplateParamForm_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLTemplateParamFormItem: JSON.stringify({
					EMLJournalName: Math.random().toString(),
				}),
				OLSKRoutingLanguage,
			});
		});

		it('localizes EMLTemplateParamFormNameField', function () {
			browser.assert.attribute(EMLTemplateParamFormNameField, 'placeholder', uLocalized('EMLTemplateParamFormNameFieldText'));
		});

		it('localizes EMLTemplateParamFormDoneButton', function () {
			browser.assert.text(EMLTemplateParamFormDoneButton, uLocalized('EMLTemplateParamFormDoneButtonText'));
		});

	});

});
