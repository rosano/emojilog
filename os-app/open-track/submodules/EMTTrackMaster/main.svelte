<script>
export let EMTTrackMasterListItems;
export let EMTTrackMasterListItemSelected = null;
export let EMTTrackMasterDispatchCreate;
export let EMTTrackMasterDispatchSelect;
export let OLSKMobileViewInactive = false;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};
</script>

<div class="EMTTrackMaster OLSKViewportMaster" class:OLSKMobileViewInactive={ OLSKMobileViewInactive }>

<header class="EMTTrackMasterToolbar OLSKMobileViewHeader OLSKToolbar">
	<div class="OLSKToolbarElementGroup">
		<button class="EMTTrackMasterCreateButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ EMTTrackMasterDispatchCreate } accesskey="n">{ OLSKLocalized('EMTTrackMasterCreateButtonText') }</button>
	</div>
</header>

<section class="EMTTrackMasterBody OLSKMobileViewBody">
	{#each EMTTrackMasterListItems as e}
		<button class="EMTTrackMasterListItem OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" class:EMTTrackMasterListItemSelected={ (EMTTrackMasterListItemSelected || {}).EMTJournalID === e.EMTJournalID } on:click={ () => EMTTrackMasterDispatchSelect(e) } >
			<strong>{ e.EMTJournalName || e.EMTJournalID }</strong>
		</button>
	{/each}
</section>

</div>

<style>
.EMTTrackMaster {
	border-right: var(--EMTBorderStyle);

	/* EMTTrackMasterFlexbox:Parent */
	display: flex;
	flex-direction: column;
}

.EMTTrackMasterToolbar {
	border-bottom: var(--EMTBorderStyle);
	
	/* EMTTrackMasterFlexbox:Child */
	flex-shrink: 0;
}

.EMTTrackMasterBody {
	overflow: auto;
	
	/* EMTTrackMasterFlexbox:Child */
	flex-grow: 1;
}

.EMTTrackMasterListItem {
	min-height: 40px;
	width: 100%;
	padding: 5px;
	border-bottom: var(--EMTBorderStyle);

	text-align: left;
}

.EMTTrackMasterListItem:last-of-type {
	border-bottom: none;
}
</style>
