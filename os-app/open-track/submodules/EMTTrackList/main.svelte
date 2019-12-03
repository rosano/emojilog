<script>
export let EMTTrackListItems;
export let EMTTrackListItemSelected = null;
export let EMTTrackListDispatchCreate;
export let EMTTrackListDispatchSelect;

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>

<div class="EMTTrackList OLSKViewportMaster">

<header>
	<OLSKToolbar>
		<OLSKToolbarElementGroup>
			<button class="EMTTrackListCreateButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ EMTTrackListDispatchCreate } accesskey="n">{ OLSKLocalized('EMTTrackListCreateButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<section>
	{#each EMTTrackListItems as e}
		<div class="EMTTrackListItem OLSKLayoutElementTappable" class:EMTTrackListItemSelected={ (EMTTrackListItemSelected || {}).EMTDocumentID === e.EMTDocumentID } on:click={ () => EMTTrackListDispatchSelect(e) } >
			<strong>{ e.EMTDocumentName || e.EMTDocumentID }</strong>
		</div>
	{/each}
</section>

</div>

<style>
.EMTTrackList {
	border-right: var(--EMTBorderStyle);

	/* EMTTrackListFlexboxParent */
	display: flex;
	flex-direction: column;
}

header {
	border-bottom: var(--EMTBorderStyle);
}

section {
	/* EMTTrackListFlexboxChild */
	flex-grow: 1;
	overflow: auto;
}

.EMTTrackListItem {
	min-height: 40px;
	padding: 5px;
	border-bottom: var(--EMTBorderStyle)
}
</style>
