import * as EMTDocumentModel from './model.js';
import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const kType = 'emt_document';
const kCollection = 'emt_documents';

export const EMTDocumentStoragePath = function(inputData) {
	return `${ kCollection }/${ inputData || '' }`;
};

export const EMTDocumentStorage = function (privateClient, publicClient, changeDelegate) {
	privateClient.on('change', function (event) {
		if (!changeDelegate) {
			return;
		}
		
		if (event.relativePath.indexOf(kCollection) !== 0) {
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

	return {
		EMTStorageCollection: kCollection,
		EMTStorageType: kType,
		EMTStorageModelErrors: Object.entries(EMTDocumentModel.EMTDocumentModelErrorsFor({}, {
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
		EMTStorageExports: {
			EMTStorageCache () {
				return privateClient.cache(EMTDocumentStoragePath());
			},
			EMTStorageList: function () {
				return privateClient.getAll(EMTDocumentStoragePath(), false);
			},
			EMTStorageWrite: async function (param1, param2) {
				await privateClient.storeObject(kType, `${ kCollection }/${ param1 }`, OLSKRemoteStorage.OLSKRemoteStoragePreJSONSchemaValidate(param2));
				return OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(param2);
			},
			EMTStorageRead: function (inputData) {
				return privateClient.getObject(`${ kCollection }/${ inputData }`);
			},
			EMTStorageDelete: function (inputData) {
				return privateClient.remove(`${ kCollection }/${ inputData }`);
			},
		},
	};
};
