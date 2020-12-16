const kDefaultRoutePath = require('./controller.js').OLSKControllerRoutes().shift().OLSKRoutePath;

Object.entries({
	EMTVitrine: '.EMTVitrine',
	
	EMTVitrineCrown: '.EMTVitrineCrown',
	EMTVitrineCrownIcon: '.EMTVitrineCrownIcon',
	EMTVitrineCrownName: '.EMTVitrineCrownName',
	EMTVitrineCrownBlurb: '.EMTVitrineCrownBlurb',

	EMTVitrineContent: '.EMTVitrineContent',
	EMTVitrineContentAppButton: '.EMTVitrineContentAppButton',

	EMTVitrineSupportHeading: '.EMTVitrineSupportHeading',
	EMTVitrineSupportBlurb: '.EMTVitrineSupportBlurb',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTVitrine_Access', function () {

	before(function() {
		return browser.visit(kDefaultRoutePath);
	});
	
	it('shows EMTVitrine', function() {
		browser.assert.elements(EMTVitrine, 1);
	});
	
	it('shows OLSKLanguageSwitcher', function() {
		browser.assert.elements('.OLSKLanguageSwitcher', 1);
	});
	
	it('shows EMTVitrineCrown', function() {
		browser.assert.elements(EMTVitrineCrown, 1);
	});
	
	it('shows EMTVitrineCrownIcon', function() {
		browser.assert.elements(EMTVitrineCrownIcon, 1);
	});
	
	it('shows EMTVitrineCrownName', function() {
		browser.assert.elements(EMTVitrineCrownName, 1);
	});

	it('shows EMTVitrineCrownBlurb', function () {
		browser.assert.elements(EMTVitrineCrownBlurb, 1);
	});
	
	it('shows OLSKCommonWhatIsIt', function() {
		browser.assert.elements('.OLSKCommonWhatIsIt', 1);
	});

	it('shows EMTVitrineContent', function() {
		browser.assert.elements(EMTVitrineContent, 1);
	});

	it('shows EMTVitrineContentAppButton', function() {
		browser.assert.elements(EMTVitrineContentAppButton, 1);
	});

	it('shows EMTVitrineSupportHeading', function () {
		browser.assert.elements(EMTVitrineSupportHeading, 1);
	});

	it('shows EMTVitrineSupportBlurb', function () {
		browser.assert.elements(EMTVitrineSupportBlurb, 1);
	});

	it('shows ROCORootLink', function() {
		browser.assert.elements('.ROCORootLink', 1);
	});

});
