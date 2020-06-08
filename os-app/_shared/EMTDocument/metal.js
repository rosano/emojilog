import * as EMTDocumentModel from './model.js';
import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

export const EMTDocumentMetalWrite = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('EMTErrorInputNotValid'));
	}

	let errors = EMTDocumentModel.EMTDocumentModelErrorsFor(inputData);
	if (errors) {
		return Promise.resolve({
			EMTErrors: errors,
		});
	}

	return await storageClient.emojitimer.emt_documents.EMTStorageWrite(inputData.EMTDocumentID, inputData);
};

export const EMTDocumentMetalRead = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('EMTErrorInputNotValid'));
	}

	return OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(await storageClient.emojitimer.emt_documents.EMTStorageRead(inputData));
};

export const EMTDocumentMetalList = async function(storageClient) {
	let outputData = await storageClient.emojitimer.emt_documents.EMTStorageList();

	for (let key in outputData) {
		OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(outputData[key]);
	}
	
	return outputData;
};

export const EMTDocumentMetalDelete = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('EMTErrorInputNotValid'));
	}

	return await storageClient.emojitimer.emt_documents.EMTStorageDelete(inputData);
};
