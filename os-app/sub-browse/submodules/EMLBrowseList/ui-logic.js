const mod = {

	EMLBrowseListItemAccessibilitySummary(inputData, OLSKLocalized) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMLErrorInputNotValid');
		}

		return [
			OLSKLocalized('EMLBrowseListItemUntitledText'),
		].join('\n');
	},

};

Object.assign(exports, mod);
