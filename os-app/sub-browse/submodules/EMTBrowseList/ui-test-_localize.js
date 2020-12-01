const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`EMTBrowseList_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes EMTBrowseListToolbarCloseButton', function () {
			browser.assert.attribute(EMTBrowseListToolbarCloseButton, 'title', uLocalized('EMTBrowseListToolbarCloseButtonText'));
		});

		it('localizes EMTBrowseListToolbarFormButton', function () {
			browser.assert.attribute(EMTBrowseListToolbarFormButton, 'title', uLocalized('EMTBrowseListToolbarFormButtonText'));
		});

		it('localizes EMTBrowseListToolbarCreateButton', function () {
			browser.assert.attribute(EMTBrowseListToolbarCreateButton, 'title', uLocalized('EMTBrowseListToolbarCreateButtonText'));
		});

	});

});
