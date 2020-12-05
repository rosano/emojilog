<script>
import { OLSKLocalized } from 'OLSKInternational';
import OLSKThrottle from 'OLSKThrottle';
import { OLSK_SPEC_UI } from 'OLSKSpec'
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import OLSKServiceWorker from 'OLSKServiceWorker';
import EMT_Data from '../_shared/EMT_Data/main.js';
import EMTJournalStorage from '../_shared/EMTJournal/storage.js';
import EMTJournalAction from '../_shared/EMTJournal/action.js';
import RemoteStorage from 'remotestoragejs';
import EMTTrackLogic from './ui-logic.js';
import EMTMemoStorage from '../_shared/EMTMemo/storage.js';
import EMTMemoAction from '../_shared/EMTMemo/action.js';
import OLSKString from 'OLSKString';
import OLSKLanguageSwitcher from 'OLSKLanguageSwitcher';

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
		const items = [];

		if (OLSK_SPEC_UI()) {
			items.push(...[{
				LCHRecipeName: 'EMTTrackLauncherItemDebug_ImportFileData',
				LCHRecipeCallback: function EMTTrackLauncherItemDebug_ImportFileData () {
					mod.InterfaceStorageInputFieldDidRead(window.prompt());
				},
			}])
		}

		items.push(...OLSKRemoteStorage.OLSKRemoteStorageRecipes({
			ParamWindow: window,
			ParamStorage: mod._ValueOLSKRemoteStorage,
			OLSKLocalized: OLSKLocalized,
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));
		items.push(...OLSKServiceWorker.OLSKServiceWorkerRecipes(window, mod.DataNavigator(), OLSKLocalized, OLSK_SPEC_UI()));

		if (mod._EMTTrackMaster) {
			items.push(...mod._EMTTrackMaster.modPublic.EMTTrackMasterRecipes());
		}

		return items;
	},

	// INTERFACE

	async InterfaceStorageInputFieldDidRead (inputData) {
		if (!inputData.trim()) {
			return window.alert(OLSKLocalized('EMTTrackStorageImportErrorNotFilledAlertText'))
		}

		try {
			await EMT_Data.EMT_DataImport(mod._ValueOLSKRemoteStorage, OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(JSON.parse(inputData)));
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
				await EMTJournalAction.EMTJournalActionUpdate(mod._ValueOLSKRemoteStorage, inputData);
			},
		});

		if (OLSK_SPEC_UI()) {
			OLSKThrottle.OLSKThrottleSkip(mod._ValueSaveThrottleMap[inputData.EMTJournalID])	
		};
	},

	async ControlJournalCreate() {
		const item = await EMTJournalAction.EMTJournalActionCreate(mod._ValueOLSKRemoteStorage, {
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

		await EMTJournalAction.EMTJournalActionDelete(mod._ValueOLSKRemoteStorage, inputData);

		mod.ControlJournalSelect(null);

		mod._ValueFormVisible = false;
	},

	// MESSAGE

	OLSKAppToolbarDispatchApropos () {
		mod._OLSKModalView.modPublic.OLSKModalViewShow();
	},

	OLSKAppToolbarDispatchTongue () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		// #hotfix launchlet show all items
		let selected;

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: OLSKLanguageSwitcher.OLSKLanguageSwitcherRecipes({
				ParamLanguageCodes: window.OLSKPublicConstants('OLSKSharedPageLanguagesAvailable'),
				ParamCurrentLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
				ParamSpecUI: OLSK_SPEC_UI(),
				ParamWindow: window,
				OLSKLocalized,
				ParamRouteConstant: window.OLSKPublicConstants('OLSKSharedActiveRouteConstant'),
				OLSKFormatted: OLSKString.OLSKStringFormatted,
				OLSKCanonicalFor: window.OLSKCanonicalFor,
			}).map(function (e) {
				const item = e.LCHRecipeCallback;

				return Object.assign(e, {
					LCHRecipeCallback () {
						selected = item;
					},
				})
			}),
			LCHOptionCompletionHandler () {
			  selected && selected();
			},
			LCHOptionMode: Launchlet.LCHModePreview,
		});
	},

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
		mod.ValueBrowseMemos(await EMTMemoAction.EMTMemoActionList(mod._ValueOLSKRemoteStorage, inputData));
		
		mod.ControlJournalSelect(inputData);
	},

	EMTTrackMasterDispatchImportData (inputData) {
		mod.InterfaceStorageInputFieldDidRead(inputData);
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

	OLSKRemoteStorageLauncherItemFakeFlipConnectedDidFinish () {
		mod._ValueOLSKRemoteStorage = mod._ValueOLSKRemoteStorage; // #purge-svelte-force-update
	},

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
		
		mod._ValueOLSKRemoteStorage = new RemoteStorage({ modules: [ storageModule ] });

		mod._ValueOLSKRemoteStorage.access.claim(storageModule.name, 'rw');

		mod._ValueOLSKRemoteStorage.caching.enable(`/${ storageModule.name }/`);
	},

	SetupStorageStatus () {
		OLSKRemoteStorage.OLSKRemoteStorageStatus(mod._ValueOLSKRemoteStorage, function (inputData) {
			mod._ValueFooterStorageStatus = inputData;
		}, OLSKLocalized)
	},

	async SetupStorageNotifications () {
		mod._ValueOLSKRemoteStorage.on('sync-done', () => {
			if (!OLSK_SPEC_UI()) {
				console.debug('sync-done', arguments);
			}
		});

		let isOffline;

		mod._ValueOLSKRemoteStorage.on('network-offline', () => {
			if (!OLSK_SPEC_UI()) {
				console.debug('network-offline', arguments);
			}

			isOffline = true;
		});

		mod._ValueOLSKRemoteStorage.on('network-online', () => {
			if (!OLSK_SPEC_UI()) {
				console.debug('network-online', arguments);
			}
			
			isOffline = false;
		});

		mod._ValueOLSKRemoteStorage.on('error', (error) => {
			if (isOffline && inputData.message === 'Sync failed: Network request failed.') {
				return;
			};

			if (!OLSK_SPEC_UI()) {
				console.debug('error', error);
			}
		});

		return new Promise(function (res, rej) {
			return mod._ValueOLSKRemoteStorage.on('ready', res);
		});
	},

	async SetupValueJournalsAll() {
		mod.ValueJournalsAll((await EMTJournalAction.EMTJournalActionList(mod._ValueOLSKRemoteStorage)).filter(function (e) {
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
import OLSKModalView from 'OLSKModalView';
import OLSKApropos from 'OLSKApropos';
</script>

<div class="EMTTrack OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<div class="OLSKViewportContent">
	{#if !mod._ValueJournalSelected }
		<EMTTrackMaster
			EMTTrackMasterListItems={ mod._ValueJournalsAll }
			EMTTrackMasterListItemSelected={ mod._ValueJournalSelected }
			EMTTrackMasterDispatchCreate={ mod.EMTTrackMasterDispatchCreate }
			EMTTrackMasterDispatchSelect={ mod.EMTTrackMasterDispatchSelect }
			EMTTrackMasterDispatchImportData={ mod.EMTTrackMasterDispatchImportData }
			bind:this={ mod._EMTTrackMaster }
			/>
	{/if}

	{#if mod._ValueJournalSelected && !mod._ValueFormVisible }
		<EMTBrowse
			EMTBrowseStorageClient={ mod._ValueOLSKRemoteStorage }
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
			</div>

			<div class="OLSKToolbarElementGroup">
				<OLSKStorageWidget StorageClient={ mod._ValueOLSKRemoteStorage } />
			</div>
		</div>
	{/if}

	<OLSKAppToolbar
		OLSKAppToolbarDispatchApropos={ mod.OLSKAppToolbarDispatchApropos }
		OLSKAppToolbarDispatchTongue={ mod.OLSKAppToolbarDispatchTongue }
		OLSKAppToolbarStorageStatus={ mod._ValueFooterStorageStatus }
		OLSKAppToolbarDispatchStorage={ mod.OLSKAppToolbarDispatchStorage }
		OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
		/>
</footer>

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('OLSKAproposHeadingText') } bind:this={ mod._OLSKModalView } OLSKModalViewIsCapped={ true }>
	<OLSKApropos
		OLSKAproposFeedbackValue={ `javascript:window.location.href = window.atob('${ window.btoa(OLSKString.OLSKStringFormatted(window.atob('OLSK_APROPOS_FEEDBACK_EMAIL_SWAP_TOKEN'), 'RP_X' + (mod._ValueFundClue ? '+' + mod._ValueFundClue : ''))) }')` }
		/>
</OLSKModalView>

</div>

{#if !OLSK_SPEC_UI()}
	<OLSKServiceWorkerView OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonicalFor('EMTServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>
