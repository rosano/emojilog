import { factory } from 'ulid';
const uniqueID = factory();

import EMLMemoStorage from './storage.js';
import EMLMemoModel from './model.js';
import EMLJournalModel from '../EMLJournal/model.js';

const mod = {

	async EMLMemoActionCreate(storageClient, param1, param2) {
		if (typeof param1 !== 'object' || param1 === null) {
			return Promise.reject(new Error('EMLErrorInputNotValid'));
		}

		if (EMLJournalModel.EMLJournalModelErrorsFor(param2)) {
			return Promise.reject(new Error('EMLErrorInputNotValid'));
		}

		const creationDate = new Date();

		return await EMLMemoStorage.EMLMemoStorageWrite(storageClient, Object.assign({
			EMLMemoID: uniqueID(),
			EMLMemoJournalID: param2.EMLJournalID,
			EMLMemoCreationDate: creationDate,
			EMLMemoModificationDate: creationDate,
		}, param1), param2);
	},

	async EMLMemoActionUpdate(storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('EMLErrorInputNotValid'));
		}

		return await EMLMemoStorage.EMLMemoStorageWrite(storageClient, Object.assign(inputData, {
			EMLMemoModificationDate: new Date(),
		}));
	},

	async EMLMemoActionDelete(storageClient, inputData) {
		return await EMLMemoStorage.EMLMemoStorageDelete(storageClient, inputData);
	},

	async EMLMemoActionList(storageClient, inputData) {
		return Object.values(await EMLMemoStorage.EMLMemoStorageList(storageClient, inputData));
	},

};

export default mod;
