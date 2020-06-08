import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

export const EMTStorageModule = function (inputData) {
	return {
		name: 'emojitimer',
		builder: function(privateClient, publicClient) {
			return {
				exports: inputData.reduce(function (coll, item) {
					let storage = item.EMTCollectionStorageGenerator(privateClient, publicClient, item.EMTCollectionChangeDelegate);

					privateClient.declareType(storage.EMTStorageType, OLSKRemoteStorage.OLSKRemoteStorageJSONSchema(storage.EMTStorageModelErrors));

					coll[storage.EMTStorageCollection] = storage.EMTStorageExports;

					return coll;
				}, {}),
			};
		},
	};
};
