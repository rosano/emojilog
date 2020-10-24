import EMTJournalStorage from '../EMTJournal/storage.js';
import EMTMemoModel from './model.js';
import OLSKRemoteStorage from 'OLSKRemoteStorage';

const uFlatten = function (inputData) {
	return [].concat.apply([], inputData);
};

const mod = {

	uFakeJournal(inputData) {
		return {
			EMTJournalID: inputData.split('/')[1],
			EMTJournalName: '',
			EMTJournalCreationDate: new Date(),
			EMTJournalModificationDate: new Date(),
		};
	},

	uFakeMemo(inputData) {
		return {
			EMTMemoID: inputData.split('/')[4],
			EMTMemoJournalID: inputData.split('/')[1],
			EMTMemoCreationDate: new Date(inputData.split('/')[3]),
			EMTMemoModificationDate: new Date(),
			EMTMemoEventDate: new Date(),
			EMTMemoNotes: '',
		};
	},

	EMTMemoStorageCollectionName() {
		return 'emt_memos';
	},

	EMTMemoStorageCollectionPath(inputData) {
		return EMTJournalStorage.EMTJournalStorageFolderPath(inputData) + mod.EMTMemoStorageCollectionName() + '/';
	},

	EMTMemoStorageFolderPath(inputData) {
		if (EMTMemoModel.EMTMemoModelErrorsFor(inputData)) {
			throw new Error('EMTErrorInputNotValid');
		}

		return mod.EMTMemoStorageCollectionPath(inputData.EMTMemoJournalID) + inputData.EMTMemoCreationDate.toJSON().split('T').shift() + '/' + inputData.EMTMemoID + '/';
	},

	EMTMemoStorageObjectPath(inputData) {
		return mod.EMTMemoStorageFolderPath(inputData) + 'main';
	},

	EMTMemoStorageMatch(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('EMTErrorInputNotValid');
		}
		
		if (inputData.split('/').length < 4) {
			return false;
		}

		return inputData === mod.EMTMemoStorageObjectPath(mod.uFakeMemo(inputData), mod.uFakeJournal(inputData));
	},

	EMTMemoStorageBuild(privateClient, publicClient, changeDelegate) {
		privateClient.on('change', function (event) {
			if (!changeDelegate) {
				return;
			}

			if (!mod.EMTMemoStorageMatch(event.relativePath)) {
				return;
			}

			const delegateMethod = OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateProperty(event);

			if (!delegateMethod) {
				return;
			}

			if (typeof changeDelegate[delegateMethod] !== 'function') {
				return console.warn(`${ delegateMethod } not function`);
			}

			changeDelegate[delegateMethod](OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateData(delegateMethod, event)));
		});

		const OLSKRemoteStorageCollectionExports = {

			async _EMTMemoStorageWrite(inputData) {
				if (typeof inputData !== 'object' || inputData === null) {
					return Promise.reject(new Error('EMTErrorInputNotValid'));
				}

				let errors = EMTMemoModel.EMTMemoModelErrorsFor(inputData);
				if (errors) {
					return Promise.resolve({
						EMTErrors: errors,
					});
				}

				try {
					return OLSKRemoteStorage.OLSKRemoteStorageWriteObject(privateClient, mod.EMTMemoStorageObjectPath(inputData), inputData);
				} catch (e) {
					return Promise.reject(e);
				}
			},

			async _EMTMemoStorageList(inputData) {
				return Object.entries(await OLSKRemoteStorage.OLSKRemoteStorageObjectsRecursive(privateClient, mod.EMTMemoStorageCollectionPath(inputData.EMTJournalID))).reduce(function (coll, item) {
					if (mod.EMTMemoStorageMatch(item[0])) {
						coll[item[1].EMTMemoID] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(item[1]);
					}

					return coll;
				}, {});
				return (await Promise.all((await OLSKRemoteStorage.OLSKRemoteStorageListingRecursive(privateClient, mod.EMTMemoStorageCollectionPath(inputData.EMTJournalID))).filter(mod.EMTMemoStorageMatch).map(function (e) {
					return privateClient.getObject(e, false);
				}))).reduce(function (coll, item) {
					if (item) {
						coll[item.EMTMemoID] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(item);
					}

					return coll;
				}, {});
			},

			async _EMTMemoStorageDelete(inputData) {
				if (EMTMemoModel.EMTMemoModelErrorsFor(inputData)) {
					return Promise.reject(new Error('EMTErrorInputNotValid'));
				}

				return (await Promise.all((await OLSKRemoteStorage.OLSKRemoteStorageListingRecursive(privateClient, mod.EMTMemoStorageFolderPath(inputData))).map(function (path) {
					return privateClient.remove(path);
				}))).pop();
			},

		};

		return {
			OLSKRemoteStorageCollectionName: mod.EMTMemoStorageCollectionName(),
			OLSKRemoteStorageCollectionExports,
		};
	},

	EMTMemoStorageWrite(storageClient, inputData) {
		return storageClient.emojitimer[mod.EMTMemoStorageCollectionName()]._EMTMemoStorageWrite(inputData);
	},

	EMTMemoStorageList(storageClient, inputData) {
		return storageClient.emojitimer[mod.EMTMemoStorageCollectionName()]._EMTMemoStorageList(inputData);
	},

	EMTMemoStorageDelete(storageClient, inputData) {
		return storageClient.emojitimer[mod.EMTMemoStorageCollectionName()]._EMTMemoStorageDelete(inputData);
	},

};

export default mod;
