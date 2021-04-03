const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	EMLVitrine: '.EMLVitrine',
	
	EMLVitrineToolbar: '.EMLVitrineToolbar',
	
	EMLVitrineCrown: '.EMLVitrineCrown',
	EMLVitrineCrownIcon: '.EMLVitrineCrownIcon',
	EMLVitrineCrownName: '.EMLVitrineCrownName',

	EMLVitrineVideo: '.OLSKCommonVideoList .OLSKCommonVideoListItem.EMLVitrineVideo iframe',

	EMLVitrineFeaturesHeading: '.EMLVitrineFeaturesHeading',

	EMLVitrineGuideButton: '.EMLVitrineGuideButton',

	EMLVitrineGazetteHeading: '.EMLVitrineGazetteHeading',

	EMLVitrineSupportHeading: '.EMLVitrineSupportHeading',
	EMLVitrineSupportBlurb: '.EMLVitrineSupportBlurb',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMLVitrine_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows EMLVitrine', function() {
		browser.assert.elements(EMLVitrine, 1);
	});
	
	it('shows OLSKLanguageSwitcher', function() {
		browser.assert.elements('.OLSKLanguageSwitcher', 1);
	});
	
	it('shows EMLVitrineCrown', function() {
		browser.assert.elements(EMLVitrineCrown, 1);
	});
	
	it('shows EMLVitrineCrownIcon', function() {
		browser.assert.elements(EMLVitrineCrownIcon, 1);
	});
	
	it('shows EMLVitrineCrownName', function() {
		browser.assert.elements(EMLVitrineCrownName, 1);
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

	it('shows EMLVitrineGazetteHeading', function () {
		browser.assert.elements(EMLVitrineGazetteHeading, 1);
	});

	it('shows EMLVitrineSupportHeading', function () {
		browser.assert.elements(EMLVitrineSupportHeading, 1);
	});

	it('shows EMLVitrineSupportBlurb', function () {
		browser.assert.elements(EMLVitrineSupportBlurb, 1);
	});

	it('shows OLSKGazette', function () {
		browser.assert.elements('.OLSKGazette', 1);
	});

	it('shows SWARLink', function () {
		browser.assert.elements('.SWARLink', 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
