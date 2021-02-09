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

		it('localizes EMLTemplateToolbarDoneButton', function () {
			browser.assert.text(EMLTemplateToolbarDoneButton, uLocalized('EMLTemplateToolbarDoneButtonText'));
		});

		it('localizes EMLTemplateToolbarDiscardButton', function () {
			browser.assert.text(EMLTemplateToolbarDiscardButton, uLocalized('EMLTemplateToolbarDiscardButtonText'));
		});
		
		it('localizes EMLTemplateFormNameField', function () {
			browser.assert.attribute(EMLTemplateFormNameField, 'placeholder', uLocalized('EMLTemplateFormNameFieldPlaceholderText'));
		});

		context('on discard', function () {
		
			it('localizes EMLTemplateDiscardConfirm', function() {
				browser.assert.OLSKConfirmQuestion(function () {
					return browser.pressButton(EMLTemplateToolbarDiscardButton);
				}, uLocalized('EMLTemplateDiscardConfirmText'));
			});
		
		});

	});

});
