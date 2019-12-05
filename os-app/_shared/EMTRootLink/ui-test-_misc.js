import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMTRootLink_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath);
	});

	context('EMTRootLinkLogo', function () {
		
		it('sets role', function () {
			browser.assert.attribute(EMTRootLinkLogo, 'role', 'img');
		});
	
		it('sets src', function () {
			browser.assert.attribute(EMTRootLinkLogo, 'src', '/_shared/EMTRootLink/ui-assets/logo.svg');
		});
	
	});

});
