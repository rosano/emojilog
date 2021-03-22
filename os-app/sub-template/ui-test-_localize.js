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
			});
		});

		it('localizes EMLTemplateDiscardButton', function () {
			browser.assert.text(EMLTemplateDiscardButton, uLocalized('EMLTemplateDiscardButtonText'));
		});
		
		it('localizes EMLTemplateNameField', function () {
			browser.assert.attribute(EMLTemplateNameField, 'placeholder', uLocalized('EMLTemplateNameFieldPlaceholderText'));
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
