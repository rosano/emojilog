<script>
import { OLSKLocalized } from 'OLSKInternational';
import OLSKThrottle from 'OLSKThrottle';
import { OLSK_SPEC_UI } from 'OLSKSpec'
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import OLSKServiceWorker from 'OLSKServiceWorker';
import EML_Data from '../_shared/EML_Data/main.js';
import EMLJournalStorage from '../_shared/EMLJournal/storage.js';
import EMLJournalAction from '../_shared/EMLJournal/action.js';
import RemoteStorage from 'remotestoragejs';
import EMLTrackLogic from './ui-logic.js';
import EMLMemoStorage from '../_shared/EMLMemo/storage.js';
import EMLMemoAction from '../_shared/EMLMemo/action.js';
import OLSKString from 'OLSKString';
import OLSKLanguageSwitcher from 'OLSKLanguageSwitcher';

const mod = {

	// VALUE

	_ValueIsLoading: true,

	_ValueJournalsAll: [],
	ValueJournalsAll (inputData, shouldSort = true) {
		mod._ValueJournalsAll = shouldSort ? inputData.sort(EMLTrackLogic.EMLTrackSort) : inputData;
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

	async DataExportJSON () {
		return JSON.stringify(await EML_Data.EML_DataExport(mod._ValueOLSKRemoteStorage, mod._ValueJournalsAll));
	},

	DataExportBasename () {
		return `${ window.location.hostname }-${ Date.now() }`;
	},

	DataExportJSONFilename () {
		return `${ mod.DataExportBasename() }.json`;
	},	

	DataTrackRecipes () {
		const items = [
			{
				LCHRecipeSignature: 'EMLTrackLauncherItemImportJSON',
				LCHRecipeName: OLSKLocalized('EMLTrackLauncherItemImportJSONText'),
				LCHRecipeCallback: async function EMLTrackLauncherItemImportJSON () {
					return mod.ControlJournalsImportJSON(await this.api.LCHReadTextFile({
						accept: '.json',
					}));
				},
			},
			{
				LCHRecipeSignature: 'EMLTrackLauncherItemExportJSON',
				LCHRecipeName: OLSKLocalized('EMLTrackLauncherItemExportJSONText'),
				LCHRecipeCallback: async function EMLTrackLauncherItemExportJSON () {
					return this.api.LCHSaveFile(await mod.DataExportJSON(), mod.DataExportJSONFilename());
				},
			},
		];

		items.push(...OLSKRemoteStorage.OLSKRemoteStorageRecipes({
			ParamWindow: window,
			ParamStorage: mod._ValueOLSKRemoteStorage,
			OLSKLocalized: OLSKLocalized,
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));
		items.push(...OLSKServiceWorker.OLSKServiceWorkerRecipes(window, mod.DataNavigator(), OLSKLocalized, OLSK_SPEC_UI()));

		if (mod._EMLTrackMaster) {
			items.push(...mod._EMLTrackMaster.modPublic.EMLTrackMasterRecipes());
		}

		if (mod._EMLBrowse) {
			items.push(...mod._EMLBrowse.modPublic.EMLBrowseRecipes());
		}

		if (OLSK_SPEC_UI()) {
			items.push(...[
				{
					LCHRecipeName: 'EMLTrackLauncherItemDebug_PromptFakeImportSerialized',
					LCHRecipeCallback: function EMLTrackLauncherItemDebug_PromptFakeImportSerialized () {
						return mod.ControlJournalsImportJSON(window.prompt());
					},
				},
				{
					LCHRecipeName: 'EMLTrackLauncherItemDebug_AlertFakeExportSerialized',
					LCHRecipeCallback: async function EMLTrackLauncherItemDebug_AlertFakeExportSerialized () {
						return window.alert(JSON.stringify({
							OLSKDownloadName: mod.DataExportJSONFilename(),
							OLSKDownloadData: await mod.DataExportJSON(),
						}));
					},
				},
			]);
		}

		return items;
	},

	// CONTROL

	ControlJournalSave(inputData) {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueSaveThrottleMap, inputData.EMLJournalID, {
			OLSKThrottleDuration: 500,
			async OLSKThrottleCallback () {
				await EMLJournalAction.EMLJournalActionUpdate(mod._ValueOLSKRemoteStorage, inputData);
			},
		});

		if (OLSK_SPEC_UI()) {
			OLSKThrottle.OLSKThrottleSkip(mod._ValueSaveThrottleMap[inputData.EMLJournalID])	
		};
	},

	async ControlJournalCreate() {
		const item = await EMLJournalAction.EMLJournalActionCreate(mod._ValueOLSKRemoteStorage, {
			EMLJournalName: '',
			EMLJournalModificationDate: new Date(),
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

		await EMLJournalAction.EMLJournalActionDelete(mod._ValueOLSKRemoteStorage, inputData);

		mod.ControlJournalSelect(null);

		mod._ValueFormVisible = false;
	},

	async ControlJournalsImportJSON (inputData) {
		if (!inputData.trim()) {
			return window.alert(OLSKLocalized('EMLTrackLauncherItemImportJSONErrorNotFilledAlertText'))
		}

		try {
			await EML_Data.EML_DataImport(mod._ValueOLSKRemoteStorage, OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(JSON.parse(inputData)));
			await mod.SetupValueJournalsAll();
		} catch (e) {
			window.alert(OLSKLocalized('EMLTrackLauncherItemImportJSONErrorNotValidAlertText'));
		}
	},

	ControlExportData (inputData) {
		Launchlet.LCHTasksRun([{
			async LCHRecipeCallback () {
				if (OLSK_SPEC_UI()) {
					return window.alert(JSON.stringify({
						OLSKDownloadName: mod.DataExportJSONFilename(),
						OLSKDownloadData: JSON.stringify(await EML_Data.EML_DataExport(mod._ValueOLSKRemoteStorage, inputData)),
					}));
				};

				return this.api.LCHSaveFile(JSON.stringify(await EML_Data.EML_DataExport(mod._ValueOLSKRemoteStorage, inputData)), mod.DataExportJSONFilename())
			},
			LCHRecipeURLFilter: '*',
		  LCHRecipeIsAutomatic: true,
		}]);
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
				OLSKCanonical: window.OLSKCanonical,
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

	EMLTrackMasterDispatchCreate () {
		mod.ControlJournalCreate();
	},

	async EMLTrackMasterDispatchSelect (inputData) {
		mod.ValueBrowseMemos(await EMLMemoAction.EMLMemoActionList(mod._ValueOLSKRemoteStorage, inputData));
		
		mod.ControlJournalSelect(inputData);
	},

	EMLTrackMasterDispatchImportData (inputData) {
		mod.InterfaceStorageInputFieldDidRead(inputData);
	},

	EMLTemplateDispatchDone () {
		mod._ValueFormVisible = false;
	},

	EMLTemplateDispatchDiscard (inputData) {
		mod.ControlJournalDiscard(inputData);
	},

	EMLTemplateDispatchUpdate () {
		mod._ValueJournalSelected = mod._ValueJournalSelected; // #purge-svelte-force-update
		
		mod.ControlJournalSave(mod._ValueJournalSelected);
	},

	EMLBrowseDispatchCreate () {},

	EMLBrowseListDispatchForm () {
		mod._ValueFormVisible = true;
	},

	EMLBrowseListDispatchClose () {
		mod.ControlJournalSelect(null);
	},
	
	EMLBrowseListDispatchExport () {
		mod.ControlExportData([mod._ValueJournalSelected]);
	},

	// OLSKChangeDelegateCreate (inputData) {
	// 	// console.log('OLSKChangeDelegateCreate', inputData);

	// 	mod.ValueJournalsAll(mod._ValueJournalsAll.filter(function (e) {
	// 		return e.EMLJournalID !== inputData.EMLJournalID; // @Hotfix Dropbox sending DelegateAdd
	// 	}).concat(inputData));
	// },
	// OLSKChangeDelegateUpdate (inputData) {
	// 	// console.log('OLSKChangeDelegateUpdate', inputData);

	// 	if (mod._ValueJournalSelected && mod._ValueJournalSelected.EMLJournalID === inputData.EMLJournalID) {
	// 		mod.ControlJournalSelect(inputData);
	// 	}

	// 	mod.ValueJournalsAll(mod._ValueJournalsAll.map(function (e) {
	// 		return Object.assign(e, e.EMLJournalID === inputData.EMLJournalID ? inputData : {});
	// 	}), false);
	// },
	// OLSKChangeDelegateDelete (inputData) {
	// 	// console.log('OLSKChangeDelegateDelete', inputData);

	// 	if (mod._ValueJournalSelected && (mod._ValueJournalSelected.EMLJournalID === inputData.EMLJournalID)) {
	// 		mod.ControlJournalSelect(null);
	// 	}

	// 	mod.ValueJournalsAll(mod._ValueJournalsAll.filter(function (e) {
	// 		return e.EMLJournalID !== inputData.EMLJournalID;
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
		const storageModule = EML_Data.EML_DataModule([
			Object.assign(EMLJournalStorage.EMLJournalStorageBuild, {
				// OLSKChangeDelegate: {
				// 	OLSKChangeDelegateCreate: mod.OLSKChangeDelegateCreateJournal,
				// 	OLSKChangeDelegateUpdate: mod.OLSKChangeDelegateUpdateJournal,
				// 	OLSKChangeDelegateDelete: mod.OLSKChangeDelegateDeleteJournal,
				// },
			}),
			Object.assign(EMLMemoStorage.EMLMemoStorageBuild, {
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
		mod.ValueJournalsAll((await EMLJournalAction.EMLJournalActionList(mod._ValueOLSKRemoteStorage)).filter(function (e) {
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

import EMLTrackMaster from './submodules/EMLTrackMaster/main.svelte';
import EMLTemplate from '../sub-template/main.svelte';
import EMLBrowse from '../sub-browse/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorkerView from '../_shared/__external/OLSKServiceWorker/main.svelte';
import OLSKStorageWidget from 'OLSKStorageWidget';
import OLSKModalView from 'OLSKModalView';
import OLSKApropos from 'OLSKApropos';
</script>

<div class="EMLTrack OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<div class="OLSKViewportContent">
	{#if !mod._ValueJournalSelected }
		<EMLTrackMaster
			EMLTrackMasterListItems={ mod._ValueJournalsAll }
			EMLTrackMasterListItemSelected={ mod._ValueJournalSelected }
			EMLTrackMasterDispatchCreate={ mod.EMLTrackMasterDispatchCreate }
			EMLTrackMasterDispatchSelect={ mod.EMLTrackMasterDispatchSelect }
			EMLTrackMasterDispatchImportData={ mod.EMLTrackMasterDispatchImportData }
			bind:this={ mod._EMLTrackMaster }
			/>
	{/if}

	{#if mod._ValueJournalSelected && !mod._ValueFormVisible }
		<EMLBrowse
			EMLBrowseStorageClient={ mod._ValueOLSKRemoteStorage }
			EMLBrowseJournalSelected={ mod._ValueJournalSelected }
			EMLBrowseJournalMemos={ mod._ValueBrowseMemos }
			EMLBrowseDispatchCreate={ mod.EMLBrowseDispatchCreate }
			EMLBrowseListDispatchForm={ mod.EMLBrowseListDispatchForm }
			EMLBrowseListDispatchClose={ mod.EMLBrowseListDispatchClose }
			EMLBrowseListDispatchExport={ mod.EMLBrowseListDispatchExport }
			bind:this={ mod._EMLBrowse }
			/>
	{/if}

	{#if mod._ValueJournalSelected && mod._ValueFormVisible }
		<EMLTemplate
			EMLTemplateItem={ mod._ValueJournalSelected }
			EMLTemplateDispatchDone={ mod.EMLTemplateDispatchDone }
			EMLTemplateDispatchDiscard={ mod.EMLTemplateDispatchDiscard }
			EMLTemplateDispatchUpdate={ mod.EMLTemplateDispatchUpdate }
			/>
	{/if}
</div>

<footer class="EMLTrackViewportFooter OLSKMobileViewFooter">
	{#if !mod._ValueStorageToolbarHidden }
		<div class="EMLTrackStorageToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop OLSKStorageToolbar">
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
	<OLSKServiceWorkerView OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonical('EMLServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>
