import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

import * as EMTStorageClient from '../_shared/EMTStorageClient/main.js';
import { EMTStorageModule } from '../_shared/EMTStorageModule/main.js';
import { EMTDocumentStorage } from '../_shared/EMTDocument/storage.js';
import { EMTDocumentActionList } from '../_shared/EMTDocument/action.js';

import EMTTrackLogic from './ui-logic.js';

import { writable } from 'svelte/store';

export const DocumentsAllStore = writable([]);
export const DocumentSelectedStore = writable(null);
export const EMTPersistenceIsLoading = writable(true);

let _DocumentSelected;
DocumentSelectedStore.subscribe(function (val) {
	_DocumentSelected = val;
});
export const storageClient = EMTStorageClient.EMTStorageClient({
	modules: [
		EMTStorageModule([
			EMTDocumentStorage,
			].map(function (e) {
				return {
					EMTCollectionStorageGenerator: e,
					EMTCollectionChangeDelegate: e === EMTDocumentStorage ? {
						OLSKChangeDelegateCreate: function (inputData) {
							// console.log('OLSKChangeDelegateCreate', inputData);

							DocumentsAllStore.update(function (val) {
								return val.filter(function (e) { // @Hotfix Dropbox sending DelegateAdd
									return e.EMTDocumentID !== inputData.EMTDocumentID;
								}).concat(inputData).sort(EMTTrackLogic.EMTTrackSort);
							});
						},
						OLSKChangeDelegateUpdate: function (inputData) {
							// console.log('OLSKChangeDelegateUpdate', inputData);

							if (_DocumentSelected && (_DocumentSelected.EMTDocumentID === inputData.EMTDocumentID)) {
								DocumentSelectedStore.update(function (val) {
									return Object.assign(val, inputData);
								});
							}

							DocumentsAllStore.update(function (val) {
								return val.map(function (e) {
									return Object.assign(e, e.EMTDocumentID === inputData.EMTDocumentID ? inputData : {});
								});
							});
						},
						OLSKChangeDelegateDelete: function (inputData) {
							// console.log('OLSKChangeDelegateDelete', inputData);

							if (_DocumentSelected && (_DocumentSelected.EMTDocumentID === inputData.EMTDocumentID)) {
								DocumentSelectedStore.set(null);
							}

							DocumentsAllStore.update(function (val) {
								return val.filter(function (e) {
									return e.EMTDocumentID !== inputData.EMTDocumentID;
								});
							});
						},
					} : null,
				}
			})),
	],
	OLSKPatchRemoteStorageAuthRedirectURI: OLSK_TESTING_BEHAVIOUR() ? undefined : window.location.origin + window.OLSKCanonicalFor('EMTTrackRoute'),
});

let remoteStorage = storageClient.remoteStorage;
remoteStorage.setApiKeys(window.OLSKPublicConstants('EMTDropboxAppKey') ? {
	dropbox: window.atob(window.OLSKPublicConstants('EMTDropboxAppKey')),
	googledrive: window.atob(window.OLSKPublicConstants('EMTGoogleClientKey')),
} : {});

remoteStorage.on('ready', async () => {
	if (!OLSK_TESTING_BEHAVIOUR()) {
		console.debug('ready', arguments);
	}


	await remoteStorage.emojitimer.emt_documents.init();
	DocumentsAllStore.set((await EMTDocumentActionList(storageClient)).sort(EMTTrackLogic.EMTTrackSort));


	EMTPersistenceIsLoading.set(false);
	// setupFinalize(); remove loading class
});

(function SetupStorageClientLogging() {
	remoteStorage.on('not-connected', () => {
		if (!OLSK_TESTING_BEHAVIOUR()) {
			console.debug('not-connected', arguments);
		}
	});

	remoteStorage.on('disconnected', () => {
		if (!OLSK_TESTING_BEHAVIOUR()) {
			console.debug('disconnected', arguments);
		}
	});

	remoteStorage.on('connected', () => {
		if (!OLSK_TESTING_BEHAVIOUR()) {
			console.debug('connected', arguments);
		}
	});

	remoteStorage.on('error', (error) => {
		if (!OLSK_TESTING_BEHAVIOUR()) {
			console.debug('error', error);
		}
	});

	remoteStorage.on('network-offline', () => {
		if (!OLSK_TESTING_BEHAVIOUR()) {
			console.debug('network-offline', arguments);
		}
	});

	remoteStorage.on('network-online', () => {
		if (!OLSK_TESTING_BEHAVIOUR()) {
			console.debug('network-online', arguments);
		}
	});

	remoteStorage.on('sync-done', () => {
		if (!OLSK_TESTING_BEHAVIOUR()) {
			console.debug('sync-done', arguments);
		}
	});
})();
