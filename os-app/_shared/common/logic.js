const mod = {

	EMTSharedGitHubLinkGuard (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMTErrorInputNotValid');
		}

		if (!(inputData.EMO_SHARED_GITHUB_URL || '').trim()) {
			return new Error('EMO_SHARED_GITHUB_URL not defined');
		}
	},

};

Object.assign(exports, mod)
