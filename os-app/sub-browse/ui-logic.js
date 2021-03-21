import OLSKString from 'OLSKString';

const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	EMLBrowseAccessibilitySummary (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMLErrorInputNotValid');
		}

		return inputData.EMLMemoEventDate.toLocaleString();
	},

	EMLBrowseSortFunction (a, b) {
		return uDescending(a.EMLMemoEventDate, b.EMLMemoEventDate);
	},

	EMLBrowseMatchIsResult (param1, param2) {
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
