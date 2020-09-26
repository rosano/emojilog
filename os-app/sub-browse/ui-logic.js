import * as OLSKStringPackage from 'OLSKString';
const OLSKString = OLSKStringPackage.default || OLSKStringPackage;

const mod = {

	EMTBrowseSort(a, b) {
		return b.EMTMemoEventDate - a.EMTMemoEventDate;
	},

};

export default mod;
