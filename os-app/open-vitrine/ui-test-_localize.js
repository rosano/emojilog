const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('EMLVitrine_Localize-' + OLSKRoutingLanguage, function () {

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

		it('localizes EMLVitrineFeaturesHeading', function () {
			browser.assert.text(EMLVitrineFeaturesHeading, uLocalized('OLSKWordingFeatures'));
		});

		it('localizes EMLVitrineGuideButton', function () {
			browser.assert.text(EMLVitrineGuideButton, uLocalized('OLSKWordingOpenGuide'));
		});

		it('localizes EMLVitrineDeeperHeading', function () {
			browser.assert.text(EMLVitrineDeeperHeading, uLocalized('OLSKWordingDeeperHeading'));
		});

		it('localizes EMLVitrineGlossaryKaizenLink', function () {
			browser.assert.text(EMLVitrineGlossaryKaizenLink, uLocalized('EMLVitrineGlossaryKaizenLinkText'));
		});

		it('localizes EMLVitrineGlossaryKaizenBlurb', function () {
			browser.assert.text(EMLVitrineGlossaryKaizenBlurb, uLocalized('EMLVitrineGlossaryKaizenBlurbText'));
		});

		it('localizes EMLVitrineGlossaryWetwareLink', function () {
			browser.assert.text(EMLVitrineGlossaryWetwareLink, 'Wetware');
		});

		it('localizes EMLVitrineGlossaryWetwareBlurb', function () {
			browser.assert.text(EMLVitrineGlossaryWetwareBlurb, uLocalized('EMLVitrineGlossaryWetwareBlurbText'));
		});

		it('localizes EMLVitrineGlossaryMeasureLink', function () {
			browser.assert.text(EMLVitrineGlossaryMeasureLink, uLocalized('EMLVitrineGlossaryMeasureLinkText'));
		});

		it('localizes EMLVitrineGlossaryMeasureBlurb', function () {
			browser.assert.text(EMLVitrineGlossaryMeasureBlurb, uLocalized('EMLVitrineGlossaryMeasureBlurbText'));
		});

		it('localizes EMLVitrineGlossaryBooksLink', function () {
			browser.assert.text(EMLVitrineGlossaryBooksLink, uLocalized('EMLVitrineGlossaryBooksLinkText'));
		});

		it('localizes EMLVitrineGlossaryBooksBlurb', function () {
			browser.assert.text(EMLVitrineGlossaryBooksBlurb, uLocalized('EMLVitrineGlossaryBooksBlurbText'));
		});

		it('localizes EMLVitrineSupportHeading', function () {
			browser.assert.text(EMLVitrineSupportHeading, uLocalized('OLSKWordingFeedbackHeading'));
		});

		it('localizes EMLVitrineSupportBlurb', function () {
			browser.assert.text(EMLVitrineSupportBlurb, uLocalized('OLSKWordingFeedbackBlurb'));
		});

		context('OLSKCrown', function test_OLSKCrown () {

			it('localizes OLSKCrownCardName', function () {
				browser.assert.text('.OLSKCrownCardName', uLocalized('EMLVitrineTitle'));
			});
		
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

			it('localizes OLSKLandingActionHref', function () {
				browser.assert.attribute('.OLSKLandingAction', 'href', OLSKTestingCanonical(require('../open-track/controller.js').OLSKControllerRoutes().shift(), {
					OLSKRoutingLanguage,
				}));
			});
		
		});


	});

});
