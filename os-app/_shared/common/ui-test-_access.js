describe('EMTCommon_Access', function test_EMTCommon_Access () {

	it('redirects EMTCommonIdentityRedirect', async function() {
		browser.assert.deepEqual((await (await browser.fetch('http://loc.tests' + OLSKTestingCanonical(require('./controller.js').OLSKControllerRoutes().EMTCommonIdentityRedirect))).text()).slice(0, 10), '<?xml vers')
	});

});
