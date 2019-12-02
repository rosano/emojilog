const { throws, deepEqual } = require('assert');

const mainModule = require('./logic.js');

describe('EMTSharedGitHubLinkGuard', function testEMTSharedGitHubLinkGuard() {

	const StubEnvValid = function () {
		return {
			EMO_SHARED_GITHUB_URL: 'alfa',
		};
	};

	it('throws if not object', function() {
		throws(function() {
			mainModule.EMTSharedGitHubLinkGuard(null);
		}, /EMTErrorInputNotValid/);
	});

	it('returns error if no EMO_SHARED_GITHUB_URL', function () {
		deepEqual(mainModule.EMTSharedGitHubLinkGuard(Object.assign(StubEnvValid(), {
			EMO_SHARED_GITHUB_URL: null,
		})), new Error('EMO_SHARED_GITHUB_URL not defined'));
	});

	it('returns error if EMO_SHARED_GITHUB_URL blank', function () {
		deepEqual(mainModule.EMTSharedGitHubLinkGuard(Object.assign(StubEnvValid(), {
			EMO_SHARED_GITHUB_URL: ' ',
		})), new Error('EMO_SHARED_GITHUB_URL not defined'));
	});

});
