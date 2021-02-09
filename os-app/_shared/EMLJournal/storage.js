import EMLJournalModel from './model.js';
import OLSKRemoteStorage from 'OLSKRemoteStorage';

const mod = {

	EMLJournalStorageCollectionName () {
		return 'eml_journals';
	},

	EMLJournalStorageCollectionPath () {
		return mod.EMLJournalStorageCollectionName() + '/';
	},

	EMLJournalStorageFolderPath (inputData) {
		if (!inputData) {
			throw new Error('EMLErrorInputNotValid');
		}

		return mod.EMLJournalStorageCollectionPath() + inputData + '/';
	},

	EMLJournalStorageObjectPath (inputData) {
		if (!inputData) {
			throw new Error('EMLErrorInputNotValid');
		}

		return mod.EMLJournalStorageFolderPath(inputData) + 'main';
	},

	EMLJournalStorageMatch (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('EMLErrorInputNotValid');
		}

		return inputData === mod.EMLJournalStorageObjectPath(inputData.split('/')[1]);
	},

	EMLJournalStorageBuild (privateClient, publicClient, changeDelegate) {
		privateClient.on('change', function (event) {
			if (!changeDelegate) {
				return;
			}
			
			if (!mod.EMLJournalStorageMatch(event.relativePath)) {
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

			async _EMLJournalStorageWrite (inputData) {
				if (typeof inputData !== 'object' || inputData === null) {
					return Promise.reject(new Error('EMLErrorInputNotValid'));
				}

				let errors = EMLJournalModel.EMLJournalModelErrorsFor(inputData);
				if (errors) {
					return Promise.resolve({
						EMLErrors: errors,
					});
				}

				try {
					return OLSKRemoteStorage.OLSKRemoteStorageWriteObject(privateClient, mod.EMLJournalStorageObjectPath(inputData.EMLJournalID), inputData);
				} catch (e) {
					return Promise.reject(e);
				}
			},

			async _EMLJournalStorageList () {
				return (await Promise.all((await OLSKRemoteStorage.OLSKRemoteStorageListingRecursive(privateClient, mod.EMLJournalStorageCollectionPath())).filter(mod.EMLJournalStorageMatch).map(function (e) {
					return privateClient.getObject(e, false);
				}))).reduce(function (coll, item) {
					if (item) {
						coll[item.EMLJournalID] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(item);
					}

					return coll;
				}, {});
			},
			
			_EMLJournalStorageDelete (inputData) {
				if (EMLJournalModel.EMLJournalModelErrorsFor(inputData)) {
					throw new Error('EMLErrorInputNotValid');
				}

				return privateClient.remove(mod.EMLJournalStorageObjectPath(inputData.EMLJournalID));
			},
			
		};

		return {
			OLSKRemoteStorageCollectionName: mod.EMLJournalStorageCollectionName(),
			OLSKRemoteStorageCollectionExports,
		};
	},

	EMLJournalStorageWrite (storageClient, inputData) {
		return storageClient.emojilog[mod.EMLJournalStorageCollectionName()]._EMLJournalStorageWrite(inputData);
	},

	EMLJournalStorageList (storageClient) {
		return storageClient.emojilog[mod.EMLJournalStorageCollectionName()]._EMLJournalStorageList();
	},

	EMLJournalStorageDelete (storageClient, inputData) {
		return storageClient.emojilog[mod.EMLJournalStorageCollectionName()]._EMLJournalStorageDelete(inputData);
	},

};

export default mod;
