<script>
export let EMTTrackFooterStorageStatus = '';

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { createEventDispatcher } from 'svelte';

const mod = {

	// VALUE

	_ValueDispatcher: createEventDispatcher(),

	// INTERFACE

	InterfaceStorageButtonDidClick () {
		_ValueDispatcher('EMTTrackFootetDispatchStorage')
	},

};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
import OLSKReloadButton from '../../../_shared/__external/OLSKReloadButton/main.svelte';
import RCSLanguageSwitcher from '../../../_shared/RCSLanguageSwitcher/main.svelte';
</script>

<footer class="Container">

	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<OLSKReloadButton OLSKLocalized={ OLSKLocalized } />
			
			<RCSLanguageSwitcher />

			<a class="EMTTrackFooterDonateLink" href={ window.OLSKPublicConstants('EMT_SHARED_DONATE_URL') } target="_blank">{ OLSKLocalized('EMTTrackFooterDonateLinkText') }</a>
		</OLSKToolbarElementGroup>

		<div>
			<div class="EMTTrackFooterStorageStatus">{ EMTTrackFooterStorageStatus }</div>
			<button class="EMTTrackFooterStorageButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" title={ OLSKLocalized('EMTTrackFooterStorageButtonText') } on:click={ mod.InterfaceStorageButtonDidClick } class:OSWIconVisible={ false }>
				<img src="/open-track/submodules/EMTTrackFooter/ui-images/EMTTrackFooterStorageButton.svg">
			</button>
		</div>
	</OLSKToolbar>
	
</footer>

<style src="./ui-style.css"></style>
