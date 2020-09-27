<script>
export let EMTBrowseStorageClient;

export let EMTBrowseJournalSelected;
export let EMTBrowseJournalMemos;
export let EMTBrowseDispatchCreate;
export let EMTBrowseListDispatchClose;
export let EMTBrowseInfoSpeechAvailable;

export const modPublic = {

	EMTBrowseChangeDelegateCreateMemo () {
		mod.ChangeDelegateCreateMemo(...arguments);
	},

	EMTBrowseChangeDelegateUpdateMemo () {
		mod.ChangeDelegateUpdateMemo(...arguments);
	},

	EMTBrowseChangeDelegateDeleteMemo () {
		mod.ChangeDelegateDeleteMemo(...arguments);
	},

	EMTBrowseRecipes () {
		return mod.DataRecipes();
	},

};

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';
import OLSKThrottle from 'OLSKThrottle';
import EMTBrowseLogic from './ui-logic.js';
import EMTMemoAction from '../_shared/EMTMemo/action.js';
import EMTMemoStorage from '../_shared/EMTMemo/storage.js';

const mod = {

	// VALUE

	_ValueMemosAll: EMTBrowseJournalMemos,
	ValueMemosAll (inputData, shouldSort = true) {
		mod.ValueMemosVisible(mod._ValueMemosAll = inputData, shouldSort);
	},

	_ValueMemosVisible: [],
	ValueMemosVisible (inputData, shouldSort = true) {
		const items = !mod._ValueFilterText ? inputData : inputData.filter(EMTBrowseLogic.EMTBrowseFilterFunction(mod._ValueFilterText));
		mod._ValueMemosVisible = shouldSort ? items.sort(EMTBrowseLogic.EMTBrowseSort) : items;
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
			EMTMemoEventDate: new Date(),
			EMTMemoNotes: '',
		}, inputData);
	},

	DataRecipes () {
		const items = [];

		if (OLSK_TESTING_BEHAVIOUR()) {
			items.push(...[
				{
					LCHRecipeName: 'FakeEscapeWithoutSort',
					LCHRecipeCallback: function FakeEscapeWithoutSort () {
						mod.ControlMemoSelect(null);
					},
				},
			]);
		}

		if (mod._EMTBrowseInfo) {
			items.push(...mod._EMTBrowseInfo.modPublic.EMTBrowseInfoRecipes());
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
					return EMTBrowseListDispatchClose();
				}

				mod.ControlFilter('');

				if (!OLSK_TESTING_BEHAVIOUR()) {
					document.querySelector('.OLSKMasterListBody').scrollTo(0, 0);
				}
			},
			Tab () {
				if (document.activeElement === document.querySelector('.OLSKMasterListFilterField') && mod._ValueMemoSelected) {
					mod.ControlFocusDetail();

					return event.preventDefault();
				}

				if (document.activeElement === document.querySelector('.EMTBrowseInfoFormNotesField') && event.shiftKey) {
					mod.ControlFocusMaster();

					return event.preventDefault();
				}
			},
		};

		handlerFunctions[event.key] && handlerFunctions[event.key]();
	},

	// CONTROL

	async ControlMemoCreate(inputData) {
		const item = await EMTMemoAction.EMTMemoActionCreate(EMTBrowseStorageClient, mod.DataMemoObjectTemplate(), inputData);

		mod.ValueMemosAll(mod._ValueMemosAll.concat(item));

		mod.ControlMemoSelect(item);

		EMTBrowseDispatchCreate(item);
	},

	ControlMemoUpdate(param1, param2) {
		OLSKThrottle.OLSKThrottleMappedTimeout(mod._ValueMemoUpdateThrottleMap, param1.EMTMemoID, {
			OLSKThrottleDuration: OLSK_TESTING_BEHAVIOUR () ? 0 : 500,
			OLSKThrottleCallback () {
				return EMTMemoAction.EMTMemoActionUpdate(EMTBrowseStorageClient, param1, param2);
			},
		});
	},

	async ControlMemoDiscard (param1, param2) {
		mod.ValueMemosAll(mod._ValueMemosAll.filter(function (e) {
			return e !== param1;
		}), false);

		await EMTMemoAction.EMTMemoActionDelete(EMTBrowseStorageClient, param1, param2);

		mod.ControlMemoSelect(null);
	},

	ControlFocusMaster () {
		document.querySelector('.OLSKMasterListFilterField').focus();
	},

	ControlFocusDetail () {
		document.querySelector('.EMTBrowseInfoFormNotesField').focus();
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

		mod.ValueMemoSelected(EMTBrowseLogic.EMTBrowseExactMatchFirst(inputData, mod._ValueMemosVisible).shift());
	},

	// MESSAGE

	EMTBrowseListDispatchCreate () {
		mod.ControlMemoCreate(EMTBrowseJournalSelected);
	},

	EMTBrowseListDispatchClick (inputData) {
		mod.ControlMemoSelect(inputData);
	},

	EMTBrowseListDispatchArrow (inputData) {
		mod.ValueMemoSelected(inputData);
	},

	EMTBrowseListDispatchFilter (inputData) {
		mod.ControlFilter(inputData);
	},

	EMTBrowseInfoDispatchBack () {
		mod.OLSKMobileViewInactive = false;
	},

	EMTBrowseInfoDispatchDiscard () {
		mod.ControlMemoDiscard(mod._ValueMemoSelected, EMTBrowseJournalSelected);
	},

	EMTBrowseInfoDispatchUpdate () {
		mod._ValueMemoSelected = mod._ValueMemoSelected; // #purge-svelte-force-update

		mod.ControlMemoUpdate(mod._ValueMemoSelected, EMTBrowseJournalSelected);
	},

	EMTBrowseInfoDispatchDebug (inputData) {
		const url = `https://inspektor.5apps.com/?path=emojitimer%2F${ encodeURIComponent(EMTMemoStorage.EMTMemoStorageFolderPath(inputData, EMTBrowseJournalSelected)) }`;

		if (OLSK_TESTING_BEHAVIOUR()) {
			window.FakeWindowOpen = url;
			return;
		}

		window.open(url)
	},

	_OLSKAppToolbarDispatchLauncher () {
		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataRecipes(),
		});
	},

	ChangeDelegateCreateMemo (inputData) {
		mod.ValueMemosAll([inputData].concat(mod._ValueMemosAll), !mod._ValueMemoSelected);
	},

	ChangeDelegateUpdateMemo (inputData) {
		if (mod._ValueMemoSelected && mod._ValueMemoSelected.EMTMemoID === inputData.EMTMemoID) {
			mod.ControlMemoSelect(inputData);
		}

		mod.ValueMemosAll(mod._ValueMemosAll.map(function (e) {
			return e.EMTMemoID === inputData.EMTMemoID ? inputData : e;
		}), !mod._ValueMemoSelected);
	},

	ChangeDelegateDeleteMemo (inputData) {
		if (mod._ValueMemoSelected && (mod._ValueMemoSelected.EMTMemoID === inputData.EMTMemoID)) {
			mod.ControlMemoSelect(null);
		}

		mod.ValueMemosAll(mod._ValueMemosAll.filter(function (e) {
			return e.EMTMemoID !== inputData.EMTMemoID;
		}), false);
	},

	// REACT

	ReactMemoSelected () {
		if (!mod._ValueMemoSelected) {
			return;
		}

		mod._ValueMemoSelected = mod._ValueMemosVisible.filter(function (e) {
			return e.EMTMemoID === mod._ValueMemoSelected.EMTMemoID;
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

import EMTBrowseList from './submodules/EMTBrowseList/main.svelte';
import EMTBrowseInfo from './submodules/EMTBrowseInfo/main.svelte';
</script>
<svelte:window on:keydown={ mod.InterfaceWindowDidKeydown } />

<EMTBrowseList
	EMTBrowseListItems={ mod._ValueMemosVisible }
	EMTBrowseListItemSelected={ mod._ValueMemoSelected }
	EMTBrowseListFilterText={ mod._ValueFilterText }
	EMTBrowseListDispatchClose={ EMTBrowseListDispatchClose }
	EMTBrowseListDispatchCreate={ mod.EMTBrowseListDispatchCreate }
	EMTBrowseListDispatchClick={ mod.EMTBrowseListDispatchClick }
	EMTBrowseListDispatchArrow={ mod.EMTBrowseListDispatchArrow }
	EMTBrowseListDispatchFilter={ mod.EMTBrowseListDispatchFilter }
	OLSKMobileViewInactive={ !!mod.OLSKMobileViewInactive }
	/>

<EMTBrowseInfo
	EMTBrowseInfoItem={ mod._ValueMemoSelected }
	EMTBrowseInfoJournal={ EMTBrowseJournalSelected }
	EMTBrowseInfoSpeechAvailable={ EMTBrowseInfoSpeechAvailable }
	EMTBrowseInfoDispatchBack={ mod.EMTBrowseInfoDispatchBack }
	EMTBrowseInfoDispatchDiscard={ mod.EMTBrowseInfoDispatchDiscard }
	EMTBrowseInfoDispatchUpdate={ mod.EMTBrowseInfoDispatchUpdate }
	OLSKMobileViewInactive={ !mod.OLSKMobileViewInactive }
	EMTBrowseInfoDispatchDebug={ mod.EMTBrowseInfoDispatchDebug }
	bind:this={ mod._EMTBrowseInfo }
	/>

{#if OLSK_TESTING_BEHAVIOUR() && EMTBrowseStorageClient.FakeStorageClient }
	 <button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}
