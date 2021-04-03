<script>
import { OLSKLocalized } from 'OLSKInternational';
import OLSKThrottle from 'OLSKThrottle';
import { OLSK_SPEC_UI } from 'OLSKSpec'
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import OLSKObject from 'OLSKObject';
import zerodatawrap from 'zerodatawrap';
import OLSKServiceWorker from 'OLSKServiceWorker';
import EMLJournal from '../_shared/EMLJournal/main.js';
import EMLMemo from '../_shared/EMLMemo/main.js';
import EMLSetting from '../_shared/EMLSetting/main.js';
import EMLTransport from '../_shared/EMLTransport/main.js';
import RemoteStorage from 'remotestoragejs';
import OLSKString from 'OLSKString';
import OLSKLanguageSwitcher from 'OLSKLanguageSwitcher';
import OLSKFund from 'OLSKFund';
import OLSKPact from 'OLSKPact';
import OLSKTransport from 'OLSKTransport';
import EMLTrackLogic from './ui-logic.js';
import EMLTrackMasterLogic from './submodules/EMLTrackMaster/ui-logic.js';
import OLSKChain from 'OLSKChain';

import OLSKCollectionLogic from 'OLSKCollection/logic';

const mod = {

	// VALUE

	_ValueIsLoading: true,

	_ValueJournalsAll: [],

	_ValueJournalSelected: undefined,
	ValueJournalSelected (inputData) {
		mod._ValueJournalSelected = inputData

		if (mod._ValueJournalSelected) {
			return;
		}

		mod._ValueBrowseMemos = [];
	},
	
	_ValueBrowseMemos: [],
	ValueBrowseMemos (inputData) {
		mod._ValueBrowseMemos = inputData;
	},

	_ValueCloudToolbarHidden: true,

	_ValueSaveThrottleMap: {},

	_ValueOLSKFundProgress: false,

	_ValueDocumentRemainder: '',

	// DATA

	DataNavigator () {
		return navigator.serviceWorker ? navigator : {
			serviceWorker: {},
		};
	},

	DataJournalObjectTemplate (inputData = {}) {
		return Object.assign({
			EMLJournalName: '',
			EMLJournalChildCount: 0,
		}, inputData);
	},

	async DataSettingValue (inputData) {
		return ((await mod._ValueZDRWrap.App.EMLSetting.EMLSettingList()).filter(function (e) {
			return e.EMLSettingKey === inputData;
		}).pop() || {}).EMLSettingValue;
	},

	DataIsEligible (inputData = {}) {
		return OLSKFund.OLSKFundIsEligible(Object.assign({
			ParamMinimumTier: 1,
			ParamCurrentProject: 'RP_007',
			ParamBundleProjects: ['FakeBundleProject'],
			ParamGrantTier: OLSKFund.OLSKFundTier('OLSK_FUND_PRICING_STRING_SWAP_TOKEN', mod._ValueOLSKFundGrant),
			ParamGrantProject: mod._ValueOLSKFundGrant ? mod._ValueOLSKFundGrant.OLSKPactGrantProject : '',
		}, inputData));
	},

	DataTrackRecipes () {
		const items = [];

		items.push(...OLSKFund.OLSKFundRecipes({
			ParamWindow: window,
			OLSKLocalized: OLSKLocalized,
			ParamConnected: !!mod._ValueCloudIdentity,
			ParamAuthorized: !!mod._ValueFundClue,
			OLSKFundDispatchGrant: mod.OLSKFundDispatchGrant,
			OLSKFundDispatchPersist: mod.OLSKFundDispatchPersist,
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		items.push(...zerodatawrap.ZDRRecipes({
			ParamMod: mod,
			ParamSpecUI: OLSK_SPEC_UI(),
		}));

		items.push(...OLSKTransport.OLSKTransportRecipes({
			ParamWindow: window,
			OLSKLocalized: OLSKLocalized,
			OLSKTransportDispatchImportJSON: mod.OLSKTransportDispatchImportJSON,
			OLSKTransportDispatchExportInput: mod.OLSKTransportDispatchExportInput,
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

			items.push({
				LCHRecipeSignature: 'EMLTrackLauncherItemExportSelectedJSON',
				LCHRecipeName: OLSKLocalized('EMLTrackLauncherItemExportSelectedJSONText'),
				LCHRecipeCallback: async function EMLTrackLauncherItemExportSelectedJSON () {
					return this.api.OLSKTransportLauncherItemExportJSON(await mod._OLSKTransportDispatchExportInput([mod._ValueJournalSelected]))
				},
			});
		}

		if (OLSK_SPEC_UI()) {
			items.push(...[
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncCreateJournal',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncCreateJournal () {
						return mod.ZDRSchemaDispatchSyncCreateJournal(await mod._ValueZDRWrap.App.EMLJournal.EMLJournalCreate(mod.DataJournalObjectTemplate({
							EMLJournalName: 'FakeZDRSchemaDispatchSyncCreateJournal',
						})));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncUpdateJournal',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncUpdateJournal () {
						return mod.ZDRSchemaDispatchSyncUpdateJournal(await mod._ValueZDRWrap.App.EMLJournal.EMLJournalUpdate(Object.assign(mod._ValueJournalSelected || mod._EMLTrackMaster.modPublic.OLSKCollectionDataItemsAll().filter(function (e) {
							return e.EMLJournalName.match('FakeZDRSchemaDispatchSync');
						}).pop(), {
							EMLJournalName: 'FakeZDRSchemaDispatchSyncUpdateJournal',
						})));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncDeleteJournal',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncDeleteJournal () {
						return mod.ZDRSchemaDispatchSyncDeleteJournal(await mod._ValueZDRWrap.App.EMLJournal.ZDRModelDeleteObject(mod._ValueJournalSelected || mod._EMLTrackMaster.modPublic.OLSKCollectionDataItemsAll().filter(function (e) {
							return e.EMLJournalName.match('FakeZDRSchemaDispatchSync');
						}).pop()));
					},
				},
				{
					LCHRecipeName: 'FakeZDRSchemaDispatchSyncConflictJournal',
					LCHRecipeCallback: async function FakeZDRSchemaDispatchSyncConflictJournal () {
						const item = mod._ValueJournalSelected || mod._EMLTrackMaster.modPublic.OLSKCollectionDataItemsAll().filter(function (e) {
							return e.EMLJournalName.match('FakeZDRSchemaDispatchSyncConflictJournal');
						}).pop();
						
						return mod.ZDRSchemaDispatchSyncConflictJournal({
							origin: 'conflict',
							oldValue: JSON.parse(JSON.stringify(await mod._ValueZDRWrap.App.EMLJournal.EMLJournalUpdate(Object.assign({}, item, {
								EMLJournalName: item.EMLJournalName + '-local',
							})))),
							newValue: JSON.parse(JSON.stringify(Object.assign(Object.assign({}, item), {
								EMLJournalName: item.EMLJournalName + '-remote',
							}))),
						});
					},
				},
				{
					LCHRecipeName: 'EMLTrackLauncherItemDebug_AlertFakeExportSelectedSerialized',
					LCHRecipeCallback: async function EMLTrackLauncherItemDebug_AlertFakeExportSelectedSerialized () {
						return this.api.OLSKTransportLauncherFakeItemExportSerialized(await mod._OLSKTransportDispatchExportInput([mod._ValueJournalSelected]));
					},
				},
				{
					LCHRecipeName: 'FakeFundDocumentLimit',
					LCHRecipeCallback: async function FakeFundDocumentLimit () {
						await mod._ValueZDRWrap.App.EMLJournal.EMLJournalCreate({
							EMLJournalName: Math.random().toString(),
							EMLJournalChildCount: mod._ValueDocumentRemainder,
						});

						return mod.SetupValueJournalsAll();
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

	ControlFundGate () {
		if (!window.confirm(OLSKLocalized('OLSKFundGateText'))) {
			return;
		}

		mod.OLSKAppToolbarDispatchFund();
	},

	async ControlJournalCreate() {
		const item = await mod._ValueZDRWrap.App.EMLJournal.EMLJournalCreate(mod.DataJournalObjectTemplate());

		mod._EMLTrackMaster.modPublic.OLSKCollectionInsert(item);

		mod.ControlJournalSelect(item);
	},
	
	ControlJournalSelect(inputData) {
		mod.ValueJournalSelected(inputData);
	},
	
	async ControlJournalDiscard (inputData) {
		await mod._ValueZDRWrap.App.EMLJournal.EMLJournalDelete(inputData);

		mod._ValueCollectionAPI.OLSKCollectionRemove(inputData);

		mod.ControlJournalSelect(null);

		setTimeout(function () { // #hotfix-force-update
			mod._EMLTrackMaster && mod._EMLTrackMaster.modPublic.OLSKCollectionSort();
		});
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
				ParamRouteConstant: window.OLSKPublicConstants('OLSKSharedActiveRouteConstant'),
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
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	OLSKAppToolbarDispatchFund () {
		if (!mod._ValueCloudIdentity) {
			return mod._OLSKAppToolbarDispatchFundNotConnected();
		}

		mod._ValueFundURL = OLSKFund.OLSKFundURL({
			ParamFormURL: 'OLSK_FUND_FORM_URL_SWAP_TOKEN',
			ParamProject: 'RP_007',
			ParamIdentity: mod._ValueCloudIdentity,
			ParamHomeURL: window.location.origin + window.location.pathname,
		});

		mod._OLSKWebView.modPublic.OLSKModalViewShow();

		OLSKFund.OLSKFundListen({
			ParamWindow: window,
			OLSKFundDispatchReceive: mod.OLSKFundDispatchReceive,
		});
	},

	_OLSKAppToolbarDispatchFundNotConnected () {
		if (!window.confirm(OLSKLocalized('OLSKRemoteStorageConnectConfirmText'))) {
			return;
		}

		mod._ValueCloudToolbarHidden = false;
	},

	OLSKAppToolbarDispatchCloud () {
		mod._ValueCloudToolbarHidden = !mod._ValueCloudToolbarHidden;
	},

	OLSKAppToolbarDispatchLauncher () {
		if (window.Launchlet.LCHSingletonExists()) {
			return window.Launchlet.LCHSingletonDestroy();
		}

		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataTrackRecipes(),
			LCHOptionLanguage: window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage'),
		});
	},

	EMLTrackMasterDispatchCreate () {
		mod._ValueShowTemplateForm = true;

		mod.ControlJournalCreate();
	},

	async OLSKCollectionDispatchClick (inputData) {
		mod._ValueShowTemplateForm = false;
		
		mod.ValueBrowseMemos(await mod._ValueZDRWrap.App.EMLMemo.EMLMemoList(inputData));
		
		mod.ControlJournalSelect(inputData);
	},

	EMLBrowseDispatchEligible () {
		if (mod._ValueDocumentRemainder < 1 && !mod.DataIsEligible()) {
			return mod.ControlFundGate();
		}

		return true;
	},

	EMLBrowseListDispatchClose () {
		mod.ControlJournalSelect(null);

		setTimeout(function () { // #hotfix-force-update
			mod._EMLTrackMaster.modPublic.OLSKCollectionSort();
		});
	},
	
	EMLBrowseListDispatchTouch (EMLJournalTouchDate) {
		mod.ControlJournalSave(Object.assign(mod._ValueJournalSelected, {
			EMLJournalTouchDate,
		}));
	},

	OLSKCatalogDispatchQuantity (EMLJournalChildCount) {
		mod.ControlJournalSave(Object.assign(mod._ValueJournalSelected, {
			EMLJournalChildCount,
		}));

		mod.ReactDocumentRemainder();
	},

	EMLTemplateDispatchUpdate () {
		mod._ValueJournalSelected = mod._ValueJournalSelected; // #purge-svelte-force-update
		
		mod.ControlJournalSave(mod._ValueJournalSelected);
	},

	EMLTemplateDispatchDiscard (inputData) {
		mod.ControlJournalDiscard(inputData);
	},

	async OLSKTransportDispatchImportJSON (inputData) {
		await mod._ValueZDRWrap.App.EMLTransport.EMLTransportImport(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(inputData));
		await mod.SetupValueJournalsAll();
	},

	async _OLSKTransportDispatchExportInput (EMLJournal) {
		return mod._ValueZDRWrap.App.EMLTransport.EMLTransportExport({
			EMLJournal,
			EMLSetting: await mod._ValueZDRWrap.App.EMLSetting.EMLSettingList(),
		});
	},

	OLSKTransportDispatchExportInput () {
		return mod._OLSKTransportDispatchExportInput(mod._ValueJournalsAll);
	},

	ZDRSchemaDispatchSyncCreateJournal (inputData) {
		OLSKChain.OLSKChainGather(mod._EMLTrackMaster ? mod._EMLTrackMaster.modPublic : mod._ValueCollectionAPI).OLSKCollectionInsert(inputData).OLSKCollectionSort()
			.OLSKChainExecute();
	},

	ZDRSchemaDispatchSyncUpdateJournal (inputData) {
		if ((mod._ValueJournalSelected || {}).EMLJournalID === inputData.EMLJournalID) {
			mod.ControlJournalSelect(inputData);
		}

		OLSKChain.OLSKChainGather(mod._EMLTrackMaster ? mod._EMLTrackMaster.modPublic : mod._ValueCollectionAPI).OLSKCollectionUpdate(inputData).OLSKCollectionSort()
			.OLSKChainExecute();
	},

	ZDRSchemaDispatchSyncDeleteJournal (inputData) {
		if ((mod._ValueJournalSelected || {}).EMLJournalID === inputData.EMLJournalID) {
			mod.ControlJournalSelect(null);
		}

		OLSKChain.OLSKChainGather(mod._EMLTrackMaster ? mod._EMLTrackMaster.modPublic : mod._ValueCollectionAPI).OLSKCollectionRemove(inputData).OLSKCollectionSort()
			.OLSKChainExecute();
	},

	async ZDRSchemaDispatchSyncConflictJournal (inputData) {
		return setTimeout(async function () {
			mod.ZDRSchemaDispatchSyncUpdateJournal(await mod._ValueZDRWrap.App.EMLJournal.EMLJournalUpdate(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateConflictSelectRecent(inputData))));
		}, OLSK_SPEC_UI() ? 0 : 500);
	},

	ZDRSchemaDispatchSyncCreateMemo (inputData) {
		mod._ZDRSchemaDispatchSync(inputData, 'EMLBrowseSyncCreateMemo');
	},

	ZDRSchemaDispatchSyncUpdateMemo (inputData) {
		mod._ZDRSchemaDispatchSync(inputData, 'EMLBrowseSyncUpdateMemo');
	},

	ZDRSchemaDispatchSyncDeleteMemo (inputData) {
		mod._ZDRSchemaDispatchSync(inputData, 'EMLBrowseSyncDeleteMemo');
	},

	ZDRSchemaDispatchSyncConflictMemo (inputData) {
		mod._ZDRSchemaDispatchSync(inputData, 'EMLBrowseSyncConflictMemo');
	},

	_ZDRSchemaDispatchSync (object, method) {
		mod._EMLBrowse && (object.EMLMemoJournalID === mod._ValueJournalSelected.EMLJournalID) && mod._EMLBrowse.modPublic[method](object);
	},

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

	OLSKFundDispatchReceive (inputData) {
		mod._OLSKWebView.modPublic.OLSKModalViewClose();

		return mod.OLSKFundDispatchPersist(inputData);
	},

	OLSKFundDispatchPersist (inputData) {
		mod._ValueFundClue = inputData;

		if (!inputData) {
			return mod._ValueZDRWrap.App.EMLSetting.ZDRModelDeleteObject({
				EMLSettingKey: 'EMLSettingFundClue',
			});
		}

		return mod._ValueZDRWrap.App.EMLSetting.ZDRModelWriteObject({
			EMLSettingKey: 'EMLSettingFundClue',
			EMLSettingValue: inputData,
		}).then(function () {
			if (OLSK_SPEC_UI()) {
				return;
			}
			setTimeout(function () {
				window.location.reload();
			}, mod._ValueZDRWrap.ZDRStorageProtocol === zerodatawrap.ZDRProtocolFission() ? 1000 : 0); // #hotfix-fission-delay
		});
	},

	OLSKFundDispatchProgress (inputData) {
		mod._ValueOLSKFundProgress = inputData;
	},

	OLSKFundDispatchFail () {
		mod.OLSKFundDispatchPersist(null);
	},

	OLSKFundDispatchGrant (inputData) {
		mod._ValueOLSKFundGrant = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(inputData);
	},

	// REACT

	ReactDocumentRemainder () {
		mod._ValueDocumentRemainder = OLSKFund.OLSKFundRemainder(EMLTrackLogic.EMLTrackDocumentCount(mod._ValueJournalsAll), parseInt('EML_FUND_DOCUMENT_LIMIT_SWAP_TOKEN'));
	},

	// SETUP

	async SetupEverything () {
		await mod.SetupStorageClient();

		await mod.SetupValueJournalsAll();

		mod.SetupCollectionAPI();

		mod.SetupFund();

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
					Object.assign(EMLJournal, {
						ZDRSchemaDispatchSyncCreate: mod.ZDRSchemaDispatchSyncCreateJournal,
						ZDRSchemaDispatchSyncUpdate: mod.ZDRSchemaDispatchSyncUpdateJournal,
						ZDRSchemaDispatchSyncDelete: mod.ZDRSchemaDispatchSyncDeleteJournal,
						ZDRSchemaDispatchSyncConflict: mod.ZDRSchemaDispatchSyncConflictJournal,
					}),
					Object.assign(EMLMemo, {
						ZDRSchemaDispatchSyncCreate: mod.ZDRSchemaDispatchSyncCreateMemo,
						ZDRSchemaDispatchSyncUpdate: mod.ZDRSchemaDispatchSyncUpdateMemo,
						ZDRSchemaDispatchSyncDelete: mod.ZDRSchemaDispatchSyncDeleteMemo,
						ZDRSchemaDispatchSyncConflict: mod.ZDRSchemaDispatchSyncConflictMemo,
					}),
					EMLSetting,
					EMLTransport,
					],
			}],
			ZDRParamDispatchError: mod.ZDRParamDispatchError,
			ZDRParamDispatchConnected: mod.ZDRParamDispatchConnected,
			ZDRParamDispatchOnline: mod.ZDRParamDispatchOnline,
			ZDRParamDispatchOffline: mod.ZDRParamDispatchOffline,
			_ZDRParamDispatchJSONPreStringify: OLSKObject.OLSKObjectSafeCopy,
			_ZDRParamDispatchJSONPostParse: OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse,
		})
	},

	async SetupStorageClient() {
		mod._ValueZDRWrap = await mod.DataStorageClient(zerodatawrap.ZDRPreferenceProtocol(zerodatawrap.ZDRProtocolRemoteStorage()));
	},

	async SetupValueJournalsAll() {
		if (zerodatawrap.ZDRPreferenceProtocolMigrate()) {
			const client = await mod.DataStorageClient(zerodatawrap.ZDRPreferenceProtocolMigrate());

			await Promise.all((await client.App.ZDRStoragePathsRecursive('/')).map(async function (e) {
				await mod._ValueZDRWrap.App.ZDRStorageWriteObject(e, await client.App.ZDRStorageReadObject(e));
				await client.App.ZDRStorageDeleteFile(e);
			}));

			zerodatawrap.ZDRPreferenceProtocolMigrateClear();

			client.ZDRCloudDisconnect();
		};

		(await mod._ValueZDRWrap.App.EMLJournal.EMLJournalList()).map(function (e) {
			return mod._ValueJournalsAll.push(e);
		});
		
		mod._EMLTrackMaster.modPublic.OLSKCollectionSort();

		mod.ReactDocumentRemainder();
	},

	SetupCollectionAPI () {
		mod._ValueCollectionAPI = OLSKCollectionLogic.OLSKCollectionAPI({
			OLSKCollectionItems: mod._ValueJournalsAll,

			_OLSKCollectionKeyFunction: (function (inputData) {
				return inputData.EMLJournalID;
			}),
			OLSKCollectionSortFunction: EMLTrackMasterLogic.EMLTrackMasterSort,
		});
	},

	async SetupFund () {
		if (OLSK_SPEC_UI() && window.location.search.match('FakeOLSKFundResponseIsPresent=true')) {
			OLSKFund._OLSKFundFakeGrantResponseRandom();
		}

		mod._ValueFundClue = await mod.DataSettingValue('EMLSettingFundClue');

		await OLSKFund.OLSKFundSetupPostPay({
			ParamWindow: window,
			ParamExistingClue: mod._ValueFundClue || null,
			OLSKFundDispatchPersist: mod.OLSKFundDispatchPersist,
		});

		if (!mod._ValueCloudIdentity) {
			return;
		}

		if (!mod._ValueFundClue) {
			return;
		}

		const item = {
			OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE: `OLSK_CRYPTO_PAIR_RECEIVER_PRIVATE_SWAP_TOKEN${ '' }`, // #purge
			OLSK_CRYPTO_PAIR_SENDER_PUBLIC: 'OLSK_CRYPTO_PAIR_SENDER_PUBLIC_SWAP_TOKEN',
			ParamWindow: window,
			OLSK_FUND_API_URL: 'OLSK_FUND_API_URL_SWAP_TOKEN',
			ParamBody: {
				OLSKPactAuthType: mod._ValueZDRWrap.ZDRStorageProtocol === zerodatawrap.ZDRProtocolRemoteStorage() ? OLSKPact.OLSKPactAuthTypeRemoteStorage() : OLSKPact.OLSKPactAuthTypeFission(),
				OLSKPactAuthIdentity: mod._ValueCloudIdentity,
				OLSKPactAuthProof: mod._ValueCloudToken,
				OLSKPactAuthMetadata: {
					OLSKPactAuthMetadataModuleName: 'emojilog',
					OLSKPactAuthMetadataFolderPath: EMLJournal.EMLJournalDirectory() + '/',
				},
				OLSKPactPayIdentity: mod._ValueCloudIdentity,
				OLSKPactPayClue: mod._ValueFundClue,
			},
			OLSKLocalized,
			OLSKFundDispatchProgress: mod.OLSKFundDispatchProgress,
			OLSKFundDispatchFail: mod.OLSKFundDispatchFail,
			OLSKFundDispatchGrant: mod.OLSKFundDispatchGrant,
		};

		return OLSKFund.OLSKFundSetupGrant(item);
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import EMLTrackMaster from './submodules/EMLTrackMaster/main.svelte';
import EMLBrowse from '../sub-browse/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorkerView from '../_shared/__external/OLSKServiceWorker/main.svelte';
import OLSKInstall from 'OLSKInstall';
import OLSKCloud from 'OLSKCloud';
import OLSKWebView from 'OLSKWebView';
import OLSKModalView from 'OLSKModalView';
import OLSKApropos from 'OLSKApropos';
</script>

<div class="EMLTrack OLSKViewport" class:OLSKIsLoading={ mod._ValueIsLoading }>

<div class="OLSKViewportContent">
	{#if !mod._ValueJournalSelected }
		<EMLTrackMaster
			EMLTrackMasterDispatchCreate={ mod.EMLTrackMasterDispatchCreate }
			OLSKCollectionItems={ mod._ValueJournalsAll }
			OLSKCollectionDispatchClick={ mod.OLSKCollectionDispatchClick }
			bind:this={ mod._EMLTrackMaster }
			/>
	{:else}
		<EMLBrowse
			EMLBrowseStorageClient={ mod._ValueZDRWrap }
			EMLBrowseJournal={ mod._ValueJournalSelected }
			EMLBrowseMemos={ mod._ValueBrowseMemos }
			EMLBrowseShowTemplateForm={ mod._ValueShowTemplateForm }
			EMLBrowseListDispatchClose={ mod.EMLBrowseListDispatchClose }
			EMLBrowseListDispatchTouch={ mod.EMLBrowseListDispatchTouch }
			EMLBrowseDispatchEligible={ mod.EMLBrowseDispatchEligible }
			OLSKCatalogDispatchQuantity={ mod.OLSKCatalogDispatchQuantity }
			EMLTemplateDispatchDiscard={ mod.EMLTemplateDispatchDiscard }
			EMLTemplateDispatchUpdate={ mod.EMLTemplateDispatchUpdate }
			bind:this={ mod._EMLBrowse }
			/>
	{/if}
</div>

<footer class="EMLTrackViewportFooter OLSKMobileViewFooter">
	{#if !mod._ValueCloudToolbarHidden }
		<div class="EMLTrackCloudToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeTop">
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
		OLSKAppToolbarGuideURL={ window.OLSKCanonical('EMLGuideRoute') }
		OLSKAppToolbarFundShowProgress={ mod._ValueOLSKFundProgress }
		OLSKAppToolbarFundLimitText={ mod._ValueDocumentRemainder }
		OLSKAppToolbarCloudConnected={ !!mod._ValueCloudIdentity }
		OLSKAppToolbarCloudOffline={ mod._ValueCloudIsOffline }
		OLSKAppToolbarCloudError={ !!mod._ValueCloudErrorText }
		OLSKAppToolbarDispatchFund={ mod._ValueOLSKFundGrant || OLSKFund.OLSKFundResponseIsPresent() ? null : mod.OLSKAppToolbarDispatchFund }
		OLSKAppToolbarDispatchCloud={ mod.OLSKAppToolbarDispatchCloud }
		OLSKAppToolbarDispatchLauncher={ mod.OLSKAppToolbarDispatchLauncher }
		/>

	<OLSKInstall />

	{#if !OLSK_SPEC_UI()}
		<OLSKServiceWorkerView OLSKServiceWorkerRegistrationRoute={ window.OLSKCanonical('EMLServiceWorkerRoute') } />
	{/if}
</footer>

{#if !!mod._ValueCloudIdentity }
	<OLSKWebView OLSKModalViewTitleText={ OLSKLocalized('OLSKFundWebViewTitleText') } OLSKWebViewURL={ mod._ValueFundURL } bind:this={ mod._OLSKWebView } DEBUG_OLSKWebViewDataSource={ OLSK_SPEC_UI() } />
{/if}

<OLSKModalView OLSKModalViewTitleText={ OLSKLocalized('OLSKAproposHeadingText') } bind:this={ mod._OLSKModalView } OLSKModalViewIsCapped={ true }>
	<OLSKApropos
		OLSKAproposFeedbackValue={ `javascript:window.location.href = window.atob('${ window.btoa(OLSKString.OLSKStringFormatted(window.atob('OLSK_APROPOS_FEEDBACK_EMAIL_SWAP_TOKEN'), 'RP_007' + (mod._ValueFundClue ? '+' + mod._ValueFundClue : ''))) }')` }
		/>
</OLSKModalView>

</div>

<style src="./ui-style.css"></style>
