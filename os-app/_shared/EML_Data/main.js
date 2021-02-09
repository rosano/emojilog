import OLSKRemoteStorage from 'OLSKRemoteStorage';

import EMLJournalAction from '../EMLJournal/action.js';
import EMLMemoAction from '../EMLMemo/action.js';

const mod = {

	EML_DataModule (inputData, options) {
		return OLSKRemoteStorage.OLSKRemoteStorageDataModuleGenerator('emojilog', options)(inputData);
	},

	EML_DataImport (storageClient, inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('EMLErrorInputNotValid');
		}

		if (!inputData.length) {
			throw new Error('EMLErrorInputNotValid');
		}

		return Promise.all(inputData.map(async function (e) {
			if (!Array.isArray(e.$EMLJournalMemos)) {
				return Promise.reject(new Error('EMLErrorInputNotValid'));
			}

			const journal = await EMLJournalAction.EMLJournalActionCreate(storageClient, e);

			if (journal.EMLErrors) {
				// console.log('EMLErrorInputNotValid', journal.EMLErrors, e);
				return Promise.reject(new Error('EMLErrorInputNotValid'));
			}

			await Promise.all(e.$EMLJournalMemos.map(async function (e) {
				const memo = await EMLMemoAction.EMLMemoActionCreate(storageClient, e, journal);

				if (memo.EMLErrors) {
					// console.log('EMLErrorInputNotValid', memo.EMLErrors, e);
					return Promise.reject(new Error('EMLErrorInputNotValid'));
				}

				return memo;
			}));

			delete journal.$EMLJournalMemos;

			return journal;
		}));
	},

};

export default mod;
