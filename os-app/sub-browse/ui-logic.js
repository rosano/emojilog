import OLSKString from 'OLSKString';

const mod = {

	EMLBrowseAccessibilitySummary (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMLErrorInputNotValid');
		}

		return inputData.EMLMemoEventDate.toLocaleString();
	},

	EMLBrowseSortFunction (a, b) {
		return b.EMLMemoEventDate - a.EMLMemoEventDate;
	},

	EMLBrowseFilterFunction (param1, param2) {
		if (typeof param2 !== 'string') {
			throw new Error('EMLErrorInputNotValid');
		}

		return [param1.EMLMemoNotes].filter(function (e) {
			if (!e) {
				return false;
			}

			return OLSKString.OLSKStringMatch(param2, e);
		}).length;
	},

	EMLBrowseMatchIsExact (param1, param2) {
		if (typeof param2 !== 'string') {
			throw new Error('EMLErrorInputNotValid');
		}

		return [param1.EMLMemoNotes].filter(function (e) {
			if (!e) {
				return false;
			}

			return OLSKString.OLSKStringMatch(param2, e, 'startsWith');
		}).length;
	},

};

export default mod;
