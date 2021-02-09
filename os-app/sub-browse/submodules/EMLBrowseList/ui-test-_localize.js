const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`EMLBrowseList_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes EMLBrowseListToolbarCloseButton', function () {
			browser.assert.attribute(EMLBrowseListToolbarCloseButton, 'title', uLocalized('EMLBrowseListToolbarCloseButtonText'));
		});

		it('localizes EMLBrowseListToolbarFormButton', function () {
			browser.assert.attribute(EMLBrowseListToolbarFormButton, 'title', uLocalized('EMLBrowseListToolbarFormButtonText'));
		});

		it('localizes EMLBrowseListToolbarCreateButton', function () {
			browser.assert.attribute(EMLBrowseListToolbarCreateButton, 'title', uLocalized('EMLBrowseListToolbarCreateButtonText'));
		});

	});

});
