const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`EMTTrackForm_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackFormItem: JSON.stringify({
					EMTJournalName: 'alfa',
				}),
			});
		});

		it('localizes EMTTrackFormToolbarBackButton', function () {
			browser.assert.text(EMTTrackFormToolbarBackButton, uLocalized('EMTTrackFormToolbarBackButtonText'));
		});

		it('localizes EMTTrackFormToolbarDiscardButton', function () {
			browser.assert.text(EMTTrackFormToolbarDiscardButton, uLocalized('EMTTrackFormToolbarDiscardButtonText'));
		});
		
		it('localizes EMTTrackFormBodyNameField', function () {
			browser.assert.attribute(EMTTrackFormBodyNameField, 'placeholder', uLocalized('EMTTrackFormBodyNameFieldPlaceholderText'));
		});

		context('on discard', function () {
		
			it('localizes EMTTrackFormDiscardConfirm', function() {
				browser.assert.OLSKConfirmQuestion(function () {
					return browser.pressButton(EMTTrackFormToolbarDiscardButton);
				}, uLocalized('EMTTrackFormDiscardConfirmText'));
			});
		
		});

	});

});
