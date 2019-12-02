import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`EMTVitrine_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.visit(OLSKTestingCanonicalFor(kDefaultRoute.OLSKRoutePath, {
			OLSKRoutingLanguage: languageCode,
		}));
	});

	it('localizes title', function() {
		browser.assert.text('title', uLocalized('EMTVitrineTitle'))
	});

	it('localizes description', function() {
		browser.assert.attribute('meta[name=description]', 'content', uLocalized('EMTVitrineDescription'))
	});

	it('localize EMTVitrineIdentityName', function () {
		browser.assert.text(EMTVitrineIdentityName, uLocalized('EMTVitrineTitle'));
	});

	it('localizes EMTVitrineContent', function() {
		const item = require('fs').readFileSync(require('path').join(__dirname, `text.${ languageCode }.md`), 'utf-8').replace(/_/g, '');
		deepEqual(browser.query(EMTVitrineContent).textContent.trim().slice(0, 20), item.slice(0, 20))
	});

	it('localizes EMO_SHARED_GITHUB_URL', function() {
		browser.assert.element(`a[href="${ process.env.EMO_SHARED_GITHUB_URL }"]`);
	});

});

});
