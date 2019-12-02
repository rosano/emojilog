import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

describe('EMORootLink_Misc', function () {

	before(function () {
		return browser.visit(kDefaultRoute.OLSKRoutePath)
	});

	context('EMORootLinkIcon', function () {
		
		it('sets role', function () {
			browser.assert.attribute(EMORootLinkIcon, 'role', 'img')
		});
	
		it('sets src', function () {
			browser.assert.attribute(EMORootLinkIcon, 'src', '/_shared/EMORootLink/ui-assets/icon.svg')
		});
	
	});

});
