<script>
import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

import { storageClient, isLoading, DocumentsAllStore } from './persistence.js';

let EMTTrackFooterStorageStatus = '';
import * as OLSKRemoteStorage from '../_shared/__external/OLSKRemoteStorage/main.js'
OLSKRemoteStorage.OLSKRemoteStorageStatus(storageClient.remoteStorage, function (inputData) {
	EMTTrackFooterStorageStatus = inputData
}, OLSKLocalized)

const mod = {

	// VALUE
	
	_ValueStorageHidden: true,

	// MESSAGE

	EMTTrackFootetDispatchStorage () {
		mod._ValueStorageHidden = !mod._ValueStorageHidden;
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		(new window.OLSKStorageWidget(storageClient.remoteStorage)).attach('EMTTrackStorageWidget').backend(document.querySelector('.EMTTrackFooterStorageButton'));
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

<div id="EMTTrackStorageWidget" class:StorageHidden={ mod._ValueStorageHidden }></div>

<EMTTrackFooter { EMTTrackFooterStorageStatus } on:EMTTrackFootetDispatchStorage={ mod.EMTTrackFootetDispatchStorage } />

</div>

{#if !OLSK_TESTING_BEHAVIOUR()}
	<OLSKServiceWorker OLSKLocalized={ OLSKLocalized } registrationRoute={ window.OLSKCanonicalFor('EMTServiceWorkerRoute') } />
{/if}

<style src="./ui-style.css"></style>
