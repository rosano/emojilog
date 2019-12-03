<script>
import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { storageClient, isLoading, DocumentsAllStore, DocumentSelectedStore } from './persistence.js';
import { EMTTrackSort } from './ui-logic.js';
import * as EMTDocumentAction from '../_shared/EMTDocument/action.js';
import * as OLSKRemoteStorage from '../_shared/__external/OLSKRemoteStorage/main.js'
import OLSKThrottle from 'OLSKThrottle';
import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

const mod = {

	// VALUE

	_ValueDocumentsVisible: [],
	
	_ValueDocumentSelected: undefined,
	
	_ValueStorageWidgetHidden: true,

	_ValueFooterStorageStatus: '',

	_ValueSaveThrottleMap: {},

	// MESSAGE

	EMTTrackFooterDispatchStorage () {
		mod._ValueStorageWidgetHidden = !mod._ValueStorageWidgetHidden;
	},

	EMTTrackMasterDispatchCreate () {
		mod.CommandDocumentCreate();
	},

	EMTTrackMasterDispatchSelect (inputData) {
		mod.CommandDocumentSelect(inputData);
	},

	EMTTrackDetailDispatchBack () {},

	EMTTrackDetailDispatchDiscard () {
		mod.CommandDocumentDiscard();
	},

	MessageDocumentSelectedDidChange (inputData) {
		if (!inputData) {
			return;
		}

		if (inputData === mod._ValueDocumentSelected) {
			return;
		};

		setTimeout(function () {
			document.querySelector('.EMTTrackDetailFormNameField').focus();
		});

		mod._ValueDocumentSelected = inputData;
	},

	// COMMAND

	CommandDocumentSave() {
		DocumentsAllStore.update(function (val) {
			return val;
		});

		OLSKThrottle.OLSKThrottleMappedTimeoutFor(mod._ValueSaveThrottleMap, $DocumentSelectedStore.EMTDocumentID, function (inputData) {
			return {
				OLSKThrottleDuration: 500,
				OLSKThrottleCallback: async function () {
					delete mod._ValueSaveThrottleMap[inputData.EMTDocumentID];

					await EMTDocumentAction.EMTDocumentActionUpdate(storageClient, inputData);
				},
			};
		}, $DocumentSelectedStore);

		if (OLSK_TESTING_BEHAVIOUR()) {
			OLSKThrottle.OLSKThrottleSkip(mod._ValueSaveThrottleMap[$DocumentSelectedStore.EMTDocumentID])	
		};
	},

	async CommandDocumentCreate() {
		let item = await EMTDocumentAction.EMTDocumentActionCreate(storageClient, {
			EMTDocumentName: '',
			EMTDocumentModificationDate: new Date(),
		});

		DocumentsAllStore.update(function (val) {
			return val.concat(item).sort(EMTTrackSort);
		});

		mod.CommandDocumentSelect(item);
	},
	
	CommandDocumentSelect(inputData) {
		return DocumentSelectedStore.set(inputData);
	},
	
	async CommandDocumentDiscard() {
		DocumentsAllStore.update(function (val) {
			return val.filter(function(e) {
				return e !== $DocumentSelectedStore;
			});
		});

		await EMTDocumentAction.EMTDocumentActionDelete(storageClient, $DocumentSelectedStore.EMTDocumentID);

		return DocumentSelectedStore.set(null);
	},

	// REACT

	ReactDocumentsVisible() {
		mod._ValueDocumentsVisible = $DocumentsAllStore;
	},

	// SETUP

	SetupEverything () {
		mod.SetupStorageWidget();

		mod.SetupStorageStatus();
	},

	SetupStorageWidget () {
		(new window.OLSKStorageWidget(storageClient.remoteStorage)).attach('EMTTrackStorageWidget').backend(document.querySelector('.EMTTrackFooterStorageButton'));
	},

	SetupStorageStatus () {
		OLSKRemoteStorage.OLSKRemoteStorageStatus(storageClient.remoteStorage, function (inputData) {
			mod._ValueFooterStorageStatus = inputData;
		}, OLSKLocalized)
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

DocumentsAllStore.subscribe(mod.ReactDocumentsVisible);

DocumentSelectedStore.subscribe(mod.MessageDocumentSelectedDidChange);

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import OLSKViewportContent from 'OLSKViewportContent';
import EMTTrackMaster from './submodules/EMTTrackMaster/main.svelte';
import EMTTrackDetail from './submodules/EMTTrackDetail/main.svelte';
import EMTTrackFooter from './submodules/EMTTrackFooter/main.svelte';
import OLSKServiceWorker from '../_shared/__external/OLSKServiceWorker/main.svelte';
</script>

<div class="Container OLSKViewport" class:OLSKIsLoading={ $isLoading }>

<OLSKViewportContent>
	<EMTTrackMaster EMTTrackMasterListItems={ mod._ValueDocumentsVisible } EMTTrackMasterListItemSelected={ $DocumentSelectedStore } EMTTrackMasterDispatchCreate={ mod.EMTTrackMasterDispatchCreate } EMTTrackMasterDispatchSelect={ mod.EMTTrackMasterDispatchSelect } />
	
	<EMTTrackDetail EMTTrackDetailItem={ $DocumentSelectedStore } EMTTrackDetailDispatchBack={ mod.EMTTrackDetailDispatchBack } EMTTrackDetailDispatchDiscard={ mod.EMTTrackDetailDispatchDiscard } />
</OLSKViewportContent>

<div id="EMTTrackStorageWidget" class:EMTTrackStorageWidgetHidden={ mod._ValueStorageWidgetHidden }></div>

<EMTTrackFooter EMTTrackFooterStorageStatus={ mod._ValueFooterStorageStatus } EMTTrackFooterDispatchStorage={ mod.EMTTrackFooterDispatchStorage } />

</div>

{#if !OLSK_TESTING_BEHAVIOUR()}
	<OLSKServiceWorker OLSKLocalized={ OLSKLocalized } registrationRoute={ window.OLSKCanonicalFor('EMTServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>
