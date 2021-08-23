const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('EMLBrowseInfo_Localize-' + OLSKRoutingLanguage, function () {

		context('EMLBrowseInfoItem', function () {

			before(function () {
				return browser.OLSKVisit(kDefaultRoute, {
					OLSKRoutingLanguage,
					EMLBrowseInfoItem: JSON.stringify(StubMemoObjectValid({
						EMLMemoCustomData: {},
					})),
					EMLBrowseInfoFields: JSON.stringify([StubFieldObjectValid({
						EMLFieldName: '',
					})]),
				});
			});

			it('localizes EMLBrowseInfoToolbarBackButton', function () {
				browser.assert.attribute(EMLBrowseInfoToolbarBackButton, 'title', uLocalized('EMLBrowseInfoToolbarBackButtonText'));
			});

			it('localizes EMLBrowseInfoToolbarDiscardButton', function () {
				browser.assert.attribute(EMLBrowseInfoToolbarDiscardButton, 'title', uLocalized('EMLBrowseInfoToolbarDiscardButtonText'));
			});

			it('localizes EMLBrowseInfoFormCustomField', function () {
				browser.assert.attribute(EMLBrowseInfoFormCustomField, 'placeholder', uLocalized('EMLParamUntitledText'));
			});

			it('localizes EMLBrowseInfoFormNotesField', function () {
				browser.assert.attribute(EMLBrowseInfoFormNotesField, 'placeholder', uLocalized('EMLBrowseInfoFormNotesFieldText'));
			});

			it('localizes EMLBrowseInfoFormDateButton', function () {
				browser.assert.text(EMLBrowseInfoFormDateButton, uLocalized('EMLBrowseInfoFormDateButtonText'));
			});

			it('localizes EMLBrowseInfoLauncherItemDebug', function () {
				return browser.assert.OLSKLauncherItemText('EMLBrowseInfoLauncherItemDebug', uLocalized('EMLBrowseInfoLauncherItemDebugText'));
			});

			context('EMLBrowseInfoToolbarDiscardButton', function () {
				
				it('localizes EMLBrowseInfoDiscardConfirm', function () {
					browser.assert.OLSKConfirmQuestion(function () {
						return browser.pressButton(EMLBrowseInfoToolbarDiscardButton);
					}, uLocalized('OLSKWordingConfirmText'));
				});
			
			});

			context('EMLBrowseInfoFormDateButton', function test_EMLBrowseInfoFormDateButton () {

				before(function () {
					return browser.pressButton(EMLBrowseInfoFormDateButton);
				});

				it('localizes EMLBrowseInfoFormDateSaveButton', function () {
					browser.assert.text(EMLBrowseInfoFormDateSaveButton, uLocalized('EMLBrowseInfoFormDateSaveButtonText'));
				});
			
			});

		});

	});

});
