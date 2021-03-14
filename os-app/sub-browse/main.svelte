<script>
export let EMLBrowseStorageClient;

export let EMLBrowseJournalSelected;
export let EMLBrowseJournalMemos;
export let EMLBrowseListDispatchCreate;
export let EMLBrowseListDispatchForm;
export let EMLBrowseListDispatchClose;
export let EMLBrowseListDispatchTouch;
export let EMLBrowse_DEBUG = false;

export const modPublic = {

	EMLBrowseSyncCreateMemo () {
		mod.SyncCreateMemo(...arguments);
	},

	EMLBrowseSyncUpdateMemo () {
		mod.SyncUpdateMemo(...arguments);
	},

	EMLBrowseSyncDeleteMemo () {
		mod.SyncDeleteMemo(...arguments);
	},

	EMLBrowseRecipes () {
		return mod.DataBrowseRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import OLSKThrottle from 'OLSKThrottle';
import EMLBrowseLogic from './ui-logic.js';
import EMLMemo from '../_shared/EMLMemo/main.js';

const mod = {

	// VALUE

	_ValueMemoUpdateThrottleMap: {},

	// DATA

	DataMemoObjectTemplate (inputData = {}) {
		return Object.assign({
			EMLMemoEventDate: new Date(),
			EMLMemoNotes: '',
		}, inputData);
	},

	DataBrowseRecipes () {
		const items = [];

		if (OLSK_SPEC_UI()) {
			items.push(...[
				{
					LCHRecipeName: 'EMLBrowseLauncherFakeItemProxy',
					LCHRecipeCallback: function EMLBrowseLauncherFakeItemProxy () {},
				},
				{
					LCHRecipeName: 'FakeSyncCreateMemo',
					LCHRecipeCallback: async function FakeSyncCreateMemo () {
						return mod.SyncCreateMemo(await EMLBrowseStorageClient.App.EMLMemo.EMLMemoCreate(mod.DataMemoObjectTemplate({
							EMLMemoNotes: 'FakeSyncCreateMemo',
						}), EMLBrowseJournalSelected));
					},
				},
				{
					LCHRecipeName: 'FakeSyncUpdateMemo',
					LCHRecipeCallback: async function FakeSyncUpdateMemo () {
						return mod.SyncUpdateMemo(await EMLBrowseStorageClient.App.EMLMemo.EMLMemoUpdate(Object.assign(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.EMLMemoNotes.match('FakeSync');
						}).pop(), {
							EMLMemoNotes: 'FakeSyncUpdateMemo',
						})));
					},
				},
				{
					LCHRecipeName: 'FakeSyncDeleteMemo',
					LCHRecipeCallback: async function FakeSyncDeleteMemo () {
						return mod.SyncDeleteMemo(await EMLBrowseStorageClient.App.EMLMemo.EMLMemoDelete(mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.EMLMemoNotes.match('FakeSync');
						}).pop()));
					},
				},
				{
					LCHRecipeName: 'FakeSyncConflictMemo',
					LCHRecipeCallback: async function FakeSyncConflictMemo () {
						const item = mod._OLSKCatalog.modPublic._OLSKCatalogDataItemsAll().filter(function (e) {
							return e.EMLMemoNotes.match('FakeSyncConflictMemo');
						}).pop();
						
						return mod.SyncConflictMemo({
							origin: 'conflict',
							oldValue: JSON.parse(JSON.stringify(await EMLBrowseStorageClient.App.EMLMemo.EMLMemoUpdate(Object.assign({}, item, {
								EMLMemoNotes: item.EMLMemoNotes + '-local',
							})))),
							newValue: JSON.parse(JSON.stringify(Object.assign({}, item, {
								EMLMemoNotes: item.EMLMemoNotes + '-remote',
							}))),
						});
					},
				},
			]);
		}

		if (mod._EMLBrowseInfo) {
			items.push(...mod._EMLBrowseInfo.modPublic.EMLBrowseInfoRecipes());
		}
		
		return items;
	},

	// INTERFACE	

	InterfaceCreateButtonDidClick () {
		mod.ControlMemoCreate(EMLBrowseJournalSelected);
	},

	// CONTROL

	async ControlMemoCreate(inputData) {
		const item = await EMLBrowseStorageClient.App.EMLMemo.EMLMemoCreate(mod.DataMemoObjectTemplate(), inputData);

		mod.ControlMemoActivate(mod._OLSKCatalog.modPublic.OLSKCatalogInsert(item));

		EMLBrowseListDispatchCreate(item);
		
		EMLBrowseListDispatchTouch(item.EMLMemoCreationDate);
	},

	ControlMemoUpdate(inputData) {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueMemoUpdateThrottleMap, inputData.EMLMemoID, {
			OLSKThrottleDuration: OLSK_SPEC_UI() ? 0 : 500,
			OLSKThrottleCallback () {
				return EMLBrowseStorageClient.App.EMLMemo.EMLMemoUpdate(inputData);
			},
		});
	},

	async ControlMemoDiscard (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(await EMLBrowseStorageClient.App.EMLMemo.EMLMemoDelete(inputData));
	},

	ControlMemoActivate(inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);

		mod._OLSKCatalog.modPublic.OLSKCatalogFocusDetail();
		
		mod._OLSKCatalog.modPublic.OLSKCatalogActivateDetail();
	},

	// MESSAGE

	OLSKMasterListItemAccessibilitySummaryFunction (inputData) {
		EMLBrowseLogic.EMLBrowseAccessibilitySummary(inputData, OLSKLocalized);
	},

	_OLSKCatalogDispatchKey (inputData) {
		return inputData.EMLMemoID;
	},

	OLSKCatalogDispatchClick (inputData) {
		mod.ControlMemoActivate(inputData);
	},

	OLSKCatalogDispatchArrow (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);
	},

	OLSKCatalogDispatchDetailActivate () {
		document.querySelector('.EMLBrowseInfoFormNotesField').focus();
	},

	OLSKCatalogDispatchMasterShouldActivate () {
		return document.activeElement === document.querySelector('.EMLBrowseInfoFormNotesField');
	},

	OLSKCatalogDispatchQuantity (inputData) {},

	EMLBrowseInfoDispatchBack () {
		mod._OLSKCatalog.modPublic.OLSKCatalogFocusMaster();
	},

	EMLBrowseInfoDispatchDiscard () {
		mod.ControlMemoDiscard(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected());
	},

	EMLBrowseInfoDispatchUpdate () {
		mod.ControlMemoUpdate(mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected()));
	},

	EMLBrowseInfoDispatchDebug (inputData) {
		const url = `https://inspektor.5apps.com/?path=emojilog%2F${ encodeURIComponent(EMLMemo.EMLMemoFolderPath(inputData)) }`;

		if (OLSK_SPEC_UI()) {
			window.FakeWindowOpen = url;
			return;
		}

		window.open(url)
	},

	_OLSKAppToolbarDispatchLauncher () {
		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataBrowseRecipes(),
		});
	},

	SyncCreateMemo (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogInsert(inputData);
	},

	SyncUpdateMemo (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(inputData);
	},

	SyncDeleteMemo (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);
	},

	async SyncConflictMemo (inputData) {
		setTimeout(async function () {
			mod.SyncUpdateMemo(await EMLBrowseStorageClient.App.EMLMemo.EMLMemoUpdate(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(OLSKRemoteStorage.OLSKRemoteStorageChangeDelegateConflictSelectRecent(inputData))));
		}, OLSK_SPEC_UI() ? 0 : 500);
	},

	// SETUP

	SetupEverything() {
		mod.SetupValueMemosAll();
	},

	SetupValueMemosAll() {
		EMLBrowseJournalMemos.map(mod._OLSKCatalog.modPublic.OLSKCatalogInsert);
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import OLSKCatalog from 'OLSKCatalog';
import EMLBrowseListItem from './submodules/EMLBrowseListItem/main.svelte';
import EMLBrowseInfo from './submodules/EMLBrowseInfo/main.svelte';
import OLSKUIAssets from 'OLSKUIAssets';
</script>

<OLSKCatalog
	bind:this={ mod._OLSKCatalog }

	OLSKMasterListItemAccessibilitySummaryFunction={ mod.OLSKMasterListItemAccessibilitySummaryFunction }

	OLSKCatalogSortFunction={ EMLBrowseLogic.EMLBrowseSortFunction }
	OLSKCatalogFilterFunction={ EMLBrowseLogic.EMLBrowseFilterFunction }
	OLSKCatalogExactFunction={ EMLBrowseLogic.EMLBrowseExactFunction }

	_OLSKCatalogDispatchKey={ mod._OLSKCatalogDispatchKey }

	OLSKCatalogDispatchClick={ mod.OLSKCatalogDispatchClick }
	OLSKCatalogDispatchArrow={ mod.OLSKCatalogDispatchArrow }
	OLSKCatalogDispatchDetailActivate={ mod.OLSKCatalogDispatchDetailActivate }
	OLSKCatalogDispatchMasterShouldActivate={ mod.OLSKCatalogDispatchMasterShouldActivate }
	OLSKCatalogDispatchFilterSubmit={ mod.OLSKCatalogDispatchFilterSubmit }
	OLSKCatalogDispatchQuantity={ mod.OLSKCatalogDispatchQuantity }
	OLSKCatalogDispatchEscapeOnEmpty={ EMLBrowseListDispatchClose }

	let:OLSKResultsListItem
	>

	<!-- MASTER -->
	
	<div class="OLSKToolbarElementGroup" slot="OLSKMasterListToolbarHead">
		<button class="EMLBrowseCloseButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('EMLBrowseCloseButtonText') } on:click={ EMLBrowseListDispatchClose }>
			<div class="EMLBrowseCloseButtonImage">{@html OLSKUIAssets._OLSKSharedBack }</div>
		</button>
	</div>

	<div class="OLSKToolbarElementGroup" slot="OLSKMasterListToolbarTail">
		<button class="EMLBrowseFormButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('EMLBrowseFormButtonText') } on:click={ EMLBrowseListDispatchForm } accesskey="f">
			<div class="EMLBrowseFormButtonImage">{@html OLSKUIAssets._OLSKSharedEdit }</div>
		</button>

		<button class="EMLBrowseCreateButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('EMLBrowseCreateButtonText') } on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">
			<div class="EMLBrowseCreateButtonImage">{@html OLSKUIAssets._OLSKSharedCreate }</div>
		</button>
	</div>

	<!-- LIST ITEM -->

	<div slot="OLSKMasterListItem">
		<EMLBrowseListItem EMLBrowseListItemObject={ OLSKResultsListItem } />
	</div>

	<!-- DETAIL -->
	
	<div class="EMLBrowseDetailContainer" slot="OLSKCatalogDetailContent" let:OLSKCatalogItemSelected>
		<EMLBrowseInfo
			EMLBrowseInfoItem={ OLSKCatalogItemSelected }
			EMLBrowseInfoDispatchBack={ mod.EMLBrowseInfoDispatchBack }
			EMLBrowseInfoDispatchDiscard={ mod.EMLBrowseInfoDispatchDiscard }
			EMLBrowseInfoDispatchUpdate={ mod.EMLBrowseInfoDispatchUpdate }
			EMLBrowseInfoDispatchDebug={ mod.EMLBrowseInfoDispatchDebug }
			bind:this={ mod._EMLBrowseInfo }
			/>
	</div>

</OLSKCatalog>

{#if OLSK_SPEC_UI() && EMLBrowse_DEBUG }
	 <button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}
