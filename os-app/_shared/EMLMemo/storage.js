import EMLJournalStorage from '../EMLJournal/storage.js';
import EMLMemoModel from './model.js';
import OLSKRemoteStorage from 'OLSKRemoteStorage';

const uFlatten = function (inputData) {
	return [].concat.apply([], inputData);
};

const mod = {

	uFakeJournal(inputData) {
		return {
			EMLJournalID: inputData.split('/')[1],
			EMLJournalName: '',
			EMLJournalCreationDate: new Date(),
			EMLJournalModificationDate: new Date(),
		};
	},

	uFakeMemo(inputData) {
		return {
			EMLMemoID: inputData.split('/')[4],
			EMLMemoJournalID: inputData.split('/')[1],
			EMLMemoCreationDate: new Date(inputData.split('/')[3]),
			EMLMemoModificationDate: new Date(),
			EMLMemoEventDate: new Date(),
			EMLMemoNotes: '',
		};
	},

	EMLMemoStorageCollectionName() {
		return 'eml_memos';
	},

	EMLMemoStorageCollectionPath(inputData) {
		return EMLJournalStorage.EMLJournalStorageFolderPath(inputData) + mod.EMLMemoStorageCollectionName() + '/';
	},

	EMLMemoStorageFolderPath(inputData) {
		if (EMLMemoModel.EMLMemoModelErrorsFor(inputData)) {
			throw new Error('EMLErrorInputNotValid');
		}

		return mod.EMLMemoStorageCollectionPath(inputData.EMLMemoJournalID) + inputData.EMLMemoCreationDate.toJSON().split('T').shift() + '/' + inputData.EMLMemoID + '/';
	},

	EMLMemoStorageObjectPath(inputData) {
		return mod.EMLMemoStorageFolderPath(inputData) + 'main';
	},

	EMLMemoStorageMatch(inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('EMLErrorInputNotValid');
		}
		
		if (inputData.split('/').length < 4) {
			return false;
		}

		return inputData === mod.EMLMemoStorageObjectPath(mod.uFakeMemo(inputData), mod.uFakeJournal(inputData));
	},

	EMLMemoStorageBuild(privateClient, publicClient, changeDelegate) {
		privateClient.on('change', function (event) {
			if (!changeDelegate) {
				return;
			}

			if (!mod.EMLMemoStorageMatch(event.relativePath)) {
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

			async _EMLMemoStorageWrite(inputData) {
				if (typeof inputData !== 'object' || inputData === null) {
					return Promise.reject(new Error('EMLErrorInputNotValid'));
				}

				let errors = EMLMemoModel.EMLMemoModelErrorsFor(inputData);
				if (errors) {
					return Promise.resolve({
						EMLErrors: errors,
					});
				}

				try {
					return OLSKRemoteStorage.OLSKRemoteStorageWriteObject(privateClient, mod.EMLMemoStorageObjectPath(inputData), inputData);
				} catch (e) {
					return Promise.reject(e);
				}
			},

			async _EMLMemoStorageList(inputData) {
				return Object.entries(await OLSKRemoteStorage.OLSKRemoteStorageObjectsRecursive(privateClient, mod.EMLMemoStorageCollectionPath(inputData.EMLJournalID))).reduce(function (coll, item) {
					if (mod.EMLMemoStorageMatch(item[0])) {
						coll[item[1].EMLMemoID] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(item[1]);
					}

					return coll;
				}, {});
				return (await Promise.all((await OLSKRemoteStorage.OLSKRemoteStorageListingRecursive(privateClient, mod.EMLMemoStorageCollectionPath(inputData.EMLJournalID))).filter(mod.EMLMemoStorageMatch).map(function (e) {
					return privateClient.getObject(e, false);
				}))).reduce(function (coll, item) {
					if (item) {
						coll[item.EMLMemoID] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(item);
					}

					return coll;
				}, {});
			},

			async _EMLMemoStorageDelete(inputData) {
				if (EMLMemoModel.EMLMemoModelErrorsFor(inputData)) {
					return Promise.reject(new Error('EMLErrorInputNotValid'));
				}

				return (await Promise.all((await OLSKRemoteStorage.OLSKRemoteStorageListingRecursive(privateClient, mod.EMLMemoStorageFolderPath(inputData))).map(function (path) {
					return privateClient.remove(path);
				}))).pop();
			},

		};

		return {
			OLSKRemoteStorageCollectionName: mod.EMLMemoStorageCollectionName(),
			OLSKRemoteStorageCollectionExports,
		};
	},

	EMLMemoStorageWrite(storageClient, inputData) {
		return storageClient.emojilog[mod.EMLMemoStorageCollectionName()]._EMLMemoStorageWrite(inputData);
	},

	EMLMemoStorageList(storageClient, inputData) {
		return storageClient.emojilog[mod.EMLMemoStorageCollectionName()]._EMLMemoStorageList(inputData);
	},

	EMLMemoStorageDelete(storageClient, inputData) {
		return storageClient.emojilog[mod.EMLMemoStorageCollectionName()]._EMLMemoStorageDelete(inputData);
	},

};

export default mod;
