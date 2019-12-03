<script>
export let EMTTrackListItems;
export let EMTTrackListItemSelected = null;
export let EMTTrackListDispatchCreate;

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>

<div class="EMTTrackList OLSKViewportMaster">

<OLSKToolbar>
	<OLSKToolbarElementGroup>
		<button class="EMTTrackListCreateButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ EMTTrackListDispatchCreate } accesskey="n">{ OLSKLocalized('EMTTrackListCreateButtonText') }</button>
	</OLSKToolbarElementGroup>
</OLSKToolbar>

<div>
	{#each EMTTrackListItems as e}
		<div class="EMTTrackListItem OLSKLayoutElementTappable" class:EMTTrackListItemSelected={ (EMTTrackListItemSelected || {}).EMTDocumentID === e.EMTDocumentID } >
			<strong>{ e.EMTDocumentName || e.EMTDocumentID }</strong>
		</div>
	{/each}
</div>

</div>
