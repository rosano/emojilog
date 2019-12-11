import { deepEqual } from 'assert';

describe('EMTCommon_Access', function testEMTCommon_Access () {

	it('redirects EMTCommonIdentityRedirect', async function() {
		deepEqual((await (await browser.fetch('http://loc.tests' + OLSKTestingCanonicalFor(require('./controller.js').OLSKControllerRoutes().EMTCommonIdentityRedirect.OLSKRoutePath))).text()).slice(0, 10), '<?xml vers')
	});

});
