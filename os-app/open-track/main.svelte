<script>
import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKThrottle from 'OLSKThrottle';
import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'
import * as OLSKRemoteStorage from '../_shared/__external/OLSKRemoteStorage/main.js'
import * as EMTDocumentAction from '../_shared/EMTDocument/action.js';
import EMTTrackLogic from './ui-logic.js';
import { storageClient, EMTPersistenceIsLoading, EMTDocumentsAllStore, EMTDocumentSelectedStore } from './persistence.js';

const mod = {

	// VALUE

	_ValueDocumentsAll: [],
	
	_ValueDocumentSelected: undefined,
	
	_ValueStorageWidgetHidden: true,

	_ValueFooterStorageStatus: '',

	_ValueSaveThrottleMap: {},

	// MESSAGE

	OLSKAppToolbarDispatchStorage () {
		mod._ValueStorageWidgetHidden = !mod._ValueStorageWidgetHidden;
	},

	EMTTrackMasterDispatchCreate () {
		mod.ControlDocumentCreate();
	},

	EMTTrackMasterDispatchSelect (inputData) {
		mod.ControlDocumentSelect(inputData);
	},

	EMTTrackDetailDispatchBack () {
		mod.ControlDocumentSelect(null);
	},

	EMTTrackDetailDispatchDiscard (inputData) {
		mod.ControlDocumentDiscard(inputData);
	},

	EMTTrackDetailDispatchUpdate () {
		mod.ControlDocumentSave();
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

	MessageDocumentsAllDidChange() {
		mod._ValueDocumentsAll = $EMTDocumentsAllStore;
	},

	// CONTROL

	ControlDocumentSave() {
		EMTDocumentsAllStore.update(function (val) {
			return val;
		});

		OLSKThrottle.OLSKThrottleMappedTimeoutFor(mod._ValueSaveThrottleMap, $EMTDocumentSelectedStore.EMTDocumentID, function (inputData) {
			return {
				OLSKThrottleDuration: 500,
				OLSKThrottleCallback: async function () {
					delete mod._ValueSaveThrottleMap[inputData.EMTDocumentID];

					await EMTDocumentAction.EMTDocumentActionUpdate(storageClient, inputData);
				},
			};
		}, $EMTDocumentSelectedStore);

		if (OLSK_TESTING_BEHAVIOUR()) {
			OLSKThrottle.OLSKThrottleSkip(mod._ValueSaveThrottleMap[$EMTDocumentSelectedStore.EMTDocumentID])	
		};
	},

	async ControlDocumentCreate() {
		let item = await EMTDocumentAction.EMTDocumentActionCreate(storageClient, {
			EMTDocumentName: '',
			EMTDocumentModificationDate: new Date(),
		});

		EMTDocumentsAllStore.update(function (val) {
			return val.concat(item).sort(EMTTrackLogic.EMTTrackSort);
		});

		mod.ControlDocumentSelect(item);
	},
	
	ControlDocumentSelect(inputData) {
		return EMTDocumentSelectedStore.set(inputData);
	},
	
	async ControlDocumentDiscard (inputData) {
		EMTDocumentsAllStore.update(function (val) {
			return val.filter(function(e) {
				return e !== inputData;
			});
		});

		await EMTDocumentAction.EMTDocumentActionDelete(storageClient, inputData.EMTDocumentID);

		EMTDocumentSelectedStore.set(null);
	},

	// SETUP

	SetupEverything () {
		mod.SetupStorageWidget();

		mod.SetupStorageStatus();
	},

	SetupStorageWidget () {
		(new window.OLSKStorageWidget(storageClient.remoteStorage)).attach('EMTTrackStorageWidget').backend(document.querySelector('.OLSKAppToolbarStorageButton'));
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

EMTDocumentsAllStore.subscribe(mod.MessageDocumentsAllDidChange);

EMTDocumentSelectedStore.subscribe(mod.MessageDocumentSelectedDidChange);

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import OLSKViewportContent from 'OLSKViewportContent';
import EMTTrackMaster from './submodules/EMTTrackMaster/main.svelte';
import EMTTrackDetail from './submodules/EMTTrackDetail/main.svelte';
import OLSKAppToolbar from 'OLSKAppToolbar';
import OLSKServiceWorker from '../_shared/__external/OLSKServiceWorker/main.svelte';
</script>

<div class="EMTTrack OLSKViewport" class:OLSKIsLoading={ $EMTPersistenceIsLoading }>

<OLSKViewportContent>
	<EMTTrackMaster EMTTrackMasterListItems={ mod._ValueDocumentsAll } EMTTrackMasterListItemSelected={ $EMTDocumentSelectedStore } EMTTrackMasterDispatchCreate={ mod.EMTTrackMasterDispatchCreate } EMTTrackMasterDispatchSelect={ mod.EMTTrackMasterDispatchSelect } OLSKMobileViewInactive={ $EMTDocumentSelectedStore } />
	
	<EMTTrackDetail EMTTrackDetailItem={ $EMTDocumentSelectedStore } EMTTrackDetailDispatchBack={ mod.EMTTrackDetailDispatchBack } EMTTrackDetailDispatchDiscard={ mod.EMTTrackDetailDispatchDiscard } EMTTrackDetailDispatchUpdate={ mod.EMTTrackDetailDispatchUpdate } OLSKMobileViewInactive={ !$EMTDocumentSelectedStore } />
</OLSKViewportContent>

<footer class="EMTTrackViewportFooter OLSKMobileViewFooter">
	<div id="EMTTrackStorageWidget" class:EMTTrackStorageWidgetHidden={ mod._ValueStorageWidgetHidden }></div>

	<OLSKAppToolbar
		OLSKAppToolbarDonateURL={ window.OLSKPublicConstants('EMT_SHARED_DONATE_URL') }
		OLSKAppToolbarStorageStatus={ mod._ValueFooterStorageStatus }
		OLSKAppToolbarDispatchStorage={ mod.OLSKAppToolbarDispatchStorage }
		_OLSKAppToolbarDispatchExport={ mod._OLSKAppToolbarDispatchExport }
		_OLSKAppToolbarDispatchImport={ mod._OLSKAppToolbarDispatchImport }
		/>
</footer>

</div>

{#if !OLSK_TESTING_BEHAVIOUR()}
	<OLSKServiceWorker OLSKLocalized={ OLSKLocalized } registrationRoute={ window.OLSKCanonicalFor('EMTServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>
