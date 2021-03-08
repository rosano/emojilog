<script>
import { OLSKLocalized } from 'OLSKInternational';
import OLSKThrottle from 'OLSKThrottle';
import { OLSK_SPEC_UI } from 'OLSKSpec'
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import zerodatawrap from 'zerodatawrap';
import OLSKServiceWorker from 'OLSKServiceWorker';
import EMLJournal from '../_shared/EMLJournal/main.js';
import EMLMemo from '../_shared/EMLMemo/main.js';
import EMLSetting from '../_shared/EMLSetting/main.js';
import EMLTransport from '../_shared/EMLTransport/main.js';
import RemoteStorage from 'remotestoragejs';
import EMLTrackLogic from './ui-logic.js';
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

	async DataExportJSON (EMLJournal) {
		return JSON.stringify(await mod._ValueZDRWrap.App.EMLTransport.EMLTransportExport({
			EMLJournal,
			EMLSetting: await mod._ValueZDRWrap.App.EMLSetting.EMLSettingList(),
		}));
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

		items.push(...zerodatawrap.ZDRRecipes({
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		if (mod._ValueZDRWrap.ZDRStorageProtocol === zerodatawrap.ZDRProtocolRemoteStorage()) {
			items.push(...OLSKRemoteStorage.OLSKRemoteStorageRecipes({
				ParamWindow: window,
				ParamStorage: mod._ValueZDRWrap.ZDRStorageClient(),
				OLSKLocalized: OLSKLocalized,
				ParamMod: mod,
				ParamSpecUI: OLSK_SPEC_UI(),
			}));
		}

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
				await mod._ValueZDRWrap.App.EMLJournal.EMLJournalUpdate(inputData);
			},
		});

		if (OLSK_SPEC_UI()) {
			OLSKThrottle.OLSKThrottleSkip(mod._ValueSaveThrottleMap[inputData.EMLJournalID])	
		};
	},

	async ControlJournalCreate() {
		const item = await mod._ValueZDRWrap.App.EMLJournal.EMLJournalCreate({
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

		await mod._ValueZDRWrap.App.EMLJournal.EMLJournalDelete(inputData);

		mod.ControlJournalSelect(null);

		mod._ValueFormVisible = false;
	},

	async ControlJournalsImportJSON (inputData) {
		if (!inputData.trim()) {
			return window.alert(OLSKLocalized('EMLTrackLauncherItemImportJSONErrorNotFilledAlertText'))
		}

		try {
			await mod._ValueZDRWrap.App.EMLTransport.EMLTransportImport(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(JSON.parse(inputData)));
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
						OLSKDownloadData: JSON.stringify(await mod.DataExportJSON(inputData)),
					}));
				};

				return this.api.LCHSaveFile(JSON.stringify(await mod.DataExportJSON(inputData)), mod.DataExportJSONFilename())
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
		mod.ValueBrowseMemos(await mod._ValueZDRWrap.App.EMLMemo.EMLMemoList(inputData));
		
		mod.ControlJournalSelect(inputData);
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

	EMLBrowseListDispatchCreate () {},

	EMLBrowseListDispatchForm () {
		mod._ValueFormVisible = true;
	},

	EMLBrowseListDispatchClose () {
		mod.ControlJournalSelect(null);
	},
	
	EMLBrowseListDispatchExport () {
		mod.ControlExportData([mod._ValueJournalSelected]);
	},
	
	EMLBrowseListDispatchTouch (inputData) {
		mod.ControlJournalSave(Object.assign(mod._ValueJournalSelected, {
			EMLJournalTouchDate: inputData,
		}));
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

	async OLSKCloudFormDispatchSubmit (inputData) {
		const protocol = zerodatawrap.ZDRPreferenceProtocolConnect(inputData);
		(zerodatawrap.ZDRPreferenceProtocolMigrate() ? await mod.DataStorageClient(protocol) : mod._ValueZDRWrap).ZDRCloudConnect(inputData);
	},

	OLSKCloudDispatchRenew () {
		mod._ValueZDRWrap.ZDRCloudReconnect(mod._ValueCloudIdentity);
	},

	OLSKCloudStatusDispatchDisconnect () {
		mod._ValueZDRWrap.ZDRCloudDisconnect();

		mod._ValueCloudIdentity = null;

		zerodatawrap.ZDRPreferenceProtocolClear();
	},

	ZDRParamDispatchError (error) {
		mod._ValueCloudErrorText = error.toString();
	},

	ZDRParamDispatchConnected (identity, token) {
		mod._ValueCloudIdentity = identity;
		mod._ValueCloudToken = token;
	},

	ZDRParamDispatchOnline () {
		mod._ValueCloudIsOffline = false;
	},

	ZDRParamDispatchOffline () {
		mod._ValueCloudIsOffline = true;
	},

	ZDRParamDispatchSyncDidStart () {
		mod._ValueIsSyncing = true;
	},

	ZDRParamDispatchSyncDidStop () {
		mod._ValueIsSyncing = false;
	},

	OLSKCloudStatusDispatchSyncStart () {
		if (mod._ValueZDRWrap.ZDRStorageProtocol !== zerodatawrap.ZDRProtocolRemoteStorage()) {
			return;
		}

		mod._ValueZDRWrap.ZDRStorageClient().startSync();

		mod.ZDRParamDispatchSyncDidStart();
	},

	OLSKCloudStatusDispatchSyncStop () {
		if (mod._ValueZDRWrap.ZDRStorageProtocol !== zerodatawrap.ZDRProtocolRemoteStorage()) {
			return;
		}

		mod._ValueZDRWrap.ZDRStorageClient().stopSync();
	},

	// SETUP

	async SetupEverything () {
		await mod.SetupStorageClient();

		await mod.SetupValueJournalsAll();

		mod._ValueIsLoading = false;
	},

	DataStorageClient (inputData) {
		return zerodatawrap.ZDRWrap({
			ZDRParamLibrary: (function() {
				if (inputData === zerodatawrap.ZDRProtocolFission()) {
					return webnative;
				}

				return RemoteStorage;
			})(),
			ZDRParamScopes: [{
				ZDRScopeKey: 'App',
				ZDRScopeDirectory: 'emojilog',
				ZDRScopeCreatorDirectory: 'rCreativ',
				ZDRScopeSchemas: [
					EMLJournal,
					EMLMemo,
					EMLSetting,
					EMLTransport,
					],
			}],
			ZDRParamDispatchError: mod.ZDRParamDispatchError,
			ZDRParamDispatchConnected: mod.ZDRParamDispatchConnected,
			ZDRParamDispatchOnline: mod.ZDRParamDispatchOnline,
			ZDRParamDispatchOffline: mod.ZDRParamDispatchOffline,
			_ZDRParamDispatchJSONPostParse: OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse,
		})
	},

	async SetupStorageClient() {
		mod._ValueZDRWrap = await mod.DataStorageClient(zerodatawrap.ZDRPreferenceProtocol(zerodatawrap.ZDRProtocolRemoteStorage()));
	},

	async SetupValueJournalsAll() {
		mod.ValueJournalsAll(await mod._ValueZDRWrap.App.EMLJournal.EMLJournalList());
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
import OLSKCloud from 'OLSKCloud';
import OLSKModalView from 'OLSKModalView';
import OLSKApropos from 'OLSKApropos';
</script>

<div class="EMLTrack OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<div class="OLSKViewportContent">
	{#if !mod._ValueJournalSelected }
		<EMLTrackMaster
			EMLTrackMasterListItems={ mod._ValueJournalsAll }
			EMLTrackMasterDispatchCreate={ mod.EMLTrackMasterDispatchCreate }
			EMLTrackMasterDispatchSelect={ mod.EMLTrackMasterDispatchSelect }
			bind:this={ mod._EMLTrackMaster }
			/>
	{/if}

	{#if mod._ValueJournalSelected && !mod._ValueFormVisible }
		<EMLBrowse
			EMLBrowseStorageClient={ mod._ValueZDRWrap }
			EMLBrowseJournalSelected={ mod._ValueJournalSelected }
			EMLBrowseJournalMemos={ mod._ValueBrowseMemos }
			EMLBrowseListDispatchCreate={ mod.EMLBrowseListDispatchCreate }
			EMLBrowseListDispatchForm={ mod.EMLBrowseListDispatchForm }
			EMLBrowseListDispatchClose={ mod.EMLBrowseListDispatchClose }
			EMLBrowseListDispatchExport={ mod.EMLBrowseListDispatchExport }
			EMLBrowseListDispatchTouch={ mod.EMLBrowseListDispatchTouch }
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
				<OLSKCloud
					OLSKCloudErrorText={ mod._ValueCloudErrorText }
					OLSKCloudDispatchRenew={ mod.OLSKCloudDispatchRenew }
					OLSKCloudFormDispatchSubmit={ mod.OLSKCloudFormDispatchSubmit }
					OLSKCloudStatusIdentityText={ mod._ValueCloudIdentity }
					OLSKCloudStatusIsSyncing={ mod._ValueIsSyncing }
					OLSKCloudStatusDispatchSyncStart={ mod.OLSKCloudStatusDispatchSyncStart }
					OLSKCloudStatusDispatchSyncStop={ mod.OLSKCloudStatusDispatchSyncStop }
					OLSKCloudStatusDispatchDisconnect={ mod.OLSKCloudStatusDispatchDisconnect }
					/>
			</div>
		</div>
	{/if}

	<OLSKAppToolbar
		OLSKAppToolbarDispatchApropos={ mod.OLSKAppToolbarDispatchApropos }
		OLSKAppToolbarDispatchTongue={ mod.OLSKAppToolbarDispatchTongue }
		OLSKAppToolbarCloudConnected={ !!mod._ValueCloudIdentity }
		OLSKAppToolbarCloudOffline={ mod._ValueCloudIsOffline }
		OLSKAppToolbarCloudError={ !!mod._ValueCloudErrorText }
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
