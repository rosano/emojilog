import { factory } from 'ulid';
const uniqueID = factory();

import EMLJournalStorage from './storage.js';
import EMLMemoAction from '../EMLMemo/action.js';

const mod = {

	async EMLJournalActionCreate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('EMLErrorInputNotValid'));
		}

		const creationDate = new Date();

		return await EMLJournalStorage.EMLJournalStorageWrite(storageClient, Object.assign({
			EMLJournalID: uniqueID(),
			EMLJournalCreationDate: creationDate,
			EMLJournalModificationDate: creationDate,
		}, inputData));
	},

	async EMLJournalActionUpdate (storageClient, inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			return Promise.reject(new Error('EMLErrorInputNotValid'));
		}

		return await EMLJournalStorage.EMLJournalStorageWrite(storageClient, Object.assign(inputData, {
			EMLJournalModificationDate: new Date(),
		}));
	},

	async EMLJournalActionDelete (storageClient, inputData) {
		await Promise.all((await EMLMemoAction.EMLMemoActionList(storageClient, inputData)).map(function (e) {
			return EMLMemoAction.EMLMemoActionDelete(storageClient, e, inputData);
		}));
		
		return await EMLJournalStorage.EMLJournalStorageDelete(storageClient, inputData);
	},

	async EMLJournalActionList (storageClient) {
		return Object.values(await EMLJournalStorage.EMLJournalStorageList(storageClient));
	},
	
};
	
export default mod;
