const mod = {

	EMTBrowseListItemAccessibilitySummary(inputData, OLSKLocalized) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMTErrorInputNotValid');
		}

		return [
			OLSKLocalized('EMTBrowseListItemUntitledText'),
		].join('\n');
	},

};

Object.assign(exports, mod);
