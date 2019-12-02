import { deepEqual } from 'assert';

const kDefaultRoute = require('../../controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`EMTTrackFooter_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage: languageCode,
		});
	});
	
	it('localizes EMTTrackFooterStorageButton', function() {
		browser.assert.attribute(EMTTrackFooterStorageButton, 'title', uLocalized('EMTTrackFooterStorageButtonText'));
	});
	
	it('localizes EMTTrackFooterDonateLink', function() {
		browser.assert.text(EMTTrackFooterDonateLink, uLocalized('EMTTrackFooterDonateLinkText'));
	});

});

});
