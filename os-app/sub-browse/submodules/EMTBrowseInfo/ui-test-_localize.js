const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`EMTBrowseInfo_Localize-${ languageCode }`, function () {

		context('EMTBrowseInfoItem', function () {

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage: languageCode,
					EMTBrowseInfoItem: JSON.stringify({}),
				});
			});

			it('localizes EMTBrowseInfoToolbarBackButton', function () {
				browser.assert.attribute(EMTBrowseInfoToolbarBackButton, 'title', uLocalized('EMTBrowseInfoToolbarBackButtonText'));
			});

			it('localizes EMTBrowseInfoToolbarDiscardButton', function () {
				browser.assert.attribute(EMTBrowseInfoToolbarDiscardButton, 'title', uLocalized('EMTBrowseInfoToolbarDiscardButtonText'));
			});

			it('localizes EMTBrowseInfoFormNotesField', function () {
				browser.assert.attribute(EMTBrowseInfoFormNotesField, 'placeholder', uLocalized('EMTBrowseInfoFormNotesFieldText'));
			});

			it('localizes EMTBrowseInfoLauncherItemDebug', function () {
				return browser.assert.OLSKLauncherItemText('EMTBrowseInfoLauncherItemDebug', uLocalized('EMTBrowseInfoLauncherItemDebugText'));
			});

			context('EMTBrowseInfoToolbarDiscardButton', function () {
				
				it('localizes EMTBrowseInfoDiscardConfirm', function () {
					browser.assert.OLSKConfirmQuestion(function () {
						return browser.pressButton(EMTBrowseInfoToolbarDiscardButton);
					}, uLocalized('EMTBrowseInfoDiscardConfirmText'));
				});
			
			});

		});

	});

});
