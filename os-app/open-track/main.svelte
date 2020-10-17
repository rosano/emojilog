<script>
import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKThrottle from 'OLSKThrottle';
import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'
import * as OLSKRemoteStoragePackage from '../_shared/__external/OLSKRemoteStorage/main.js'
const OLSKRemoteStorage = OLSKRemoteStoragePackage.default || OLSKRemoteStoragePackage;
import * as OLSKServiceWorkerPackage from '../_shared/__external/OLSKServiceWorker/main.js'
const OLSKServiceWorker = OLSKServiceWorkerPackage.default || OLSKServiceWorkerPackage;
import EMT_Data from '../_shared/EMT_Data/main.js';
import EMTJournalStorage from '../_shared/EMTJournal/storage.js';
import EMTJournalAction from '../_shared/EMTJournal/action.js';
import * as RemoteStoragePackage from 'remotestoragejs';
const RemoteStorage = RemoteStoragePackage.default || RemoteStoragePackage;
import EMTTrackLogic from './ui-logic.js';
import EMTMemoStorage from '../_shared/EMTMemo/storage.js';
import EMTMemoAction from '../_shared/EMTMemo/action.js';
const mod = {

	// VALUE

	_ValueIsLoading: true,

	_ValueJournalsAll: [],
	ValueJournalsAll (inputData, shouldSort = true) {
		mod._ValueJournalsAll = shouldSort ? inputData.sort(EMTTrackLogic.EMTTrackSort) : inputData;
	},
	
	_ValueJournalSelected: undefined,
	ValueJournalSelected (inputData) {
		mod._ValueJournalSelected = inputData
	},
	
	_ValueFormVisible: false,
	
	_ValueBrowseMemos: [],
	ValueBrowseMemos (inputData) {
		mod._ValueBrowseMemos = inputData;
	},

	_ValueStorageToolbarHidden: true,

	_ValueFooterStorageStatus: '',

	_ValueSaveThrottleMap: {},

	// DATA

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

	DataNavigator () {
		return navigator.serviceWorker ? navigator : {
			serviceWorker: {},
		};
	},

	DataTrackRecipes () {
		const outputData = [];

		if (OLSK_TESTING_BEHAVIOUR()) {
			outputData.push(...[{
				LCHRecipeName: 'EMTTrackLauncherItemDebug_ImportFileData',
				LCHRecipeCallback: function EMTTrackLauncherItemDebug_ImportFileData () {
					mod.InterfaceStorageInputFieldDidRead(window.prompt());
				},
			}])
		}

		outputData.push(...OLSKRemoteStorage.OLSKRemoteStorageRecipes(window, mod._ValueStorageClient, OLSKLocalized, OLSK_TESTING_BEHAVIOUR()));
		outputData.push(...OLSKServiceWorker.OLSKServiceWorkerRecipes(window, mod.DataNavigator(), OLSKLocalized, OLSK_TESTING_BEHAVIOUR()));

		return outputData;
	},

	// INTERFACE

	InterfaceStorageInputFieldDidInput (event) {
		const inputElement = event.target;
		const fileReader = new FileReader();
		
		fileReader.onload = function (event) {
			mod.InterfaceStorageInputFieldDidRead(event.target.result);
			
			inputElement.value = null;
		};

		fileReader.readAsText(inputElement.files[0]);
	},

	async InterfaceStorageInputFieldDidRead (inputData) {
		if (!inputData.trim()) {
			return window.alert(OLSKLocalized('EMTTrackStorageImportErrorNotFilledAlertText'))
		}

		try {
			await EMT_Data.EMT_DataImport(mod._ValueStorageClient, OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(JSON.parse(inputData)));
			await mod.SetupValueJournalsAll();
		} catch (e) {
			window.alert(OLSKLocalized('EMTTrackStorageImportErrorNotValidAlertText'));
		}
	},

	// CONTROL

	ControlJournalSave(inputData) {
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

	async ControlJournalCreate() {
		const item = await EMTJournalAction.EMTJournalActionCreate(mod._ValueStorageClient, {
			EMTJournalName: '',
			EMTJournalModificationDate: new Date(),
		});

		mod.ValueJournalsAll(mod._ValueJournalsAll.concat(item));

		mod._ValueFormVisible = true;

		mod.ControlJournalSelect(item);
	},
	
	ControlJournalSelect(inputData) {
		mod.ValueJournalSelected(inputData);
	},
	
	async ControlJournalDiscard (inputData) {
		mod.ValueJournalsAll(mod._ValueJournalsAll.filter(function (e) {
			return e !== inputData;
		}))

		await EMTJournalAction.EMTJournalActionDelete(mod._ValueStorageClient, inputData);

		mod.ControlJournalSelect(null);

		mod._ValueFormVisible = false;
	},

	// MESSAGE

	OLSKAppToolbarDispatchStorage () {
		mod._ValueStorageToolbarHidden = !mod._ValueStorageToolbarHidden;
	},

	OLSKAppToolbarDispatchLauncher () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataTrackRecipes(),
		});
	},

	EMTTrackMasterDispatchCreate () {
		mod.ControlJournalCreate();
	},

	async EMTTrackMasterDispatchSelect (inputData) {
		mod.ValueBrowseMemos(await EMTMemoAction.EMTMemoActionList(mod._ValueStorageClient, inputData));
		
		mod.ControlJournalSelect(inputData);
	},

	EMTTemplateDispatchDone () {
		mod._ValueFormVisible = false;
	},

	EMTTemplateDispatchDiscard (inputData) {
		mod.ControlJournalDiscard(inputData);
	},

	EMTTemplateDispatchUpdate () {
		mod._ValueJournalSelected = mod._ValueJournalSelected; // #purge-svelte-force-update
		
		mod.ControlJournalSave(mod._ValueJournalSelected);
	},

	EMTBrowseDispatchCreate () {},

	EMTBrowseListDispatchForm () {
		mod._ValueFormVisible = true;
	},

	EMTBrowseListDispatchClose () {
		mod.ControlJournalSelect(null);
	},

	MessageJournalSelectedDidChange (inputData) {
		if (!inputData) {
			return;
		}

		if (inputData === mod._ValueJournalSelected) {
			return;
		};

		setTimeout(function () {
			document.querySelector('.EMTTemplateFormNameField').focus();
		});

		mod._ValueJournalSelected = inputData;
	},

	// OLSKChangeDelegateCreate (inputData) {
	// 	// console.log('OLSKChangeDelegateCreate', inputData);

	// 	mod.ValueJournalsAll(mod._ValueJournalsAll.filter(function (e) {
	// 		return e.EMTJournalID !== inputData.EMTJournalID; // @Hotfix Dropbox sending DelegateAdd
	// 	}).concat(inputData));
	// },
	// OLSKChangeDelegateUpdate (inputData) {
	// 	// console.log('OLSKChangeDelegateUpdate', inputData);

	// 	if (mod._ValueJournalSelected && mod._ValueJournalSelected.EMTJournalID === inputData.EMTJournalID) {
	// 		mod.ControlJournalSelect(inputData);
	// 	}

	// 	mod.ValueJournalsAll(mod._ValueJournalsAll.map(function (e) {
	// 		return Object.assign(e, e.EMTJournalID === inputData.EMTJournalID ? inputData : {});
	// 	}), false);
	// },
	// OLSKChangeDelegateDelete (inputData) {
	// 	// console.log('OLSKChangeDelegateDelete', inputData);

	// 	if (mod._ValueJournalSelected && (mod._ValueJournalSelected.EMTJournalID === inputData.EMTJournalID)) {
	// 		mod.ControlJournalSelect(null);
	// 	}

	// 	mod.ValueJournalsAll(mod._ValueJournalsAll.filter(function (e) {
	// 		return e.EMTJournalID !== inputData.EMTJournalID;
	// 	}), false);
	// },

	// SETUP

	async SetupEverything () {
		mod.SetupStorageClient();

		mod.SetupStorageStatus();

		await mod.SetupStorageNotifications();

		await mod.SetupValueJournalsAll();

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

	async SetupValueJournalsAll() {
		mod.ValueJournalsAll((await EMTJournalAction.EMTJournalActionList(mod._ValueStorageClient)).filter(function (e) {
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
import EMTTemplate from '../sub-template/main.svelte';
import EMTBrowse from '../sub-browse/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorkerView from '../_shared/__external/OLSKServiceWorker/main.svelte';
import OLSKStorageWidget from 'OLSKStorageWidget';
</script>

<div class="EMTTrack OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<div class="OLSKViewportContent">
	{#if !mod._ValueJournalSelected }
		<EMTTrackMaster EMTTrackMasterListItems={ mod._ValueJournalsAll } EMTTrackMasterListItemSelected={ mod._ValueJournalSelected } EMTTrackMasterDispatchCreate={ mod.EMTTrackMasterDispatchCreate } EMTTrackMasterDispatchSelect={ mod.EMTTrackMasterDispatchSelect }
			 />
	{/if}

	{#if mod._ValueJournalSelected && !mod._ValueFormVisible }
		<EMTBrowse
			EMTBrowseStorageClient={ mod._ValueStorageClient }
			EMTBrowseJournalSelected={ mod._ValueJournalSelected }
			EMTBrowseJournalMemos={ mod._ValueBrowseMemos }
			EMTBrowseDispatchCreate={ mod.EMTBrowseDispatchCreate }
			EMTBrowseListDispatchForm={ mod.EMTBrowseListDispatchForm }
			EMTBrowseListDispatchClose={ mod.EMTBrowseListDispatchClose }
			bind:this={ mod._EMTBrowse }
			/>
	{/if}

	{#if mod._ValueJournalSelected && mod._ValueFormVisible }
		<EMTTemplate
			EMTTemplateItem={ mod._ValueJournalSelected }
			EMTTemplateDispatchDone={ mod.EMTTemplateDispatchDone }
			EMTTemplateDispatchDiscard={ mod.EMTTemplateDispatchDiscard }
			EMTTemplateDispatchUpdate={ mod.EMTTemplateDispatchUpdate }
			/>
	{/if}
</div>

<footer class="EMTTrackViewportFooter OLSKMobileViewFooter">
	{#if !mod._ValueStorageToolbarHidden }
		<div class="EMTTrackStorageToolbar OLSKToolbar OLSKToolbarJustify OLSKStorageToolbar">
			<div class="OLSKToolbarElementGroup">
				<input class="EMTTrackStorageImportField" type="file" on:change={ mod.InterfaceStorageInputFieldDidInput } />
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
		OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
		/>
</footer>

</div>

{#if !OLSK_TESTING_BEHAVIOUR()}
	<OLSKServiceWorkerView OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonicalFor('EMTServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>
