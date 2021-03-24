const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`EMLTemplate_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMLTemplateItem: JSON.stringify({
					EMLJournalName: 'alfa',
				}),
				OLSKRoutingLanguage
			});
		});
		
		it('localizes EMLTemplateNameField', function () {
			browser.assert.attribute(EMLTemplateNameField, 'placeholder', uLocalized('EMLTemplateNameFieldPlaceholderText'));
		});

		it('localizes EMLTemplateCreateParamButton', function () {
			browser.assert.text(EMLTemplateCreateParamButton, uLocalized('EMLTemplateCreateParamButtonText'));
		});

		it('localizes EMLTemplateDiscardButton', function () {
			browser.assert.text(EMLTemplateDiscardButton, uLocalized('EMLTemplateDiscardButtonText'));
		});

		context('add param', function () {
			
			before(function () {
				return browser.pressButton(EMLTemplateCreateParamButton);
			});

			it('localizes EMLTemplateEditParamButton', function () {
				browser.assert.text(EMLTemplateEditParamButton, uLocalized('EMLParamUntitledText'));
			});
		
		});

		context('on discard', function () {
		
			it('localizes EMLTemplateDiscardConfirm', function() {
				browser.assert.OLSKConfirmQuestion(function () {
					return browser.pressButton(EMLTemplateDiscardButton);
				}, uLocalized('EMLTemplateDiscardConfirmText'));
			});
		
		});

	});

});
