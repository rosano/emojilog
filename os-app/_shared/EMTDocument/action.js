import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

import EMTDocumentMetal from './metal.js';

const mod = {

	async EMTDocumentActionCreate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('EMTErrorInputNotValid'));
		}

		const creationDate = new Date();

		return await EMTDocumentMetal.EMTDocumentMetalWrite(storageClient, Object.assign({
			EMTDocumentID: uniqueID(),
			EMTDocumentCreationDate: creationDate,
			EMTDocumentModificationDate: creationDate,
		}, inputData));
	},

	async EMTDocumentActionUpdate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('EMTErrorInputNotValid'));
		}

		return await EMTDocumentMetal.EMTDocumentMetalWrite(storageClient, Object.assign(inputData, {
			EMTDocumentModificationDate: new Date(),
		}));
	},

	async EMTDocumentActionDelete (storageClient, inputData) {
		return await EMTDocumentMetal.EMTDocumentMetalDelete(storageClient, inputData);
	},

	async EMTDocumentActionList (storageClient) {
		return Object.values(await EMTDocumentMetal.EMTDocumentMetalList(storageClient));
	},
	
};
	
export default mod;
