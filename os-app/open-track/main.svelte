<script>
import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKThrottle from 'OLSKThrottle';
import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'
import * as OLSKRemoteStoragePackage from '../_shared/__external/OLSKRemoteStorage/main.js'
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;
import EMT_Data from '../_shared/EMT_Data/main.js';
import EMTJournalStorage from '../_shared/EMTJournal/storage.js';
import EMTJournalAction from '../_shared/EMTJournal/action.js';
import * as RemoteStoragePackage from 'remotestoragejs';
const RemoteStorage = RemoteStoragePackage.default || RemoteStoragePackage;
import EMTTrackLogic from './ui-logic.js';
import EMTMemoStorage from '../_shared/EMTMemo/storage.js';
const mod = {

	// VALUE

	_ValueIsLoading: true,

	_ValueTimersAll: [],
	ValueTimersAll (inputData, shouldSort = true) {
		mod._ValueTimersAll = shouldSort ? inputData.sort(EMTTrackLogic.EMTTrackSort) : inputData;
	},
	
	_ValueTimerSelected: undefined,
	ValueTimerSelected (inputData) {
		mod._ValueTimerSelected = inputData

		if (!inputData) {
			mod.OLSKMobileViewInactive = false;	
		}
	},
	
	_ValueStorageToolbarHidden: true,

	_ValueFooterStorageStatus: '',

	_ValueSaveThrottleMap: {},

	OLSKMobileViewInactive: false,

	// DATA

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	// CONTROL

	ControlTimerSave(inputData) {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueSaveThrottleMap, inputData.EMTJournalID, {
			OLSKThrottleDuration: 500,
			async OLSKThrottleCallback () {
				await EMTJournalAction.EMTJournalActionUpdate(mod._ValueStorageClient, inputData);
			},
		});

		if (OLSK_TESTING_BEHAVIOUR()) {
			OLSKThrottle.OLSKThrottleSkip(mod._ValueSaveThrottleMap[inputData.EMTJournalID])	
		};
	},

	async ControlTimerCreate() {
		const item = await EMTJournalAction.EMTJournalActionCreate(mod._ValueStorageClient, {
			EMTJournalName: '',
			EMTJournalModificationDate: new Date(),
		});

		mod.ValueTimersAll(mod._ValueTimersAll.concat(item));

		mod.ControlTimerSelect(item);
	},
	
	ControlTimerSelect(inputData) {
		mod.ValueTimerSelected(inputData);

		mod.OLSKMobileViewInactive = true;
	},
	
	async ControlTimerDiscard (inputData) {
		mod.ValueTimersAll(mod._ValueTimersAll.filter(function (e) {
			return e !== inputData;
		}))

		await EMTJournalAction.EMTJournalActionDelete(mod._ValueStorageClient, inputData);

		mod.ControlTimerSelect(null);
	},

	// MESSAGE

	OLSKAppToolbarDispatchStorage () {
		mod._ValueStorageToolbarHidden = !mod._ValueStorageToolbarHidden;
	},

	EMTTrackMasterDispatchCreate () {
		mod.ControlTimerCreate();
	},

	EMTTrackMasterDispatchSelect (inputData) {
		mod.ControlTimerSelect(inputData);
	},

	EMTTrackDetailDispatchBack () {
		mod.ControlTimerSelect(null);
	},

	EMTTrackDetailDispatchDiscard (inputData) {
		mod.ControlTimerDiscard(inputData);
	},

	EMTTrackDetailDispatchUpdate () {
		mod._ValueTimerSelected = mod._ValueTimerSelected; // #purge-svelte-force-update
		
		mod.ControlTimerSave(mod._ValueTimerSelected);
	},

	MessageJournalSelectedDidChange (inputData) {
		if (!inputData) {
			return;
		}

		if (inputData === mod._ValueTimerSelected) {
			return;
		};

		setTimeout(function () {
			document.querySelector('.EMTTrackDetailFormNameField').focus();
		});

		mod._ValueTimerSelected = inputData;
	},

	// OLSKChangeDelegateCreate (inputData) {
	// 	// console.log('OLSKChangeDelegateCreate', inputData);

	// 	mod.ValueTimersAll(mod._ValueTimersAll.filter(function (e) {
	// 		return e.EMTJournalID !== inputData.EMTJournalID; // @Hotfix Dropbox sending DelegateAdd
	// 	}).concat(inputData));
	// },
	// OLSKChangeDelegateUpdate (inputData) {
	// 	// console.log('OLSKChangeDelegateUpdate', inputData);

	// 	if (mod._ValueTimerSelected && mod._ValueTimerSelected.EMTJournalID === inputData.EMTJournalID) {
	// 		mod.ControlTimerSelect(inputData);
	// 	}

	// 	mod.ValueTimersAll(mod._ValueTimersAll.map(function (e) {
	// 		return Object.assign(e, e.EMTJournalID === inputData.EMTJournalID ? inputData : {});
	// 	}), false);
	// },
	// OLSKChangeDelegateDelete (inputData) {
	// 	// console.log('OLSKChangeDelegateDelete', inputData);

	// 	if (mod._ValueTimerSelected && (mod._ValueTimerSelected.EMTJournalID === inputData.EMTJournalID)) {
	// 		mod.ControlTimerSelect(null);
	// 	}

	// 	mod.ValueTimersAll(mod._ValueTimersAll.filter(function (e) {
	// 		return e.EMTJournalID !== inputData.EMTJournalID;
	// 	}), false);
	// },

	// SETUP

	async SetupEverything () {
		mod.SetupStorageClient();

		mod.SetupStorageStatus();

		await mod.SetupStorageNotifications();

		await mod.SetupValueTimersAll();

		mod._ValueIsLoading = false;
	},

	SetupStorageClient() {
		const storageModule = EMT_Data.EMT_DataModule([
			Object.assign(EMTJournalStorage.EMTJournalStorageBuild, {
				// OLSKChangeDelegate: {
				// 	OLSKChangeDelegateCreate: mod.OLSKChangeDelegateCreateJournal,
				// 	OLSKChangeDelegateUpdate: mod.OLSKChangeDelegateUpdateJournal,
				// 	OLSKChangeDelegateDelete: mod.OLSKChangeDelegateDeleteJournal,
				// },
			}),
			Object.assign(EMTMemoStorage.EMTMemoStorageBuild, {
				// OLSKChangeDelegate: {
				// 	OLSKChangeDelegateCreate: mod.OLSKChangeDelegateCreateMemo,
				// 	OLSKChangeDelegateUpdate: mod.OLSKChangeDelegateUpdateMemo,
				// 	OLSKChangeDelegateDelete: mod.OLSKChangeDelegateDeleteMemo,
				// },
			}),
			]);
		
		mod._ValueStorageClient = new RemoteStorage({ modules: [ storageModule ] });

		mod._ValueStorageClient.access.claim(storageModule.name, 'rw');

		mod._ValueStorageClient.caching.enable(`/${ storageModule.name }/`);
	},

	SetupStorageStatus () {
		OLSKRemoteStorage.OLSKRemoteStorageStatus(mod._ValueStorageClient, function (inputData) {
			mod._ValueFooterStorageStatus = inputData;
		}, OLSKLocalized)
	},

	async SetupStorageNotifications () {
		mod._ValueStorageClient.on('sync-done', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('sync-done', arguments);
			}
		});

		let isOffline;

		mod._ValueStorageClient.on('network-offline', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('network-offline', arguments);
			}

			isOffline = true;
		});

		mod._ValueStorageClient.on('network-online', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('network-online', arguments);
			}
			
			isOffline = false;
		});

		mod._ValueStorageClient.on('error', (error) => {
			if (isOffline && inputData.message === 'Sync failed: Network request failed.') {
				return;
			};

			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('error', error);
			}
		});

		return new Promise(function (res, rej) {
			return mod._ValueStorageClient.on('ready', res);
		});
	},

	async SetupValueTimersAll() {
		mod.ValueTimersAll((await EMTJournalAction.EMTJournalActionList(mod._ValueStorageClient)).filter(function (e) {
			return typeof e === 'object'; // #patch-remotestorage-true
		}));
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import EMTTrackMaster from './submodules/EMTTrackMaster/main.svelte';
import EMTTrackDetail from './submodules/EMTTrackDetail/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorker from '../_shared/__external/OLSKServiceWorker/main.svelte';
import OLSKStorageWidget from 'OLSKStorageWidget';
</script>

<div class="EMTTrack OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<div class="OLSKViewportContent">
	<EMTTrackMaster EMTTrackMasterListItems={ mod._ValueTimersAll } EMTTrackMasterListItemSelected={ mod._ValueTimerSelected } EMTTrackMasterDispatchCreate={ mod.EMTTrackMasterDispatchCreate } EMTTrackMasterDispatchSelect={ mod.EMTTrackMasterDispatchSelect } OLSKMobileViewInactive={ mod._ValueTimerSelected } />
	
	<EMTTrackDetail EMTTrackDetailItem={ mod._ValueTimerSelected } EMTTrackDetailDispatchBack={ mod.EMTTrackDetailDispatchBack } EMTTrackDetailDispatchDiscard={ mod.EMTTrackDetailDispatchDiscard } EMTTrackDetailDispatchUpdate={ mod.EMTTrackDetailDispatchUpdate } OLSKMobileViewInactive={ !mod._ValueTimerSelected } />
</div>

<footer class="EMTTrackViewportFooter OLSKMobileViewFooter">
	{#if !mod._ValueStorageToolbarHidden }
		<div class="EMTTrackStorageToolbar OLSKToolbar OLSKToolbarJustify OLSKStorageToolbar">
			<div class="OLSKToolbarElementGroup">
				<div></div>
			</div>

			<div class="OLSKToolbarElementGroup">
				<OLSKStorageWidget StorageClient={ mod._ValueStorageClient } />
			</div>
		</div>
	{/if}

	<OLSKAppToolbar
		OLSKAppToolbarDonateURL={ window.OLSKPublicConstants('EMT_SHARED_DONATE_URL') }
		OLSKAppToolbarStorageStatus={ mod._ValueFooterStorageStatus }
		OLSKAppToolbarDispatchStorage={ mod.OLSKAppToolbarDispatchStorage }
		_OLSKAppToolbarDispatchExport={ mod._OLSKAppToolbarDispatchExport }
		_OLSKAppToolbarDispatchImport={ mod._OLSKAppToolbarDispatchImport }
		/>
</footer>

</div>

{#if !OLSK_TESTING_BEHAVIOUR()}
	<OLSKServiceWorker OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonicalFor('EMTServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>
