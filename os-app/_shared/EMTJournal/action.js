import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

import EMTJournalStorage from './storage.js';

const mod = {

	async EMTJournalActionCreate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('EMTErrorInputNotValid'));
		}

		const creationDate = new Date();

		return await EMTJournalStorage.EMTJournalStorageWrite(storageClient, Object.assign({
			EMTJournalID: uniqueID(),
			EMTJournalCreationDate: creationDate,
			EMTJournalModificationDate: creationDate,
		}, inputData));
	},

	async EMTJournalActionUpdate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('EMTErrorInputNotValid'));
		}

		return await EMTJournalStorage.EMTJournalStorageWrite(storageClient, Object.assign(inputData, {
			EMTJournalModificationDate: new Date(),
		}));
	},

	async EMTJournalActionDelete (storageClient, inputData) {
		return await EMTJournalStorage.EMTJournalStorageDelete(storageClient, inputData);
	},

	async EMTJournalActionList (storageClient) {
		return Object.values(await EMTJournalStorage.EMTJournalStorageList(storageClient));
	},
	
};
	
export default mod;
