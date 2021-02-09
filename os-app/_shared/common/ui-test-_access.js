describe('EMLCommon_Access', function test_EMLCommon_Access () {

	it('redirects EMLCommonIdentityRedirect', async function() {
		browser.assert.deepEqual((await (await browser.fetch('http://loc.tests' + OLSKTestingCanonical(require('./controller.js').OLSKControllerRoutes().EMLCommonIdentityRedirect))).text()).slice(0, 10), '<?xml vers')
	});

});
