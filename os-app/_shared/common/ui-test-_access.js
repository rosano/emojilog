import { deepEqual } from 'assert';

describe('EMTCommon_Access', function test_EMTCommon_Access () {

	it('redirects EMTCommonIdentityRedirect', async function() {
		deepEqual((await (await browser.fetch('http://loc.tests' + OLSKTestingCanonical(require('./controller.js').OLSKControllerRoutes().EMTCommonIdentityRedirect))).text()).slice(0, 10), '<?xml vers')
	});

});
