const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`EMLVitrine_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('EMLVitrineTitle'));
		});

		it('localizes meta[description]', function() {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('EMLVitrineDescription'));
		});

		it('localizes EMLVitrineCrownName', function () {
			browser.assert.text(EMLVitrineCrownName, uLocalized('EMLVitrineTitle'));
		});

		it('localizes EMLVitrineFeaturesHeading', function () {
			browser.assert.text(EMLVitrineFeaturesHeading, uLocalized('OLSKWordingFeatures'));
		});

		it('localizes EMLVitrineSupportHeading', function () {
			browser.assert.text(EMLVitrineSupportHeading, uLocalized('OLSKWordingFeedbackHeading'));
		});

		it('localizes EMLVitrineSupportBlurb', function () {
			browser.assert.text(EMLVitrineSupportBlurb, uLocalized('OLSKWordingFeedbackBlurb'));
		});

		it('localizes EMLVitrineGazetteHeading', function () {
			browser.assert.text(EMLVitrineGazetteHeading, uLocalized('OLSKGazetteHeadingText'));
		});

		context('OLSKLanding', function test_OLSKLanding () {

			it('localizes OLSKLandingHeadingText', function () {
				browser.assert.text('.OLSKLandingHeading', uLocalized('EMLVitrineDescription'));
			});

			it('localizes OLSKLandingBlurbText', function () {
				browser.assert.text('.OLSKLandingBlurb', uLocalized('OLSKLandingBlurbText'));
			});

			it('localizes OLSKLandingActionText', function () {
				browser.assert.text('.OLSKLandingAction', uLocalized('OLSKWordingOpenApp'));
			});
		
		});


	});

});
