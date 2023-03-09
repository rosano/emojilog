const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMLVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	it('sets manifest', function () {
		browser.assert.attribute('link[rel="manifest"]', 'href', require('../tech-manifest/controller.js').OLSKControllerRoutes().shift().OLSKRoutePath);
	});

	describe('EMLVitrine', function () {
		
		it('classes OLSKDecor', function () {
			browser.assert.hasClass(EMLVitrine, 'OLSKDecor');
		});

		it('classes OLSKDecorCapped', function () {
			browser.assert.hasClass(EMLVitrine, 'OLSKDecorCapped');
		});

		it('classes OLSKDecorNoTopPad', function () {
			browser.assert.hasClass(EMLVitrine, 'OLSKDecorNoTopPad');
		});
	
	});

	describe('OLSKCrown', function test_OLSKCrown () {

		it('sets OLSKCrownCardImageURL', function () {
			browser.assert.attribute('.OLSKCrownCardImage', 'src', '/_shared/EMLRootLink/ui-assets/identity.svg');
		});
	
	});

	describe('EMLVitrineVideo', function test_EMLVitrineVideo () {

		it('classes OLSKCommonVideoListItemMobile', function () {
			browser.assert.hasClass('.EMLVitrineVideo', 'OLSKCommonVideoListItemMobile');
		});

		it('sets src', function () {
			browser.assert.attribute(EMLVitrineVideo, 'src', process.env.EML_VITRINE_VIDEO_URL);
		});

		it('sets allow', function () {
			browser.assert.attribute(EMLVitrineVideo, 'allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
		});

		it('sets allowfullscreen', function () {
			browser.assert.attribute(EMLVitrineVideo, 'allowfullscreen', '');
		});

	});

	describe('OLSKAppFeaturesList', function test_OLSKAppFeaturesList () {

		it('shows OLSKAppFeatureOpenSource', function () {
			browser.assert.attribute('.OLSKAppFeatureListItemOpenSource a', 'href', process.env.OLSK_REPO_URL);
		});
	
	});

	describe('EMLVitrineGuideButton', function test_EMLVitrineGuideButton () {

		it('classes OLSKDecorPress', function () {
			browser.assert.hasClass(EMLVitrineGuideButton, 'OLSKDecorPress');
		});
		
		it('classes OLSKDecorPressCall', function () {
			browser.assert.hasClass(EMLVitrineGuideButton, 'OLSKDecorPressCall');
		});
		
		it('sets href', function () {
			browser.assert.attribute(EMLVitrineGuideButton, 'href', OLSKTestingCanonical(require('../open-guide/controller.js').OLSKControllerRoutes().shift()));
		});
	
	});

	describe('EMLVitrineGlossary', function test_EMLVitrineGlossary () {

		it('classes OLSKDecorGlossary', function () {
			browser.assert.hasClass(EMLVitrineGlossary, 'OLSKDecorGlossary');
		});
		
	});

	describe('EMLVitrineGlossaryKaizenLink', function test_EMLVitrineGlossaryKaizenLink () {

		it('sets target', function () {
			browser.assert.attribute(EMLVitrineGlossaryKaizenLink, 'target', 	'_blank');
		});

		it('sets href', function () {
			browser.assert.attribute(EMLVitrineGlossaryKaizenLink, 'href', process.env.EML_VITRINE_KAIZEN_URL);
		});
	
	});

	describe('EMLVitrineGlossaryWetwareLink', function test_EMLVitrineGlossaryWetwareLink () {

		it('sets lang', function () {
			browser.assert.attribute(EMLVitrineGlossaryWetwareLink, 'lang', 	'en');
		});

		it('sets target', function () {
			browser.assert.attribute(EMLVitrineGlossaryWetwareLink, 'target', 	'_blank');
		});

		it('sets href', function () {
			browser.assert.attribute(EMLVitrineGlossaryWetwareLink, 'href', process.env.EML_VITRINE_WETWARE_URL);
		});
	
	});

	describe('EMLVitrineGlossaryMeasureLink', function test_EMLVitrineGlossaryMeasureLink () {

		it('sets target', function () {
			browser.assert.attribute(EMLVitrineGlossaryMeasureLink, 'target', 	'_blank');
		});

		it('sets href', function () {
			browser.assert.attribute(EMLVitrineGlossaryMeasureLink, 'href', process.env.EML_VITRINE_MEASURE_URL);
		});
	
	});

	describe('EMLVitrineGlossaryBooksLink', function test_EMLVitrineGlossaryBooksLink () {

		it('sets target', function () {
			browser.assert.attribute(EMLVitrineGlossaryBooksLink, 'target', 	'_blank');
		});

		it('sets href', function () {
			browser.assert.attribute(EMLVitrineGlossaryBooksLink, 'href', process.env.EML_VITRINE_BOOKS_URL);
		});
	
	});

	describe('ROCOGazette', function test_ROCOGazette () {

		it('sets ROCOBulletinProject', function () {
			browser.assert.attribute('.ROCOBulletinProjectField', 'value', 'Emoji Log');
		});

	});

	describe('OLSKEdit', function test_OLSKEdit () {

		it('sets OLSKEditURL', function () {
			browser.assert.attribute('.OLSKEdit', 'href', process.env.OLSK_REPO_URL);
		});

	});

});
