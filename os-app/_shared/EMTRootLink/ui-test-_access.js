import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMTRootLink: '.EMTRootLink',
	
	EMTRootLinkLogo: '.EMTRootLinkLogo',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMTRootLink_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows EMTRootLink', function() {
		browser.assert.elements(EMTRootLink, 1);
	});
	
	it('shows EMTRootLinkLogo', function() {
		browser.assert.elements(EMTRootLinkLogo, 1);
	});

});
