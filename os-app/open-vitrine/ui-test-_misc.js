import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTVitrine_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath)
	});

	context('EMTVitrine', function () {
		
		it('sets class', function () {
			browser.assert.hasClass(EMTVitrine, 'OLSKCommon')
		});
	
	});

	context('EMTVitrineIdentityIcon', function () {
		
		it('sets role', function () {
			browser.assert.attribute(EMTVitrineIdentityIcon, 'role', 'image')
		});
		
		it('sets src', function () {
			browser.assert.attribute(EMTVitrineIdentityIcon, 'src', '/_shared/EMORootLink/ui-assets/logo.svg')
		});
	
	});

});
