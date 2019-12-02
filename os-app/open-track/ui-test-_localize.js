import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

const uStringWithFormat = OLSKTestingStringWithFormat;

kDefaultRoute.OLSKRouteLanguages.forEach(function (languageCode) {

const uLocalized = function (inputData) {
	return OLSKTestingLocalized(inputData, languageCode);
};

describe(`EMTTrack_Localize-${ languageCode }`, function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute, {
			OLSKRoutingLanguage: languageCode,
		});
	});

	it('localizes title', function() {
		browser.assert.text('title', uLocalized('EMTTrackTitle'))
	});

	it('localizes EMT_SHARED_DONATE_URL', function() {
		browser.assert.element(`a[href="${ process.env.EMT_SHARED_DONATE_URL }"]`);
	});

	it('localizes EMTTrackCreateButton', function () {
		browser.assert.attribute(EMTTrackCreateButton, 'title', uLocalized('EMTTrackCreateButtonText'));
	});

	it('localizes EMTTrackDetailPlaceholderContainer', function() {
		browser.assert.text(EMTTrackDetailPlaceholderContainer, uLocalized('EMTTrackDetailPlaceholderText'));
	});

	context('on create', function () {

		before(function () {
			return uCreateItem(browser);
		});
		
		it('localizes EMTTrackDetailToolbarDiscardButton', function () {
			browser.assert.attribute(EMTTrackDetailToolbarDiscardButton, 'title', uLocalized('EMTTrackListItemToolbarDeleteButtonText'));
		});
		
		it('localizes EMTTrackFormNameField', function () {
			browser.assert.attribute(EMTTrackFormNameField, 'placeholder', uLocalized('EMTTrackFormNameFieldPlaceholderText'));
		});
	
	});

	context('on delete', function () {
		
		it('localizes EMTTrackListItemDeletePrompt', async function() {
			deepEqual((await browser.OLSKConfirm(async function () {
				browser.pressButton(EMTTrackDetailToolbarDiscardButton);
			})).question, uLocalized('EMTTrackListItemDeletePromptText'));
		});
	
	});

});

});
