import { EMTDocumentModelErrorsFor, EMTDocumentModelPostJSONParse } from './model.js';

export const EMTDocumentMetalWrite = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('EMTErrorInputNotValid'));
	}

	let errors = EMTDocumentModelErrorsFor(inputData);
	if (errors) {
		return Promise.resolve({
			EMTErrors: errors,
		});
	}

	return await storageClient.emojitimer.emt_documents.writeObject(inputData.EMTDocumentID, inputData);
};

export const EMTDocumentMetalRead = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('EMTErrorInputNotValid'));
	}

	return EMTDocumentModelPostJSONParse(await storageClient.emojitimer.emt_documents.readObject(inputData));
};

export const EMTDocumentMetalList = async function(storageClient) {
	let outputData = await storageClient.emojitimer.emt_documents.listObjects();

	for (let key in outputData) {
		EMTDocumentModelPostJSONParse(outputData[key]);
	}
	
	return outputData;
};

export const EMTDocumentMetalDelete = async function(storageClient, inputData) {
	if (typeof inputData !== 'string') {
		return Promise.reject(new Error('EMTErrorInputNotValid'));
	}

	return await storageClient.emojitimer.emt_documents.deleteObject(inputData);
};
