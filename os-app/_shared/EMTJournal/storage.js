import EMTJournalModel from './model.js';
import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const mod = {

	EMTJournalStorageCollectionName () {
		return 'emt_documents';
	},

	EMTJournalStorageCollectionPath () {
		return mod.EMTJournalStorageCollectionName() + '/';
	},

	EMTJournalStorageFolderPath (inputData) {
		if (!inputData) {
			throw new Error('EMTErrorInputNotValid');
		}

		return mod.EMTJournalStorageCollectionPath() + inputData + '/';
	},

	EMTJournalStorageObjectPath (inputData) {
		if (!inputData) {
			throw new Error('EMTErrorInputNotValid');
		}

		return mod.EMTJournalStorageFolderPath(inputData) + 'main';
	},

	EMTJournalStorageMatch (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('EMTErrorInputNotValid');
		}

		return inputData === mod.EMTJournalStorageObjectPath(inputData.split('/')[1]);
	},

	EMTJournalStorageBuild (privateClient, publicClient, changeDelegate) {
		privateClient.on('change', function (event) {
			if (!changeDelegate) {
				return;
			}
			
			if (!mod.EMTJournalStorageMatch(event.relativePath)) {
				return;
			}

			const delegateMethod = OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateProperty(event);

			if (!delegateMethod) {
				return;
			}

			if (typeof changeDelegate[delegateMethod] !== 'function') {
				return console.warn(`${ delegateMethod } not function`);
			}

			changeDelegate[delegateMethod](OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(event[OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateInput(delegateMethod)]));
		});

		const OLSKRemoteStorageCollectionExports = {

			async _EMTJournalStorageWrite (inputData) {
				if (typeof inputData !== 'object' || inputData === null) {
					return Promise.reject(new Error('EMTErrorInputNotValid'));
				}

				let errors = EMTJournalModel.EMTJournalModelErrorsFor(inputData);
				if (errors) {
					return Promise.resolve({
						EMTErrors: errors,
					});
				}

				try {
					return OLSKRemoteStorage.OLSKRemoteStorageWriteObject(privateClient, mod.EMTJournalStorageObjectPath(inputData.EMTJournalID), inputData);
				} catch (e) {
					return Promise.reject(e);
				}
			},

			async _EMTJournalStorageList () {
				return (await Promise.all((await OLSKRemoteStorage.OLSKRemoteStorageListingRecursive(privateClient, mod.EMTJournalStorageCollectionPath())).filter(mod.EMTJournalStorageMatch).map(function (e) {
					return privateClient.getObject(e, false);
				}))).reduce(function (coll, item) {
					if (item) {
						coll[item.EMTJournalID] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(item);
					}

					return coll;
				}, {});
			},
			
			_EMTJournalStorageDelete (inputData) {
				if (EMTJournalModel.EMTJournalModelErrorsFor(inputData)) {
					throw new Error('EMTErrorInputNotValid');
				}

				return privateClient.remove(mod.EMTJournalStorageObjectPath(inputData.EMTJournalID));
			},
			
		};

		return {
			OLSKRemoteStorageCollectionName: mod.EMTJournalStorageCollectionName(),
			OLSKRemoteStorageCollectionExports,
		};
	},

	EMTJournalStorageWrite (storageClient, inputData) {
		return storageClient.emojitimer[mod.EMTJournalStorageCollectionName()]._EMTJournalStorageWrite(inputData);
	},

	EMTJournalStorageList (storageClient) {
		return storageClient.emojitimer[mod.EMTJournalStorageCollectionName()]._EMTJournalStorageList();
	},

	EMTJournalStorageDelete (storageClient, inputData) {
		return storageClient.emojitimer[mod.EMTJournalStorageCollectionName()]._EMTJournalStorageDelete(inputData);
	},

};

export default mod;
