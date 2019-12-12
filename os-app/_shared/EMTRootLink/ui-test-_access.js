import { deepEqual } from 'assert';

Object.entries({
	EMTRootLink: '.EMTRootLink',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

require('./controller.js').OLSKControllerRoutes().forEach(function (kDefaultRoute) {

	describe(`EMTRootLink_Access-${ kDefaultRoute.OLSKRouteSignature }`, function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
		
		it('shows EMTRootLink', function() {
			browser.assert.elements(EMTRootLink, 1);
		});
		
		it('shows OLSKRootLink', function() {
			browser.assert.elements('.OLSKRootLink', 1);
		})
		
	});
	
})
