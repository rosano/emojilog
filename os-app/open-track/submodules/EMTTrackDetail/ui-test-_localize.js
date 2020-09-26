const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`EMTTrackDetail_Localize-${ languageCode }`, function () {

		context('EMTTrackDetailItem', function() {
		
			before(function() {
				return browser.OLSKVisit(kDefaultRoute, {
					EMTTrackDetailItem: JSON.stringify({
						EMTJournalName: 'alfa',
					}),
				});
			});

			it('localizes EMTTrackDetailToolbarBackButton', function () {
				browser.assert.text(EMTTrackDetailToolbarBackButton, uLocalized('EMTTrackDetailToolbarBackButtonText'));
			});

			it('localizes EMTTrackDetailToolbarDiscardButton', function () {
				browser.assert.text(EMTTrackDetailToolbarDiscardButton, uLocalized('EMTTrackDetailToolbarDiscardButtonText'));
			});
		
			it('localizes EMTTrackDetailFormNameField', function () {
				browser.assert.attribute(EMTTrackDetailFormNameField, 'placeholder', uLocalized('EMTTrackDetailFormNameFieldPlaceholderText'));
			});

			context('on discard', function () {
			
				it('localizes EMTTrackDetailDiscardConfirm', function() {
					browser.assert.OLSKConfirmQuestion(function () {
						return browser.pressButton(EMTTrackDetailToolbarDiscardButton);
					}, uLocalized('EMTTrackDetailDiscardConfirmText'));
				});
		
			});
		
		});

	});

});
