const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`EMLFeatureList_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		uLocalized('EMLFeatureListArray').forEach(function ([name, blurb], i) {

			it('localizes EMLVitrineStandardFeaturesItem', function () {
				browser.assert.text(`.OLSKFeatureListItem:nth-child(${ i + 1 }) .OLSKFeatureListItemName`, name);
			});

			it('localizes EMLVitrineStandardFeaturesBlurb', function () {
				browser.assert.text(`.OLSKFeatureListItem:nth-child(${ i + 1 }) .OLSKFeatureListItemBlurb`, blurb);
			});
			
		});

	});

});
