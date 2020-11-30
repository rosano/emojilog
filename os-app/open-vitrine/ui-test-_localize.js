const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (languageCode) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, languageCode);
	};

	describe(`EMTVitrine_Localize-${ languageCode }`, function () {

		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage: languageCode,
			});
		});

		it('localizes title', function() {
			browser.assert.text('title', uLocalized('EMTVitrineTitle'));
		});

		it('localizes description', function() {
			browser.assert.attribute('meta[name=description]', 'content', uLocalized('EMTVitrineDescription'));
		});

		it('localizes EMTVitrineIdentityName', function () {
			browser.assert.text(EMTVitrineIdentityName, uLocalized('EMTVitrineTitle'));
		});

		it('localizes EMTVitrineContent', function() {
			const item = require('OLSKString').OLSKStringReplaceTokens(require('fs').readFileSync(require('path').join(__dirname, `text.${ languageCode }.md`), 'utf-8'), {
				'_': '',
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

		context('EMTVitrineContentAppButton', function test_EMTVitrineContentAppButton () {

			it('classes OLSKCommonButton', function () {
				browser.assert.hasClass(EMTVitrineContentAppButton, 'OLSKCommonButton');
			});
			
			it('classes OLSKCommonButtonPrimary', function () {
				browser.assert.hasClass(EMTVitrineContentAppButton, 'OLSKCommonButtonPrimary');
			});
			
			it('sets href', function () {
				browser.assert.attribute(EMTVitrineContentAppButton, 'href', OLSKTestingCanonical(require('../open-track/controller.js').OLSKControllerRoutes().shift(), {
					OLSKRoutingLanguage: languageCode,
				}));
			});
		
		});

	});

});
