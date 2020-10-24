import OLSKRemoteStorage from 'OLSKRemoteStorage';

import EMTJournalAction from '../EMTJournal/action.js';
import EMTMemoAction from '../EMTMemo/action.js';

const mod = {

	EMT_DataModule (inputData, options) {
		return OLSKRemoteStorage.OLSKRemoteStorageDataModuleGenerator('emojitimer', options)(inputData);
	},

	EMT_DataImport (storageClient, inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('EMTErrorInputNotValid');
		}

		if (!inputData.length) {
			throw new Error('EMTErrorInputNotValid');
		}

		return Promise.all(inputData.map(async function (e) {
			if (!Array.isArray(e.$EMTJournalMemos)) {
				return Promise.reject(new Error('EMTErrorInputNotValid'));
			}

			const journal = await EMTJournalAction.EMTJournalActionCreate(storageClient, e);

			if (journal.EMTErrors) {
				// console.log('EMTErrorInputNotValid', journal.EMTErrors, e);
				return Promise.reject(new Error('EMTErrorInputNotValid'));
			}

			await Promise.all(e.$EMTJournalMemos.map(async function (e) {
				const memo = await EMTMemoAction.EMTMemoActionCreate(storageClient, e, journal);

				if (memo.EMTErrors) {
					// console.log('EMTErrorInputNotValid', memo.EMTErrors, e);
					return Promise.reject(new Error('EMTErrorInputNotValid'));
				}

				return memo;
			}));

			delete journal.$EMTJournalMemos;

			return journal;
		}));
	},

};

export default mod;
