const { throws, deepEqual } = require('assert');

const mainModule = require('./logic.js');

describe('EMTSharedGitHubLinkGuard', function testEMTSharedGitHubLinkGuard() {

	const StubEnvValid = function () {
		return {
			EMT_SHARED_GITHUB_URL: 'alfa',
		};
	};

	it('throws if not object', function() {
		throws(function() {
			mainModule.EMTSharedGitHubLinkGuard(null);
		}, /EMTErrorInputNotValid/);
	});

	it('returns error if no EMT_SHARED_GITHUB_URL', function () {
		deepEqual(mainModule.EMTSharedGitHubLinkGuard(Object.assign(StubEnvValid(), {
			EMT_SHARED_GITHUB_URL: null,
		})), new Error('EMT_SHARED_GITHUB_URL not defined'));
	});

	it('returns error if EMT_SHARED_GITHUB_URL blank', function () {
		deepEqual(mainModule.EMTSharedGitHubLinkGuard(Object.assign(StubEnvValid(), {
			EMT_SHARED_GITHUB_URL: ' ',
		})), new Error('EMT_SHARED_GITHUB_URL not defined'));
	});

});
