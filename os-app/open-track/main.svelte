<script>
import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { storageClient, isLoading, DocumentsAllStore } from './persistence.js';
import * as OLSKRemoteStorage from '../_shared/__external/OLSKRemoteStorage/main.js'
import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

const mod = {

	// VALUE
	
	_ValueStorageWidgetHidden: true,

	_ValueFooterStorageStatus: '',

	// MESSAGE

	EMTTrackFootetDispatchStorage () {
		mod._ValueStorageWidgetHidden = !mod._ValueStorageWidgetHidden;
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
	<EMTTrackMaster />
	<EMTTrackDetail />
</OLSKViewportContent>

<div id="EMTTrackStorageWidget" class:EMTTrackStorageWidgetHidden={ mod._ValueStorageWidgetHidden }></div>

<EMTTrackFooter EMTTrackFooterStorageStatus={ mod._ValueFooterStorageStatus } on:EMTTrackFootetDispatchStorage={ mod.EMTTrackFootetDispatchStorage } />

</div>

{#if !OLSK_TESTING_BEHAVIOUR()}
	<OLSKServiceWorker OLSKLocalized={ OLSKLocalized } registrationRoute={ window.OLSKCanonicalFor('EMTServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>
