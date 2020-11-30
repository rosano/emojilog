const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`EMTTrackMaster_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});
	
		it('localizes EMTTrackMasterCreateButton', function () {
			browser.assert.text(EMTTrackMasterCreateButton, uLocalized('EMTTrackMasterCreateButtonText'));
		});

		it('localizes EMTTrackMasterLauncherItemImportData', function () {
			return browser.assert.OLSKLauncherItemText('EMTTrackMasterLauncherItemImportData', uLocalized('EMTTrackMasterLauncherItemImportDataText'));
		});

	});

});
