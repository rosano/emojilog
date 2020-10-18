<script>
export let EMTTrackMasterListItems;
export let EMTTrackMasterListItemSelected = null;
export let EMTTrackMasterDispatchCreate;
export let EMTTrackMasterDispatchSelect;

export const modPublic = {

	EMTTrackMasterRecipes () {
		return mod.DataTrackMasterRecipes();
	},

};

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting';

const mod = {

	// DATA

	DataTrackMasterRecipes () {
		const items = [];
		if (OLSK_TESTING_BEHAVIOUR()) {
			items.push({
				LCHRecipeName: 'EMTTrackMasterLauncherFakeItemProxy',
				LCHRecipeCallback: function EMTTrackMasterLauncherFakeItemProxy () {},
			});
		}
		
		return items;
	},
};
</script>

<div class="EMTTrackMaster">

<header class="EMTTrackMasterToolbar OLSKMobileViewHeader OLSKToolbar">
	<div class="OLSKToolbarElementGroup">
		<button class="EMTTrackMasterCreateButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ EMTTrackMasterDispatchCreate } accesskey="n">{ OLSKLocalized('EMTTrackMasterCreateButtonText') }</button>
	</div>
</header>

<section class="EMTTrackMasterBody OLSKMobileViewBody">
	{#each EMTTrackMasterListItems as e}
		<button class="EMTTrackMasterListItem OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" class:EMTTrackMasterListItemSelected={ (EMTTrackMasterListItemSelected || {}).EMTJournalID === e.EMTJournalID } on:click={ () => EMTTrackMasterDispatchSelect(e) } >
			<strong class="EMTTrackMasterListItemName">{ e.EMTJournalName || e.EMTJournalID }</strong>
		</button>
	{/each}
</section>

</div>

<style>
.EMTTrackMaster {
	width: 100%;

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
	min-height: 80px;
	width: 100%;
	padding: 5px;
	
	border-bottom: var(--EMTBorderStyle);

	text-align: left;
}
</style>
