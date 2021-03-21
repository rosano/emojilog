<script>
export let EMLTrackMasterListItems;
export let EMLTrackMasterDispatchCreate;
export let EMLTrackMasterDispatchSelect;
export let EMLTrackMaster_DebugShowLauncherButton = false;

export const modPublic = {

	EMLTrackMasterRecipes () {
		return mod.DataTrackMasterRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

import EMLTrackMasterLogic from './ui-logic.js';

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
import _OLSKSharedCreate from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedCreate.svg';
</script>

<div class="EMLTrackMaster">

<OLSKStandardView>

<div class="EMLTrackMasterHead OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeBottom" slot="OLSKStandardViewHead">
	<div class="OLSKToolbarElementGroup"></div>
	<div class="OLSKToolbarElementGroup">
		<button class="EMLTrackMasterCreateButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('EMLTrackMasterCreateButtonText') } on:click={ EMLTrackMasterDispatchCreate } accesskey="n">
			<div class="EMLTrackMasterCreateButtonImage">{@html _OLSKSharedCreate }</div>
		</button>
	</div>
</div>

<div>
	{#each EMLTrackMasterListItems as e}
		<button class="EMLTrackMasterListItem OLSKDecorButtonNoStyle OLSKDecorTappable OLSKCommonEdgeBottom" aria-label={ EMLTrackMasterLogic.EMLTrackMasterAccessibilitySummary(e, OLSKLocalized) } on:click={ () => EMLTrackMasterDispatchSelect(e) }>
			<strong class="EMLTrackMasterListItemName">{ EMLTrackMasterLogic.EMLTrackMasterSymbol(e) }</strong>
			<span class="EMLTrackMasterListItemDate">{ e.EMLJournalTouchDate ? e.EMLJournalTouchDate.toDateString() : '' }</span>
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
