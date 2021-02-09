import OLSKString from 'OLSKString';

const mod = {

	EMLBrowseSort(a, b) {
		return b.EMLMemoEventDate - a.EMLMemoEventDate;
	},

	EMLBrowseFilterFunction(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('EMLErrorInputNotValid');
		}

		return function (e) {
			return [e.EMLMemoNotes].filter(function (e) {
				return !!e;
			}).filter(function (e) {
				return OLSKString.OLSKStringMatch(inputData, e);
			}).length;
		};
	},

	EMLBrowseExactMatchFirst(param1, param2) {
		if (typeof param1 !== 'string') {
			throw new Error('EMLErrorInputNotValid');
		}

		if (!Array.isArray(param2)) {
			throw new Error('EMLErrorInputNotValid');
		}

		return param2.slice().sort(function (a, b) {
			const isExact = function (e) {
				return [e.EMLMemoNotes].filter(function (e) {
					if (!e) {
						return;
					}
					
					return OLSKString.OLSKStringMatch(e, param1);
				}).length;
			};

			return isExact(a) > isExact(b) ? -1 : 1;
		});
	},

};

export default mod;
