const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`EMTTrackMaster_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
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
