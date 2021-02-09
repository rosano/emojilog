<script>
export let EMLBrowseStorageClient;

export let EMLBrowseJournalSelected;
export let EMLBrowseJournalMemos;
export let EMLBrowseDispatchCreate;
export let EMLBrowseListDispatchForm;
export let EMLBrowseListDispatchClose;

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
import EMLMemoAction from '../_shared/EMLMemo/action.js';
import EMLMemoStorage from '../_shared/EMLMemo/storage.js';

const mod = {

	// VALUE

	_ValueMemosAll: EMLBrowseJournalMemos,
	ValueMemosAll (inputData, shouldSort = true) {
		mod.ValueMemosVisible(mod._ValueMemosAll = inputData, shouldSort);
	},

	_ValueMemosVisible: [],
	ValueMemosVisible (inputData, shouldSort = true) {
		const items = !mod._ValueFilterText ? inputData : inputData.filter(EMLBrowseLogic.EMLBrowseFilterFunction(mod._ValueFilterText));
		mod._ValueMemosVisible = shouldSort ? items.sort(EMLBrowseLogic.EMLBrowseSort) : items;
	},
	
	_ValueMemoSelected: undefined,
	ValueMemoSelected (inputData) {
		mod._ValueMemoSelected = inputData;

		if (!inputData) {
			mod.OLSKMobileViewInactive = false;	
		}
	},
	
	_ValueFilterText: '',

	_ValueMemoUpdateThrottleMap: {},

	OLSKMobileViewInactive: false,

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
					LCHRecipeName: 'FakeEscapeWithoutSort',
					LCHRecipeCallback: function FakeEscapeWithoutSort () {
						mod.ControlMemoSelect(null);
					},
				},
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

	InterfaceWindowDidKeydown (event) {
		if (document.querySelector('.LCHLauncher')) { // #spec
			return;
		}

		const handlerFunctions = {
			Escape () {
				if (document.activeElement === document.querySelector('.OLSKMasterListFilterField') && !mod._ValueFilterText) {
					return EMLBrowseListDispatchClose();
				}

				mod.ControlFilter('');

				if (!OLSK_SPEC_UI()) {
					document.querySelector('.OLSKMasterListBody').scrollTo(0, 0);
				}
			},
			Tab () {
				if (document.activeElement === document.querySelector('.OLSKMasterListFilterField') && mod._ValueMemoSelected) {
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
		const item = await EMLMemoAction.EMLMemoActionCreate(EMLBrowseStorageClient, mod.DataMemoObjectTemplate(), inputData);

		mod.ValueMemosAll(mod._ValueMemosAll.concat(item));

		mod.ControlMemoSelect(item);

		EMLBrowseDispatchCreate(item);
	},

	ControlMemoUpdate(param1, param2) {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueMemoUpdateThrottleMap, param1.EMLMemoID, {
			OLSKThrottleDuration: OLSK_SPEC_UI() ? 0 : 500,
			OLSKThrottleCallback () {
				return EMLMemoAction.EMLMemoActionUpdate(EMLBrowseStorageClient, param1, param2);
			},
		});
	},

	async ControlMemoDiscard (param1, param2) {
		mod.ValueMemosAll(mod._ValueMemosAll.filter(function (e) {
			return e !== param1;
		}), false);

		await EMLMemoAction.EMLMemoActionDelete(EMLBrowseStorageClient, param1, param2);

		mod.ControlMemoSelect(null);
	},

	ControlFocusMaster () {
		document.querySelector('.OLSKMasterListFilterField').focus();
	},

	ControlFocusDetail () {
		document.querySelector('.EMLBrowseInfoFormNotesField').focus();
	},

	ControlMemoSelect(inputData) {
		mod.ValueMemoSelected(inputData);

		if (!inputData) {
			return !mod.DataIsMobile() && mod.ControlFocusMaster();
		}

		mod.OLSKMobileViewInactive = true;

		setTimeout(mod.ControlFocusDetail);
	},
	
	ControlFilter(inputData) {
		mod._ValueFilterText = inputData;

		mod.ValueMemosVisible(mod._ValueMemosAll);

		if (!inputData) {
			return mod.ControlMemoSelect(null);
		}

		if (!mod._ValueMemosVisible.length) {
			return mod.ControlMemoSelect(null);
		}

		mod.ValueMemoSelected(EMLBrowseLogic.EMLBrowseExactMatchFirst(inputData, mod._ValueMemosVisible).shift());
	},

	// MESSAGE

	EMLBrowseListDispatchCreate () {
		mod.ControlMemoCreate(EMLBrowseJournalSelected);
	},

	EMLBrowseListDispatchClick (inputData) {
		mod.ControlMemoSelect(inputData);
	},

	EMLBrowseListDispatchArrow (inputData) {
		mod.ValueMemoSelected(inputData);
	},

	EMLBrowseListDispatchFilter (inputData) {
		mod.ControlFilter(inputData);
	},

	EMLBrowseInfoDispatchBack () {
		mod.OLSKMobileViewInactive = false;
	},

	EMLBrowseInfoDispatchDiscard () {
		mod.ControlMemoDiscard(mod._ValueMemoSelected, EMLBrowseJournalSelected);
	},

	EMLBrowseInfoDispatchUpdate () {
		mod._ValueMemoSelected = mod._ValueMemoSelected; // #purge-svelte-force-update

		mod.ControlMemoUpdate(mod._ValueMemoSelected, EMLBrowseJournalSelected);
	},

	EMLBrowseInfoDispatchDebug (inputData) {
		const url = `https://inspektor.5apps.com/?path=emojilog%2F${ encodeURIComponent(EMLMemoStorage.EMLMemoStorageFolderPath(inputData, EMLBrowseJournalSelected)) }`;

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
		mod.ValueMemosAll([inputData].concat(mod._ValueMemosAll), !mod._ValueMemoSelected);
	},

	ChangeDelegateUpdateMemo (inputData) {
		if (mod._ValueMemoSelected && mod._ValueMemoSelected.EMLMemoID === inputData.EMLMemoID) {
			mod.ControlMemoSelect(inputData);
		}

		mod.ValueMemosAll(mod._ValueMemosAll.map(function (e) {
			return e.EMLMemoID === inputData.EMLMemoID ? inputData : e;
		}), !mod._ValueMemoSelected);
	},

	ChangeDelegateDeleteMemo (inputData) {
		if (mod._ValueMemoSelected && (mod._ValueMemoSelected.EMLMemoID === inputData.EMLMemoID)) {
			mod.ControlMemoSelect(null);
		}

		mod.ValueMemosAll(mod._ValueMemosAll.filter(function (e) {
			return e.EMLMemoID !== inputData.EMLMemoID;
		}), false);
	},

	// REACT

	ReactMemoSelected () {
		if (!mod._ValueMemoSelected) {
			return;
		}

		mod._ValueMemoSelected = mod._ValueMemosVisible.filter(function (e) {
			return e.EMLMemoID === mod._ValueMemoSelected.EMLMemoID;
		}).pop();
	},

	// SETUP

	SetupEverything() {
		mod.SetupValueMemosAll();
		mod.SetupFocus();
	},

	SetupValueMemosAll() {
		mod.ValueMemosAll(mod._ValueMemosAll);
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

import EMLBrowseList from './submodules/EMLBrowseList/main.svelte';
import EMLBrowseInfo from './submodules/EMLBrowseInfo/main.svelte';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<EMLBrowseList
	EMLBrowseListItems={ mod._ValueMemosVisible }
	EMLBrowseListItemSelected={ mod._ValueMemoSelected }
	EMLBrowseListFilterText={ mod._ValueFilterText }
	EMLBrowseListDispatchForm={ EMLBrowseListDispatchForm }
	EMLBrowseListDispatchClose={ EMLBrowseListDispatchClose }
	EMLBrowseListDispatchCreate={ mod.EMLBrowseListDispatchCreate }
	EMLBrowseListDispatchClick={ mod.EMLBrowseListDispatchClick }
	EMLBrowseListDispatchArrow={ mod.EMLBrowseListDispatchArrow }
	EMLBrowseListDispatchFilter={ mod.EMLBrowseListDispatchFilter }
	OLSKMobileViewInactive={ !!mod.OLSKMobileViewInactive }
	/>

<EMLBrowseInfo
	EMLBrowseInfoItem={ mod._ValueMemoSelected }
	EMLBrowseInfoDispatchBack={ mod.EMLBrowseInfoDispatchBack }
	EMLBrowseInfoDispatchDiscard={ mod.EMLBrowseInfoDispatchDiscard }
	EMLBrowseInfoDispatchUpdate={ mod.EMLBrowseInfoDispatchUpdate }
	OLSKMobileViewInactive={ !mod.OLSKMobileViewInactive }
	EMLBrowseInfoDispatchDebug={ mod.EMLBrowseInfoDispatchDebug }
	bind:this={ mod._EMLBrowseInfo }
	/>

{#if OLSK_SPEC_UI() && EMLBrowseStorageClient.FakeStorageClient }
	 <button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}
