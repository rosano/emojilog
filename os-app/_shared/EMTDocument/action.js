import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

import EMTDocumentStorage from './storage.js';

const mod = {

	async EMTDocumentActionCreate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('EMTErrorInputNotValid'));
		}

		const creationDate = new Date();

		return await EMTDocumentStorage.EMTDocumentStorageWrite(storageClient, Object.assign({
			EMTDocumentID: uniqueID(),
			EMTDocumentCreationDate: creationDate,
			EMTDocumentModificationDate: creationDate,
		}, inputData));
	},

	async EMTDocumentActionUpdate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('EMTErrorInputNotValid'));
		}

		return await EMTDocumentStorage.EMTDocumentStorageWrite(storageClient, Object.assign(inputData, {
			EMTDocumentModificationDate: new Date(),
		}));
	},

	async EMTDocumentActionDelete (storageClient, inputData) {
		return await EMTDocumentStorage.EMTDocumentStorageDelete(storageClient, inputData);
	},

	async EMTDocumentActionList (storageClient) {
		return Object.values(await EMTDocumentStorage.EMTDocumentStorageList(storageClient));
	},
	
};
	
export default mod;
