const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`EMTBrowseList_Localize-${ languageCode }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});

		it('localizes EMTBrowseListToolbarCloseButton', function () {
			browser.assert.attribute(EMTBrowseListToolbarCloseButton, 'title', uLocalized('EMTBrowseListToolbarCloseButtonText'));
		});

		it('localizes EMTBrowseListToolbarCreateButton', function () {
			browser.assert.attribute(EMTBrowseListToolbarCreateButton, 'title', uLocalized('EMTBrowseListToolbarCreateButtonText'));
		});

	});

});
