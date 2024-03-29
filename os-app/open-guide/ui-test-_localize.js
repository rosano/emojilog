const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute._OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('EMLGuide_Localize-' + OLSKRoutingLanguage, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('EMLGuideTitle'));
		});

		it('localizes meta[description]', function() {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('EMLGuideDescription'));
		});

		it('localizes EMLGuideCrownName', function () {
			browser.assert.text(EMLGuideCrownName, uLocalized('EMLGuideTitle'));
		});

	});

});
