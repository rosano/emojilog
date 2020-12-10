<script>
export let EMTTrackMasterListItems;
export let EMTTrackMasterListItemSelected = null;
export let EMTTrackMasterDispatchCreate;
export let EMTTrackMasterDispatchSelect;
export let EMTTrackMasterDispatchImportData;
export let EMTTrackMaster_DebugShowLauncherButton = false;

export const modPublic = {

	EMTTrackMasterRecipes () {
		return mod.DataTrackMasterRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

const mod = {

	// DATA

	DataTrackMasterRecipes () {
		const items = [{
			LCHRecipeSignature: 'EMTTrackMasterLauncherItemImportData',
			LCHRecipeName: OLSKLocalized('EMTTrackMasterLauncherItemImportDataText'),
			LCHRecipeCallback: function EMTTrackMasterLauncherItemImportData () {
				return this.api.LCHReadTextFile({
					accept: '.json',
				}).then(EMTTrackMasterDispatchImportData);
			},
		}];

		if (OLSK_SPEC_UI()) {
			items.push({
				LCHRecipeName: 'EMTTrackMasterLauncherFakeItemProxy',
				LCHRecipeCallback: function EMTTrackMasterLauncherFakeItemProxy () {},
			});
		}
		
		return items;
	},

	// MESSAGES

	_OLSKAppToolbarDispatchLauncher () {
		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataTrackMasterRecipes(),
		});
	},

};

import OLSKStandardView from 'OLSKStandardView';
</script>

<div class="EMTTrackMaster">

<OLSKStandardView>

<div class="EMTTrackMasterHead OLSKToolbar OLSKCommonEdgeBottom" slot="OLSKStandardViewHead">
	<div class="OLSKToolbarElementGroup">
		<button class="EMTTrackMasterCreateButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ EMTTrackMasterDispatchCreate } accesskey="n">{ OLSKLocalized('EMTTrackMasterCreateButtonText') }</button>
	</div>
</div>

<div>
	{#each EMTTrackMasterListItems as e}
		<button class="EMTTrackMasterListItem OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKCommonEdgeBottom" class:EMTTrackMasterListItemSelected={ (EMTTrackMasterListItemSelected || {}).EMTJournalID === e.EMTJournalID } on:click={ () => EMTTrackMasterDispatchSelect(e) } >
			<strong class="EMTTrackMasterListItemName">{ e.EMTJournalName || e.EMTJournalID }</strong>
		</button>
	{/each}
</div>

</OLSKStandardView>

</div>

{#if OLSK_SPEC_UI() && EMTTrackMaster_DebugShowLauncherButton }
	<button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}

<style>
.EMTTrackMaster {
	width: 100%;

	/* EMTTrackMasterFlexbox:Parent */
	display: flex;
	flex-direction: column;
}

.EMTTrackMasterListItem {
	min-height: 80px;
	width: 100%;
	padding: 5px;

	text-align: left;
}
</style>
