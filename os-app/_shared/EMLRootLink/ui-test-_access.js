Object.entries({
	EMLRootLink: '.EMLRootLink',
}).map(function (e) {
	return global[e.shift()]  = e.pop();
});

require('./controller.js').OLSKControllerRoutes().forEach(function (kDefaultRoute) {

	describe(`EMLRootLink_Access-${ kDefaultRoute.OLSKRouteSignature }`, function () {
		
		before(function() {
			return browser.OLSKVisit(kDefaultRoute);
		});
		
		it('shows EMLRootLink', function() {
			browser.assert.elements(EMLRootLink, 1);
		});
		
		it('shows OLSKRootLink', function() {
			browser.assert.elements('.OLSKRootLink', 1);
		})
		
	});
	
})
