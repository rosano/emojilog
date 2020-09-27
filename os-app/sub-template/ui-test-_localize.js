const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`EMTTemplate_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTemplateItem: JSON.stringify({
					EMTJournalName: 'alfa',
				}),
			});
		});

		it('localizes EMTTemplateToolbarDoneButton', function () {
			browser.assert.text(EMTTemplateToolbarDoneButton, uLocalized('EMTTemplateToolbarDoneButtonText'));
		});

		it('localizes EMTTemplateToolbarDiscardButton', function () {
			browser.assert.text(EMTTemplateToolbarDiscardButton, uLocalized('EMTTemplateToolbarDiscardButtonText'));
		});
		
		it('localizes EMTTemplateFormNameField', function () {
			browser.assert.attribute(EMTTemplateFormNameField, 'placeholder', uLocalized('EMTTemplateFormNameFieldPlaceholderText'));
		});

		context('on discard', function () {
		
			it('localizes EMTTemplateDiscardConfirm', function() {
				browser.assert.OLSKConfirmQuestion(function () {
					return browser.pressButton(EMTTemplateToolbarDiscardButton);
				}, uLocalized('EMTTemplateDiscardConfirmText'));
			});
		
		});

	});

});
