const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	EMLVitrine: '.EMLVitrine',
	
	EMLVitrineVideo: '.OLSKCommonVideoList .OLSKCommonVideoListItem.EMLVitrineVideo iframe',

	EMLVitrineFeaturesHeading: '.EMLVitrineFeaturesHeading',

	EMLVitrineGuideButton: '.EMLVitrineGuideButton',

	EMLVitrineDeeperHeading: '.EMLVitrineDeeperHeading',
	EMLVitrineGlossary: '.EMLVitrineGlossary',
	EMLVitrineGlossaryKaizenLink: '.EMLVitrineGlossaryKaizenLink',
	EMLVitrineGlossaryKaizenBlurb: '.EMLVitrineGlossaryKaizenBlurb',
	EMLVitrineGlossaryWetwareLink: '.EMLVitrineGlossaryWetwareLink',
	EMLVitrineGlossaryWetwareBlurb: '.EMLVitrineGlossaryWetwareBlurb',
	EMLVitrineGlossaryMeasureLink: '.EMLVitrineGlossaryMeasureLink',
	EMLVitrineGlossaryMeasureBlurb: '.EMLVitrineGlossaryMeasureBlurb',

	EMLVitrineSupportHeading: '.EMLVitrineSupportHeading',
	EMLVitrineSupportBlurb: '.EMLVitrineSupportBlurb',
}).map(function (e) {
	return global[e.shift()] = e.pop();
});

describe('EMLVitrine_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows EMLVitrine', function() {
		browser.assert.elements(EMLVitrine, 1);
	});
	
	it('shows OLSKCrown', function() {
		browser.assert.elements('.OLSKCrown', 1);
	});
	
	it('shows OLSKLanding', function() {
		browser.assert.elements('.OLSKLanding', 1);
	});

	it('shows EMLVitrineVideo', function () {
		browser.assert.elements(EMLVitrineVideo, 1);
	});

	it('shows EMLVitrineFeaturesHeading', function () {
		browser.assert.elements(EMLVitrineFeaturesHeading, 1);
	});

	it('shows EMLFeatureList', function () {
		browser.assert.elements('.EMLFeatureList', 1);
	});

	it('shows OLSKAppFeatureList', function () {
		browser.assert.elements('.OLSKAppFeatureList', 1);
	});

	it('shows OLSKAppFeatureOpenSource', function () {
		browser.assert.elements('.OLSKAppFeatureListItemOpenSource', 1);
	});

	it('shows EMLVitrineGuideButton', function () {
		browser.assert.elements(EMLVitrineGuideButton, 1);
	});

	it('shows EMLVitrineDeeperHeading', function () {
		browser.assert.elements(EMLVitrineDeeperHeading, 1);
	});

	it('shows EMLVitrineGlossary', function () {
		browser.assert.elements(EMLVitrineGlossary, 1);
	});

	it('shows EMLVitrineGlossaryKaizenLink', function () {
		browser.assert.elements(EMLVitrineGlossaryKaizenLink, 1);
	});

	it('shows EMLVitrineGlossaryKaizenBlurb', function () {
		browser.assert.elements(EMLVitrineGlossaryKaizenBlurb, 1);
	});

	it('shows EMLVitrineGlossaryWetwareLink', function () {
		browser.assert.elements(EMLVitrineGlossaryWetwareLink, 1);
	});

	it('shows EMLVitrineGlossaryWetwareBlurb', function () {
		browser.assert.elements(EMLVitrineGlossaryWetwareBlurb, 1);
	});

	it('shows EMLVitrineGlossaryMeasureLink', function () {
		browser.assert.elements(EMLVitrineGlossaryMeasureLink, 1);
	});

	it('shows EMLVitrineGlossaryMeasureBlurb', function () {
		browser.assert.elements(EMLVitrineGlossaryMeasureBlurb, 1);
	});

	it('shows ROCOGlossary', function () {
		browser.assert.elements('.ROCOGlossary', 1);
	});

	it('shows ROCOGazette', function () {
		browser.assert.elements('.ROCOGazette', 1);
	});

	it('shows OLSKEdit', function () {
		browser.assert.elements('.OLSKEdit', 1);
	});

	it('shows EMLVitrineSupportHeading', function () {
		browser.assert.elements(EMLVitrineSupportHeading, 1);
	});

	it('shows EMLVitrineSupportBlurb', function () {
		browser.assert.elements(EMLVitrineSupportBlurb, 1);
	});

	it('shows SWARLink', function() {
		browser.assert.elements('.SWARLink', 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
