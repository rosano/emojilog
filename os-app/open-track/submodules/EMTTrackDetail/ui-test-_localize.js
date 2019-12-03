import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`EMTTrackDetail_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage: languageCode,
		});
	});
	
	it('localizes EMTTrackDetailPlaceholder', function () {
		browser.assert.text(EMTTrackDetailPlaceholder, uLocalized('EMTTrackDetailPlaceholderText'));
	});

	context('EMTTrackDetailItem', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackDetailItem: JSON.stringify({
					EMTDocumentName: 'alfa',
				}),
			});
		});

		it('localizes EMTTrackDetailToolbarBackButton', function () {
			browser.assert.text(EMTTrackDetailToolbarBackButton, uLocalized('EMTTrackDetailToolbarBackButtonText'));
		});

		it('localizes EMTTrackDetailToolbarDiscardButton', function () {
			browser.assert.text(EMTTrackDetailToolbarDiscardButton, uLocalized('EMTTrackDetailToolbarDiscardButtonText'));
		});
		
		it('localizes EMTTrackDetailFormNameField', function () {
			browser.assert.attribute(EMTTrackDetailFormNameField, 'placeholder', uLocalized('EMTTrackDetailFormNameFieldPlaceholderText'));
		});

		context('on discard', function () {
			
			it('localizes EMTTrackDetailDiscardPrompt', async function() {
				deepEqual((await browser.OLSKConfirm(async function () {
					browser.pressButton(EMTTrackDetailToolbarDiscardButton);
				})).question, uLocalized('EMTTrackDetailDiscardPromptText'));
			});
		
		});
		
	});

});

});
