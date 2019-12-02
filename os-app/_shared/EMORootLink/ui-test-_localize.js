import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uFormatted = OLSKTestingStringWithFormat;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`EMORootLink_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage: languageCode,
		});
	});

	it('localizes title', function () {
		browser.assert.attribute(EMORootLink, 'title', uFormatted(uLocalized('EMOSharedColonSeparatedFormat'), uLocalized('EMORootLinkLogoLabel'), uLocalized('EMORootLinkText')))
	});

	it('localizes href', function () {
		browser.assert.attribute(EMORootLink, 'href', OLSKTestingCanonicalFor('/', {
			OLSKRoutingLanguage: languageCode,
		}));
	});

});

});
