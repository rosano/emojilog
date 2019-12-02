const mod = {

	EMTSharedDonateLinkGuard (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMTErrorInputNotValid');
		}

		if (!(inputData.EMT_SHARED_DONATE_URL || '').trim()) {
			return new Error('EMT_SHARED_DONATE_URL not defined');
		}
	},

	EMTSharedGitHubLinkGuard (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMTErrorInputNotValid');
		}

		if (!(inputData.EMT_SHARED_GITHUB_URL || '').trim()) {
			return new Error('EMT_SHARED_GITHUB_URL not defined');
		}
	},

};

Object.assign(exports, mod)
