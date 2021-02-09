<script>
export let EMLTrackMasterListItems;
export let EMLTrackMasterListItemSelected = null;
export let EMLTrackMasterDispatchCreate;
export let EMLTrackMasterDispatchSelect;
export let EMLTrackMasterDispatchImportData;
export let EMLTrackMaster_DebugShowLauncherButton = false;

export const modPublic = {

	EMLTrackMasterRecipes () {
		return mod.DataTrackMasterRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

const mod = {

	// DATA

	DataTrackMasterRecipes () {
		const items = [];

		if (OLSK_SPEC_UI()) {
			items.push({
				LCHRecipeName: 'EMLTrackMasterLauncherFakeItemProxy',
				LCHRecipeCallback: function EMLTrackMasterLauncherFakeItemProxy () {},
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

<div class="EMLTrackMaster">

<OLSKStandardView>

<div class="EMLTrackMasterHead OLSKToolbar OLSKCommonEdgeBottom" slot="OLSKStandardViewHead">
	<div class="OLSKToolbarElementGroup">
		<button class="EMLTrackMasterCreateButton OLSKDecorButtonNoStyle OLSKDecorTappable" on:click={ EMLTrackMasterDispatchCreate } accesskey="n">{ OLSKLocalized('EMLTrackMasterCreateButtonText') }</button>
	</div>
</div>

<div>
	{#each EMLTrackMasterListItems as e}
		<button class="EMLTrackMasterListItem OLSKDecorButtonNoStyle OLSKDecorTappable OLSKCommonEdgeBottom" class:EMLTrackMasterListItemSelected={ (EMLTrackMasterListItemSelected || {}).EMLJournalID === e.EMLJournalID } on:click={ () => EMLTrackMasterDispatchSelect(e) } >
			<strong class="EMLTrackMasterListItemName">{ e.EMLJournalName || e.EMLJournalID }</strong>
		</button>
	{/each}
</div>

</OLSKStandardView>

</div>

{#if OLSK_SPEC_UI() && EMLTrackMaster_DebugShowLauncherButton }
	<button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}

<style>
.EMLTrackMaster {
	width: 100%;

	/* EMLTrackMasterFlexbox:Parent */
	display: flex;
	flex-direction: column;
}

.EMLTrackMasterListItem {
	min-height: 80px;
	width: 100%;
	padding: 5px;

	text-align: left;
}
</style>
