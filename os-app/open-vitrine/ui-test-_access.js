const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	EMLVitrine: '.EMLVitrine',
	
	EMLVitrineCrown: '.EMLVitrineCrown',
	EMLVitrineCrownIcon: '.EMLVitrineCrownIcon',
	EMLVitrineCrownName: '.EMLVitrineCrownName',
	EMLVitrineCrownBlurb: '.EMLVitrineCrownBlurb',

	EMLVitrineContent: '.EMLVitrineContent',
	EMLVitrineContentAppButton: '.EMLVitrineContentAppButton',

	EMLVitrineFeaturesHeading: '.EMLVitrineFeaturesHeading',

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

	it('shows EMLVitrineCrownBlurb', function () {
		browser.assert.elements(EMLVitrineCrownBlurb, 1);
	});
	
	it('shows OLSKCommonWhatIsIt', function() {
		browser.assert.elements('.OLSKCommonWhatIsIt', 1);
	});

	it('shows EMLVitrineContent', function() {
		browser.assert.elements(EMLVitrineContent, 1);
	});

	it('shows EMLVitrineContentAppButton', function() {
		browser.assert.elements(EMLVitrineContentAppButton, 1);
	});

	it('shows EMLVitrineFeaturesHeading', function () {
		browser.assert.elements(EMLVitrineFeaturesHeading, 1);
	});

	it('shows OLSKAppFeatureList', function () {
		browser.assert.elements('.OLSKAppFeatureList', 1);
	});

	it('shows EMLVitrineSupportHeading', function () {
		browser.assert.elements(EMLVitrineSupportHeading, 1);
	});

	it('shows EMLVitrineSupportBlurb', function () {
		browser.assert.elements(EMLVitrineSupportBlurb, 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
