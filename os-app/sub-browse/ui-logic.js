import * as OLSKStringPackage from 'OLSKString';
const OLSKString = OLSKStringPackage.default || OLSKStringPackage;

const mod = {

	EMTBrowseSort(a, b) {
		return b.EMTMemoEventDate - a.EMTMemoEventDate;
	},

	EMTBrowseFilterFunction(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('EMTErrorInputNotValid');
		}

		return function (e) {
			return [e.EMTMemoNotes].filter(function (e) {
				return !!e;
			}).filter(function (e) {
				return OLSKString.OLSKStringMatch(inputData, e);
			}).length;
		};
	},

	EMTBrowseExactMatchFirst(param1, param2) {
		if (typeof param1 !== 'string') {
			throw new Error('EMTErrorInputNotValid');
		}

		if (!Array.isArray(param2)) {
			throw new Error('EMTErrorInputNotValid');
		}

		return param2.slice().sort(function (a, b) {
			const isExact = function (e) {
				return [e.EMTMemoNotes].filter(function (e) {
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
