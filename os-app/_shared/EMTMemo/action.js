import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

import EMTMemoStorage from './storage.js';
import EMTMemoModel from './model.js';
import EMTJournalModel from '../EMTJournal/model.js';

const mod = {

	async EMTMemoActionCreate(storageClient, param1, param2) {
		if (typeof param1 !== 'object' || param1 === null) {
			return Promise.reject(new Error('EMTErrorInputNotValid'));
		}

		if (EMTJournalModel.EMTJournalModelErrorsFor(param2)) {
			return Promise.reject(new Error('EMTErrorInputNotValid'));
		}

		const creationDate = new Date();

		return await EMTMemoStorage.EMTMemoStorageWrite(storageClient, Object.assign({
			EMTMemoID: uniqueID(),
			EMTMemoJournalID: param2.EMTJournalID,
			EMTMemoCreationDate: creationDate,
			EMTMemoModificationDate: creationDate,
		}, param1), param2);
	},

	async EMTMemoActionUpdate(storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('EMTErrorInputNotValid'));
		}

		return await EMTMemoStorage.EMTMemoStorageWrite(storageClient, Object.assign(inputData, {
			EMTMemoModificationDate: new Date(),
		}));
	},

	async EMTMemoActionDelete(storageClient, inputData) {
		return await EMTMemoStorage.EMTMemoStorageDelete(storageClient, inputData);
	},

	async EMTMemoActionList(storageClient, inputData) {
		return Object.values(await EMTMemoStorage.EMTMemoStorageList(storageClient, inputData));
	},

};

export default mod;
