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

			async EMTStorageList () {
				return (await Promise.all(Object.keys(await privateClient.getAll(mod.EMTDocumentStorageCollectionPath(), false)).map(function (e) {
					return privateClient.getObject(mod.EMTDocumentStorageObjectPath(e.slice(0, -1)), false);
				}))).reduce(function (coll, item) {
					if (item) {
						coll[item.EMTDocumentID] = item;
					}

					return coll;
				}, {});
			},

			async EMTStorageWrite (inputData) {
				await privateClient.storeObject(mod.EMTDocumentStorageCollectionType(), mod.EMTDocumentStorageObjectPath(inputData.EMTDocumentID), OLSKRemoteStorage.OLSKRemoteStoragePreJSONSchemaValidate(inputData));
				return OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(inputData);
			},
			
			EMTStorageDelete (inputData) {
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

};

export default mod;
