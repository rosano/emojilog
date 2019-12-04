<script>
export let EMTTrackMasterListItems;
export let EMTTrackMasterListItemSelected = null;
export let EMTTrackMasterDispatchCreate;
export let EMTTrackMasterDispatchSelect;
export let OLSKMobileViewInactive = false;

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>

<div class="EMTTrackMaster OLSKViewportMaster" class:OLSKMobileViewInactive={ OLSKMobileViewInactive }>

<header class="EMTTrackMasterToolbar OLSKMobileViewHeader">
	<OLSKToolbar>
		<OLSKToolbarElementGroup>
			<button class="EMTTrackMasterCreateButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ EMTTrackMasterDispatchCreate } accesskey="n">{ OLSKLocalized('EMTTrackMasterCreateButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<section class="EMTTrackMasterBody OLSKMobileViewBody">
	{#each EMTTrackMasterListItems as e}
		<div class="EMTTrackMasterListItem OLSKLayoutElementTappable" class:EMTTrackMasterListItemSelected={ (EMTTrackMasterListItemSelected || {}).EMTDocumentID === e.EMTDocumentID } on:click={ () => EMTTrackMasterDispatchSelect(e) } >
			<strong>{ e.EMTDocumentName || e.EMTDocumentID }</strong>
		</div>
	{/each}
</section>

</div>

<style>
.EMTTrackMaster {
	border-right: var(--EMTBorderStyle);

	/* EMTTrackMasterFlexboxParent */
	display: flex;
	flex-direction: column;
}

header {
	border-bottom: var(--EMTBorderStyle);
}

section {
	/* EMTTrackMasterFlexboxChild */
	flex-grow: 1;
	overflow: auto;
}

.EMTTrackMasterListItem {
	min-height: 40px;
	padding: 5px;
	border-bottom: var(--EMTBorderStyle);
}

.EMTTrackMasterListItem:last-of-type {
	border-bottom: none;
}
</style>
