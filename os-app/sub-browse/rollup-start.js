import RollupStart from './main.svelte';

import EMT_Data from '../_shared/EMT_Data/main.js';
import EMTMemoStorage from '../_shared/EMTMemo/storage.js';
import * as RemoteStoragePackage from 'remotestoragejs';
const RemoteStorage = RemoteStoragePackage.default || RemoteStoragePackage;
import * as OLSKRemoteStoragePackage from 'OLSKRemoteStorage';
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;

const mod = {

	_ValueStorageClient: undefined,

	// SETUP

	SetupEverything() {
		mod.SetupStorageClient();
	},

	SetupStorageClient() {
		const storageModule = EMT_Data.EMT_DataModule([
			EMTMemoStorage.EMTMemoStorageBuild,
		]);
		
		mod._ValueStorageClient = new RemoteStorage({ modules: [ storageModule ] });

		mod._ValueStorageClient.access.claim(storageModule.name, 'rw');

		mod._ValueStorageClient.FakeStorageClient = true;
	},

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		mod.SetupEverything();
	},

};

mod.LifecycleModuleDidLoad();

const EMTBrowse = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMTBrowseStorageClient: mod._ValueStorageClient,
		EMTBrowseDispatchCreate: (function _EMTBrowseDispatchCreate(inputData) {
			window.TestEMTBrowseDispatchCreate.innerHTML = parseInt(window.TestEMTBrowseDispatchCreate.innerHTML) + 1;
			window.TestEMTBrowseDispatchCreateData.innerHTML = JSON.stringify(Object.keys(inputData));
		}),
		EMTBrowseListDispatchForm: (function _EMTBrowseListDispatchForm() {
			window.TestEMTBrowseListDispatchForm.innerHTML = parseInt(window.TestEMTBrowseListDispatchForm.innerHTML) + 1;
		}),
		EMTBrowseListDispatchClose: (function _EMTBrowseListDispatchClose() {
			window.TestEMTBrowseListDispatchClose.innerHTML = parseInt(window.TestEMTBrowseListDispatchClose.innerHTML) + 1;
		}),
		EMTBrowseJournalMemos: [],
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
		if (['EMTBrowseJournalSelected', 'EMTBrowseItemSelected'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (['EMTBrowseJournalSelected'].includes(e[0])) {
			e[1] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e[1]);
		}

		if (['EMTBrowseItemSelected'].includes(e[0]) && coll.length > 1) {
			e[1] = coll[index - 1][1].filter(function (item) {
				return item.EMTMemoID === e[1].EMTMemoID;
			}).pop();
		}

		return e;
	}))),
});

export default EMTBrowse;
