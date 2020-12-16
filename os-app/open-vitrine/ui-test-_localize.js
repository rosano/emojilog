const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`EMTVitrine_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('EMTVitrineTitle'));
		});

		it('localizes meta[description]', function() {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('EMTVitrineDescription'));
		});

		it('localizes EMTVitrineCrownName', function () {
			browser.assert.text(EMTVitrineCrownName, uLocalized('EMTVitrineTitle'));
		});

		it('localizes EMTVitrineCrownBlurb', function () {
			browser.assert.text(EMTVitrineCrownBlurb, uLocalized('EMTVitrineDescription'));
		});

		it('localizes OLSKCommonWhatIsIt', function () {
			browser.assert.text('.OLSKCommonWhatIsIt', uLocalized('OLSKCommonWhatIsItText'));
		});

		it('localizes EMTVitrineContent', function() {
			const item = require('OLSKString').OLSKStringReplaceTokens(require('fs').readFileSync(require('path').join(__dirname, `text.${ OLSKRoutingLanguage }.md`), 'utf-8'), {
				'\\*': '',
				'\n\n': '\n',
				'EMTVitrineDescription': uLocalized('EMTVitrineDescription'),
			});
			browser.assert.OLSKTextContent(EMTVitrineContent, item.slice(0, 20), function (inputData) {
				return inputData.slice(0, 20);
			});
		});

		it('localizes EMT_SHARED_GITHUB_URL', function() {
			browser.assert.element(`a[href="${ process.env.EMT_SHARED_GITHUB_URL }"]`);
		});

		it('localizes EMTVitrineContentAppButton', function () {
			browser.assert.text(EMTVitrineContentAppButton, uLocalized('OLSKWordingOpenApp'));
		});

		it('localizes EMTVitrineFeaturesHeading', function () {
			browser.assert.text(EMTVitrineFeaturesHeading, uLocalized('OLSKWordingFeatures'));
		});

		it('localizes EMTVitrineSupportHeading', function () {
			browser.assert.text(EMTVitrineSupportHeading, uLocalized('OLSKWordingSupportHeading'));
		});

		it('localizes EMTVitrineSupportBlurb', function () {
			browser.assert.text(EMTVitrineSupportBlurb, uLocalized('OLSKWordingSupportBlurb'));
		});

		context('EMTVitrineContentAppButton', function test_EMTVitrineContentAppButton () {

			it('classes OLSKCommonButton', function () {
				browser.assert.hasClass(EMTVitrineContentAppButton, 'OLSKCommonButton');
			});
			
			it('classes OLSKCommonButtonPrimary', function () {
				browser.assert.hasClass(EMTVitrineContentAppButton, 'OLSKCommonButtonPrimary');
			});
			
			it('sets href', function () {
				browser.assert.attribute(EMTVitrineContentAppButton, 'href', OLSKTestingCanonical(require('../open-track/controller.js').OLSKControllerRoutes().shift()));
			});
		
		});

	});

});
