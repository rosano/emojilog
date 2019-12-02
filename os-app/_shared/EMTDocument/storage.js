import * as EMTDocumentModel from './model.js';
import * as OLSKRemoteStorage from 'OLSKRemoteStorage';

const kType = 'emt_document';
const kCollection = 'emt_documents';

export const EMTDocumentStoragePath = function(inputData) {
	return `${ kCollection }/${ inputData || '' }`;
};

export const EMTDocumentStorage = function (privateClient, publicClient, changeDelegate) {
	privateClient.on('change', function (event) {
		if (!changeDelegate) {
			return;
		};
		
		if (event.relativePath.indexOf(kCollection) !== 0) {
			return;
		};

		const delegateMethod = OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateProperty(event);

		if (!delegateMethod) {
			return;
		};

		if (typeof changeDelegate[delegateMethod] !== 'function') {
			return console.warn(`${ delegateMethod } not function`);
		};

		changeDelegate[delegateMethod](EMTDocumentModel.EMTDocumentModelPostJSONParse(event[OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateInput(delegateMethod)]));
	});

	return {
		EMTStorageCollection: kCollection,
		EMTStorageType: kType,
		EMTStorageModelErrors: Object.entries(EMTDocumentModel.EMTDocumentModelErrorsFor({}, {
			EMTOptionValidateIfNotPresent: true,
		})).map(function (e) {
			if (Object.keys(EMTDocumentModel.EMTDocumentModelErrorsFor({})).indexOf(e[0]) === -1) {
				e[1].push('__RSOptional');
			};

			return e;
		}).reduce(function (coll, item) {
			coll[item[0]] = item[1];

			return coll;
		}, {}),
		EMTStorageExports: {
			init: function () {
				return privateClient.cache(EMTDocumentStoragePath());
			},
			listObjects: function () {
				return privateClient.getAll(EMTDocumentStoragePath(), false);
			},
			writeObject: async function (param1, param2) {
				await privateClient.storeObject(kType, `${ kCollection }/${ param1 }`, EMTDocumentModel.EMTDocumentModelPreJSONSchemaValidate(param2));
				return EMTDocumentModel.EMTDocumentModelPostJSONParse(param2);
			},
			readObject: function (inputData) {
				return privateClient.getObject(`${ kCollection }/${ inputData }`);
			},
			deleteObject: function (inputData) {
				return privateClient.remove(`${ kCollection }/${ inputData }`);
			},
		},
	};
};
