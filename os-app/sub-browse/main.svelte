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

	EMLBrowseChangeDelegateCreateMemo () {
		mod.ChangeDelegateCreateMemo(...arguments);
	},

	EMLBrowseChangeDelegateUpdateMemo () {
		mod.ChangeDelegateUpdateMemo(...arguments);
	},

	EMLBrowseChangeDelegateDeleteMemo () {
		mod.ChangeDelegateDeleteMemo(...arguments);
	},

	EMLBrowseRecipes () {
		return mod.DataBrowseRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';
import OLSKThrottle from 'OLSKThrottle';
import EMLBrowseLogic from './ui-logic.js';
import EMLMemo from '../_shared/EMLMemo/main.js';

const mod = {

	// VALUE

	_ValueMemoUpdateThrottleMap: {},

	// DATA

	DataIsMobile () {
		return window.innerWidth <= 760;
	},

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

	InterfaceWindowDidKeydown (event) {
		if (document.querySelector('.LCHLauncher')) { // #spec
			return;
		}

		const handlerFunctions = {
			Tab () {
				if (document.activeElement === document.querySelector('.OLSKMasterListFilterField') && mod._OLSKCatalog.modPublic.OLSKCatalogDataItemSelected()) {
					mod.ControlFocusDetail();

					return event.preventDefault();
				}

				if (document.activeElement === document.querySelector('.EMLBrowseInfoFormNotesField') && event.shiftKey) {
					mod.ControlFocusMaster();

					return event.preventDefault();
				}
			},
		};

		handlerFunctions[event.key] && handlerFunctions[event.key]();
	},

	// CONTROL

	async ControlMemoCreate(inputData) {
		const item = await EMLBrowseStorageClient.App.EMLMemo.EMLMemoCreate(mod.DataMemoObjectTemplate(), inputData);

		mod.ControlMemoSelect(mod._OLSKCatalog.modPublic.OLSKCatalogInsert(item));

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
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);
		await EMLBrowseStorageClient.App.EMLMemo.EMLMemoDelete(inputData);

		mod.ControlMemoSelect(null);
	},

	ControlFocusMaster () {
		document.querySelector('.OLSKMasterListFilterField').focus();
	},

	ControlFocusDetail () {
		document.querySelector('.EMLBrowseInfoFormNotesField').focus();
	},

	ControlMemoSelect(inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);

		if (!inputData) {
			return !mod.DataIsMobile() && mod.ControlFocusMaster();
		}

		mod._OLSKCatalog.modPublic.OLSKCatalogFocusDetail();

		setTimeout(mod.ControlFocusDetail);
	},

	// MESSAGE

	OLSKMasterListItemAccessibilitySummaryFunction (inputData) {
		EMLBrowseLogic.EMLBrowseAccessibilitySummary(inputData, OLSKLocalized);
	},

	_OLSKCatalogDispatchKey (inputData) {
		return inputData.EMLMemoID;
	},

	OLSKCatalogDispatchClick (inputData) {
		mod.ControlMemoSelect(inputData);
	},

	OLSKCatalogDispatchArrow (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogSelect(inputData);
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

	ChangeDelegateCreateMemo (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogInsert(inputData);
	},

	ChangeDelegateUpdateMemo (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogUpdate(inputData);
	},

	ChangeDelegateDeleteMemo (inputData) {
		mod._OLSKCatalog.modPublic.OLSKCatalogRemove(inputData);
	},

	// SETUP

	SetupEverything() {
		mod.SetupValueMemosAll();
		mod.SetupFocus();
	},

	SetupValueMemosAll() {
		EMLBrowseJournalMemos.map(mod._OLSKCatalog.modPublic.OLSKCatalogInsert);
	},

	SetupFocus() {
		setTimeout(function () {
			mod.ControlFocusMaster();
		});
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
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<OLSKCatalog
	bind:this={ mod._OLSKCatalog }

	OLSKMasterListItemAccessibilitySummaryFunction={ mod.OLSKMasterListItemAccessibilitySummaryFunction }

	OLSKCatalogSortFunction={ EMLBrowseLogic.EMLBrowseSortFunction }
	OLSKCatalogFilterFunction={ EMLBrowseLogic.EMLBrowseFilterFunction }
	OLSKCatalogExactFunction={ EMLBrowseLogic.EMLBrowseExactFunction }

	_OLSKCatalogDispatchKey={ mod._OLSKCatalogDispatchKey }

	OLSKCatalogDispatchClick={ mod.OLSKCatalogDispatchClick }
	OLSKCatalogDispatchArrow={ mod.OLSKCatalogDispatchArrow }
	OLSKCatalogDispatchFilterSubmit={ mod.OLSKCatalogDispatchFilterSubmit }
	OLSKCatalogDispatchQuantity={ mod.OLSKCatalogDispatchQuantity }
	OLSKCatalogDispatchEscapeOnEmpty={ EMLBrowseListDispatchClose }

	let:OLSKResultsListItem
	>

	<!-- MASTER -->
	
	<div class="OLSKToolbarElementGroup" slot="OLSKMasterListToolbarHead">
		<button class="EMLBrowseListToolbarCloseButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('EMLBrowseListToolbarCloseButtonText') } on:click={ EMLBrowseListDispatchClose }>
			<div class="EMLBrowseListToolbarCloseButtonImage">{@html OLSKUIAssets._OLSKSharedBack }</div>
		</button>
	</div>

	<div class="OLSKToolbarElementGroup" slot="OLSKMasterListToolbarTail">
		<button class="EMLBrowseListToolbarFormButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('EMLBrowseListToolbarFormButtonText') } on:click={ EMLBrowseListDispatchForm } accesskey="f">
			<div class="EMLBrowseListToolbarFormButtonImage">{@html OLSKUIAssets._OLSKSharedEdit }</div>
		</button>

		<button class="EMLBrowseListToolbarCreateButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('EMLBrowseListToolbarCreateButtonText') } on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">
			<div class="EMLBrowseListToolbarCreateButtonImage">{@html OLSKUIAssets._OLSKSharedCreate }</div>
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
