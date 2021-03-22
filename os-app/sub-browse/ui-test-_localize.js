const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`EMLBrowse_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
				EMLBrowseJournal: JSON.stringify(StubJournalObjectValid()),
			});
		});

		it('localizes EMLBrowseCloseButton', function () {
			browser.assert.attribute(EMLBrowseCloseButton, 'title', uLocalized('EMLBrowseCloseButtonText'));
		});

		it('localizes EMLBrowseFormButton', function () {
			browser.assert.attribute(EMLBrowseFormButton, 'title', uLocalized('EMLBrowseFormButtonText'));
		});

		it('localizes EMLBrowseCreateButton', function () {
			browser.assert.attribute(EMLBrowseCreateButton, 'title', uLocalized('EMLBrowseCreateButtonText'));
		});

		describe('OLSKModalView', function test_OLSKModalView() {

			before(function () {
				return browser.pressButton(EMLBrowseFormButton);
			});

			it('sets OLSKModalViewTitleText', function () {
				browser.assert.text('.OLSKModalViewTitle', uLocalized('EMLBrowseFormButtonText'));
			});

			after(function () {
				return browser.pressButton('.OLSKModalViewCloseButton');
			});

		});

	});

});
