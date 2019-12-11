<script>
export let EMTTrackFooterStorageStatus = '';
export let EMTTrackFooterDispatchStorage;

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
import OLSKReloadButton from '../../../_shared/__external/OLSKReloadButton/main.svelte';
import OLSKLanguageSwitcher from '../../../_shared/__external/OLSKLanguageSwitcher/main.svelte';
</script>

<footer class="EMTTrackFooter OLSKMobileViewFooter">

	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<OLSKReloadButton OLSKLocalized={ OLSKLocalized } />
			
			<OLSKLanguageSwitcher OLSKSharedActiveRouteConstant={ window.OLSKPublicConstants('OLSKSharedActiveRouteConstant') }
				OLSKSharedPageLanguagesAvailable={ window.OLSKPublicConstants('OLSKSharedPageLanguagesAvailable') }
				OLSKSharedPageCurrentLanguage={ window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage') }
				/>

			<a class="EMTTrackFooterDonateLink" href={ window.OLSKPublicConstants('EMT_SHARED_DONATE_URL') } target="_blank">{ OLSKLocalized('EMTTrackFooterDonateLinkText') }</a>
		</OLSKToolbarElementGroup>

		<div>
			<div class="EMTTrackFooterStorageStatus">{ EMTTrackFooterStorageStatus }</div>
			<button class="EMTTrackFooterStorageButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" title={ OLSKLocalized('EMTTrackFooterStorageButtonText') } on:click={ EMTTrackFooterDispatchStorage } class:OSWIconVisible={ false }>
				<img class="EMTTrackFooterStorageButtonImage" role="presentation" src="/open-track/submodules/EMTTrackFooter/ui-images/EMTTrackFooterStorageButton.svg">
			</button>
		</div>
	</OLSKToolbar>
	
</footer>

<style src="./ui-style.css"></style>
