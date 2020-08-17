import EMTDocumentModel from './model.js';
import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const mod = {

	EMTDocumentStorageCollectionName () {
		return 'emt_documents';
	},

	EMTDocumentStorageCollectionType () {
		return 'emt_document';
	},

	EMTDocumentStorageCollectionPath () {
		return mod.EMTDocumentStorageCollectionName() + '/';
	},

	EMTDocumentStorageFolderPath (inputData) {
		if (!inputData) {
			throw new Error('EMTErrorInputNotValid');
		}

		return mod.EMTDocumentStorageCollectionPath() + inputData + '/';
	},

	EMTDocumentStorageObjectPath (inputData) {
		if (!inputData) {
			throw new Error('EMTErrorInputNotValid');
		}

		return mod.EMTDocumentStorageFolderPath(inputData) + 'main';
	},

	EMTDocumentStorageMatch (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('EMTErrorInputNotValid');
		}

		return inputData === mod.EMTDocumentStorageObjectPath(inputData.split('/')[1]);
	},

	EMTDocumentStorageBuild (privateClient, publicClient, changeDelegate) {
		privateClient.on('change', function (event) {
			if (!changeDelegate) {
				return;
			}
			
			if (!mod.EMTDocumentStorageMatch(event.relativePath)) {
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

			async _EMTDocumentStorageWrite (inputData) {
				if (typeof inputData !== 'object' || inputData === null) {
					return Promise.reject(new Error('EMTErrorInputNotValid'));
				}

				let errors = EMTDocumentModel.EMTDocumentModelErrorsFor(inputData);
				if (errors) {
					return Promise.resolve({
						EMTErrors: errors,
					});
				}

				const inputCopy = OLSKRemoteStorage.OLSKRemoteStorageSafeCopy(inputData);

				await privateClient.storeObject(mod.EMTDocumentStorageCollectionType(), mod.EMTDocumentStorageObjectPath(inputCopy.EMTDocumentID), OLSKRemoteStorage.OLSKRemoteStoragePreJSONSchemaValidate(inputCopy));

				return Object.assign(inputData, OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(inputCopy));
			},

			async _EMTDocumentStorageList () {
				return (await Promise.all((await OLSKRemoteStorage.OLSKRemoteStorageListingRecursive(privateClient, mod.EMTDocumentStorageCollectionPath())).filter(mod.EMTDocumentStorageMatch).map(function (e) {
					return privateClient.getObject(e, false);
				}))).reduce(function (coll, item) {
					if (item) {
						coll[item.EMTDocumentID] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(item);
					}

					return coll;
				}, {});
			},
			
			_EMTDocumentStorageDelete (inputData) {
				if (EMTDocumentModel.EMTDocumentModelErrorsFor(inputData)) {
					throw new Error('EMTErrorInputNotValid');
				}

				return privateClient.remove(mod.EMTDocumentStorageObjectPath(inputData.EMTDocumentID));
			},
			
		};

		return {
			OLSKRemoteStorageCollectionName: mod.EMTDocumentStorageCollectionName(),
			OLSKRemoteStorageCollectionType: mod.EMTDocumentStorageCollectionType(),
			OLSKRemoteStorageCollectionModelErrors: Object.entries(EMTDocumentModel.EMTDocumentModelErrorsFor({}, {
				EMTOptionValidateIfNotPresent: true,
			})).map(function (e) {
				if (!Object.keys(EMTDocumentModel.EMTDocumentModelErrorsFor({})).includes(e[0])) {
					e[1].push('__RSOptional');
				}

				return e;
			}).reduce(function (coll, item) {
				coll[item[0]] = item[1];

				return coll;
			}, {}),
			OLSKRemoteStorageCollectionExports,
		};
	},

	EMTDocumentStorageWrite (storageClient, inputData) {
		return storageClient.emojitimer[mod.EMTDocumentStorageCollectionName()]._EMTDocumentStorageWrite(inputData);
	},

	EMTDocumentStorageList (storageClient) {
		return storageClient.emojitimer[mod.EMTDocumentStorageCollectionName()]._EMTDocumentStorageList();
	},

	EMTDocumentStorageDelete (storageClient, inputData) {
		return storageClient.emojitimer[mod.EMTDocumentStorageCollectionName()]._EMTDocumentStorageDelete(inputData);
	},

};

export default mod;
