<script>
import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKThrottle from 'OLSKThrottle';
import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'
import * as OLSKRemoteStoragePackage from '../_shared/__external/OLSKRemoteStorage/main.js'
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;
import * as EMTDocumentAction from '../_shared/EMTDocument/action.js';
import * as EMTStorageClient from '../_shared/EMTStorageClient/main.js';
import { EMTStorageModule } from '../_shared/EMTStorageModule/main.js';
import { EMTDocumentStorage } from '../_shared/EMTDocument/storage.js';
import EMTTrackLogic from './ui-logic.js';
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

	MessageDocumentSelectedDidChange (inputData) {
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

	// CONTROL

	ControlTimerSave(inputData) {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueSaveThrottleMap, inputData.EMTDocumentID, {
			OLSKThrottleDuration: 500,
			async OLSKThrottleCallback () {
				await EMTDocumentAction.EMTDocumentActionUpdate(mod._ValueStorageClient, inputData);
			},
		});

		if (OLSK_TESTING_BEHAVIOUR()) {
			OLSKThrottle.OLSKThrottleSkip(mod._ValueSaveThrottleMap[inputData.EMTDocumentID])	
		};
	},

	async ControlTimerCreate() {
		const item = await EMTDocumentAction.EMTDocumentActionCreate(mod._ValueStorageClient, {
			EMTDocumentName: '',
			EMTDocumentModificationDate: new Date(),
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

		await EMTDocumentAction.EMTDocumentActionDelete(mod._ValueStorageClient, inputData.EMTDocumentID);

		mod.ControlTimerSelect(null);
	},

	// SETUP

	async SetupEverything () {
		mod.SetupStorageClient();

		mod.SetupStorageStatus();

		await mod.SetupStorageNotifications();

		await mod.SetupDataCache();

		await mod.SetupValueTimersAll();

		mod._ValueIsLoading = false;
	},

	SetupStorageClient() {
		mod._ValueStorageClient = EMTStorageClient.EMTStorageClient({
			modules: [
				EMTStorageModule([
					EMTDocumentStorage,
					].map(function (e) {
						return {
							EMTCollectionStorageGenerator: e,
							EMTCollectionChangeDelegate: e === EMTDocumentStorage ? {
								OLSKChangeDelegateCreate (inputData) {
									// console.log('OLSKChangeDelegateCreate', inputData);

									mod.ValueTimersAll(mod._ValueTimersAll.filter(function (e) {
										return e.EMTDocumentID !== inputData.EMTDocumentID; // @Hotfix Dropbox sending DelegateAdd
									}).concat(inputData));
								},
								OLSKChangeDelegateUpdate (inputData) {
									// console.log('OLSKChangeDelegateUpdate', inputData);

									if (mod._ValueTimerSelected && (mod._ValueTimerSelected.EMTDocumentID === inputData.EMTDocumentID)) {
										mod.ControlTimerSelect(Object.assign(mod._ValueTimerSelected, inputData));
									}

									mod.ValueTimersAll(mod._ValueTimersAll.map(function (e) {
										return Object.assign(e, e.EMTDocumentID === inputData.EMTDocumentID ? inputData : {});
									}), false);
								},
								OLSKChangeDelegateDelete (inputData) {
									// console.log('OLSKChangeDelegateDelete', inputData);

									if (mod._ValueTimerSelected && (mod._ValueTimerSelected.EMTDocumentID === inputData.EMTDocumentID)) {
										mod.ControlTimerSelect(null);
									}

									mod.ValueTimersAll(mod._ValueTimersAll.filter(function (e) {
										return e.EMTDocumentID !== inputData.EMTDocumentID;
									}), false);
								},
							} : null,
						}
					})),
			],
		});
	},

	SetupStorageStatus () {
		OLSKRemoteStorage.OLSKRemoteStorageStatus(mod._ValueStorageClient.remoteStorage, function (inputData) {
			mod._ValueFooterStorageStatus = inputData;
		}, OLSKLocalized)
	},

	async SetupStorageNotifications () {
		mod._ValueStorageClient.remoteStorage.on('not-connected', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('not-connected', arguments);
			}
		});

		mod._ValueStorageClient.remoteStorage.on('disconnected', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('disconnected', arguments);
			}
		});

		mod._ValueStorageClient.remoteStorage.on('connected', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('connected', arguments);
			}
		});

		mod._ValueStorageClient.remoteStorage.on('sync-done', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('sync-done', arguments);
			}
		});

		let isOffline;

		mod._ValueStorageClient.remoteStorage.on('network-offline', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('network-offline', arguments);
			}

			isOffline = true;
		});

		mod._ValueStorageClient.remoteStorage.on('network-online', () => {
			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('network-online', arguments);
			}
			
			isOffline = false;
		});

		mod._ValueStorageClient.remoteStorage.on('error', (error) => {
			if (isOffline && inputData.message === 'Sync failed: Network request failed.') {
				return;
			};

			if (!OLSK_TESTING_BEHAVIOUR()) {
				console.debug('error', error);
			}
		});

		return new Promise(function (res, rej) {
			mod._ValueStorageClient.remoteStorage.on('ready', () => {
				if (!OLSK_TESTING_BEHAVIOUR()) {
					console.debug('ready', arguments);
				}

				res();
			});
		})
	},

	async SetupDataCache() {
		await mod._ValueStorageClient.remoteStorage.emojitimer.emt_documents.EMTStorageCache();
	},

	async SetupValueTimersAll() {
		mod.ValueTimersAll((await EMTDocumentAction.EMTDocumentActionList(mod._ValueStorageClient)).filter(function (e) {
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

import OLSKViewportContent from 'OLSKViewportContent';
import EMTTrackMaster from './submodules/EMTTrackMaster/main.svelte';
import EMTTrackDetail from './submodules/EMTTrackDetail/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorker from '../_shared/__external/OLSKServiceWorker/main.svelte';
import OLSKStorageWidget from 'OLSKStorageWidget';
</script>

<div class="EMTTrack OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<OLSKViewportContent>
	<EMTTrackMaster EMTTrackMasterListItems={ mod._ValueTimersAll } EMTTrackMasterListItemSelected={ mod._ValueTimerSelected } EMTTrackMasterDispatchCreate={ mod.EMTTrackMasterDispatchCreate } EMTTrackMasterDispatchSelect={ mod.EMTTrackMasterDispatchSelect } OLSKMobileViewInactive={ mod._ValueTimerSelected } />
	
	<EMTTrackDetail EMTTrackDetailItem={ mod._ValueTimerSelected } EMTTrackDetailDispatchBack={ mod.EMTTrackDetailDispatchBack } EMTTrackDetailDispatchDiscard={ mod.EMTTrackDetailDispatchDiscard } EMTTrackDetailDispatchUpdate={ mod.EMTTrackDetailDispatchUpdate } OLSKMobileViewInactive={ !mod._ValueTimerSelected } />
</OLSKViewportContent>

<footer class="EMTTrackViewportFooter OLSKMobileViewFooter">
	{#if !mod._ValueStorageToolbarHidden }
		<div class="EMTTrackStorageToolbar OLSKToolbar OLSKToolbarJustify OLSKStorageToolbar">
			<div class="OLSKToolbarElementGroup">
				<div></div>
			</div>

			<div class="OLSKToolbarElementGroup">
				<OLSKStorageWidget StorageClient={ mod._ValueStorageClient.remoteStorage } />
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
