import * as EMTDocumentMetal from './metal.js';
import { factory, detectPrng } from 'ulid';
const uniqueID = typeof require === 'undefined' && navigator.appName === 'Zombie' ? factory(detectPrng(true)) : factory();

export const EMTDocumentActionCreate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('EMTErrorInputNotValid'));
	}

	let creationDate = new Date();

	return await EMTDocumentMetal.EMTDocumentMetalWrite(storageClient, Object.assign(inputData, {
		EMTDocumentID: uniqueID(),
		EMTDocumentCreationDate: creationDate,
		EMTDocumentModificationDate: creationDate,
	}));
};

export const EMTDocumentActionRead = async function(storageClient, inputData) {
	return await EMTDocumentMetal.EMTDocumentMetalRead(storageClient, inputData);
};

export const EMTDocumentActionUpdate = async function(storageClient, inputData) {
	if (typeof inputData !== 'object' || inputData === null) {
		return Promise.reject(new Error('EMTErrorInputNotValid'));
	}

	return await EMTDocumentMetal.EMTDocumentMetalWrite(storageClient, Object.assign(inputData, {
		EMTDocumentModificationDate: new Date(),
	}));
};

export const EMTDocumentActionDelete = async function(storageClient, inputData) {
	return await EMTDocumentMetal.EMTDocumentMetalDelete(storageClient, inputData);
};

export const EMTDocumentActionList = async function(storageClient) {
	return Object.values(await EMTDocumentMetal.EMTDocumentMetalList(storageClient));
};
