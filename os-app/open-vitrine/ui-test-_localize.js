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

		it('localizes EMLVitrineCrownBlurb', function () {
			browser.assert.text(EMLVitrineCrownBlurb, uLocalized('EMLVitrineDescription'));
		});

		it('localizes OLSKCommonWhatIsIt', function () {
			browser.assert.text('.OLSKCommonWhatIsIt', uLocalized('OLSKCommonWhatIsItText'));
		});

		it('localizes EMLVitrineContent', function() {
			const item = require('OLSKString').OLSKStringReplaceTokens(require('fs').readFileSync(require('path').join(__dirname, `text.${ OLSKRoutingLanguage }.md`), 'utf-8'), {
				'\\*': '',
				'\n\n': '\n',
				'EMLVitrineDescription': uLocalized('EMLVitrineDescription'),
			});
			browser.assert.OLSKTextContent(EMLVitrineContent, item.slice(0, 20), function (inputData) {
				return inputData.slice(0, 20);
			});
		});

		it('localizes EML_SHARED_GITHUB_URL', function() {
			browser.assert.element(`a[href="${ process.env.EML_SHARED_GITHUB_URL }"]`);
		});

		it('localizes EMLVitrineContentAppButton', function () {
			browser.assert.text(EMLVitrineContentAppButton, uLocalized('OLSKWordingOpenApp'));
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

		context('EMLVitrineContentAppButton', function test_EMLVitrineContentAppButton () {

			it('classes OLSKDecorPress', function () {
				browser.assert.hasClass(EMLVitrineContentAppButton, 'OLSKDecorPress');
			});
			
			it('classes OLSKDecorPressCall', function () {
				browser.assert.hasClass(EMLVitrineContentAppButton, 'OLSKDecorPressCall');
			});
			
			it('sets href', function () {
				browser.assert.attribute(EMLVitrineContentAppButton, 'href', OLSKTestingCanonical(require('../open-track/controller.js').OLSKControllerRoutes().shift()));
			});
		
		});

	});

});
