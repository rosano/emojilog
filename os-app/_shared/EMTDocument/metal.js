import EMTDocumentModel from './model.js';
import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const mod = {

	async EMTDocumentMetalWrite (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('EMTErrorInputNotValid'));
		}

		let errors = EMTDocumentModel.EMTDocumentModelErrorsFor(inputData);
		if (errors) {
			return Promise.resolve({
				EMTErrors: errors,
			});
		}

		return Object.assign(inputData, await storageClient.emojitimer.emt_documents.EMTStorageWrite(Object.keys(inputData).reduce(function (coll, item) {
			if (item[0] !== '$') {
				coll[item] = inputData[item];
			}

			return coll
		}, {})));
	},

	async EMTDocumentMetalList (storageClient) {
		let outputData = await storageClient.emojitimer.emt_documents.EMTStorageList();

		for (let key in outputData) {
			OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(outputData[key]);
		}
		
		return outputData;
	},

	async EMTDocumentMetalDelete (storageClient, inputData) {
		return await storageClient.emojitimer.emt_documents.EMTStorageDelete(inputData);
	},

};

export default mod;
