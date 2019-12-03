import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`EMTTrackUnit_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage: languageCode,
		});
	});
	
	it('localizes EMTTrackUnitPlaceholder', function () {
		browser.assert.text(EMTTrackUnitPlaceholder, uLocalized('EMTTrackUnitPlaceholderText'));
	});

	context('EMTTrackUnitItem', function() {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute, {
				EMTTrackUnitItem: JSON.stringify({
					EMTDocumentName: 'alfa',
				}),
			});
		});

		it('localizes EMTTrackUnitToolbarBackButton', function () {
			browser.assert.text(EMTTrackUnitToolbarBackButton, uLocalized('EMTTrackUnitToolbarBackButtonText'));
		});

		it('localizes EMTTrackUnitToolbarDiscardButton', function () {
			browser.assert.text(EMTTrackUnitToolbarDiscardButton, uLocalized('EMTTrackUnitToolbarDiscardButtonText'));
		});
		
		it('localizes EMTTrackUnitFormNameField', function () {
			browser.assert.attribute(EMTTrackUnitFormNameField, 'placeholder', uLocalized('EMTTrackUnitFormNameFieldPlaceholderText'));
		});

		context('on discard', function () {
			
			it('localizes EMTTrackUnitDiscardPrompt', async function() {
				deepEqual((await browser.OLSKConfirm(async function () {
					browser.pressButton(EMTTrackUnitToolbarDiscardButton);
				})).question, uLocalized('EMTTrackUnitDiscardPromptText'));
			});
		
		});
		
	});

});

});
