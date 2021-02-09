const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`EMLTrackMaster_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});
	
		it('localizes EMLTrackMasterCreateButton', function () {
			browser.assert.text(EMLTrackMasterCreateButton, uLocalized('EMLTrackMasterCreateButtonText'));
		});

		it('localizes EMLTrackMasterLauncherItemImportData', function () {
			return browser.assert.OLSKLauncherItemText('EMLTrackMasterLauncherItemImportData', uLocalized('EMLTrackMasterLauncherItemImportDataText'));
		});

	});

});
