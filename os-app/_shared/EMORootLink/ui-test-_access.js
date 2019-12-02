import { deepEqual } from 'assert';

const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

Object.entries({
	EMORootLink: '.EMORootLink',
	
	EMORootLinkIcon: '.EMORootLinkIcon',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

describe('EMORootLink_Access', function () {

	before(function() {
		return browser.OLSKVisit(kDefaultRoute);
	});
	
	it('shows EMORootLink', function() {
		browser.assert.elements(EMORootLink, 1);
	});
	
	it('shows EMORootLinkIcon', function() {
		browser.assert.elements(EMORootLinkIcon, 1);
	});

});
