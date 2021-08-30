<script>
export let EMLTrackJournalsDispatchCreate;
export let OLSKCollectionItems;
export let OLSKCollectionDispatchClick;
export let EMLTrackJournals_DebugShowLauncherButton = false;

export const modPublic = {

	EMLTrackJournalsRecipes () {
		return mod.DataTrackMasterRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

import EMLTrackJournalsLogic from './ui-logic.js';

const mod = {

	// DATA

	DataTrackMasterRecipes () {
		const items = [];

		if (OLSK_SPEC_UI()) {
			items.push({
				LCHRecipeName: 'EMLTrackJournalsLauncherFakeItemProxy',
				LCHRecipeCallback: function EMLTrackJournalsLauncherFakeItemProxy () {},
			});
		}
		
		return items;
	},

	// MESSAGES

	_OLSKCollectionDispatchKey (inputData) {
		return inputData.EMLJournalID;
	},

	OLSKCollectionChunkFunction (inputData) {
		return EMLTrackJournalsLogic.EMLTrackJournalsChunkFunction(inputData, OLSKLocalized);
	},

	OLSKCollectionItemAccessibilitySummaryFunction (inputData) {
		return EMLTrackJournalsLogic.EMLTrackJournalsAccessibilitySummary(inputData, OLSKLocalized)
	},

	_OLSKAppToolbarDispatchLauncher () {
		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataTrackMasterRecipes(),
		});
	},

	// SETUP

	SetupEverything() {
		Object.assign(modPublic, mod._OLSKCollection.modPublic);
	},

	// LIFECYCLE

	LifecycleModuleWillMount() {
		mod.SetupEverything();
	},

};

import { onMount } from 'svelte';
onMount(mod.LifecycleModuleWillMount);

import OLSKStandardView from 'OLSKStandardView';
import OLSKCollection from 'OLSKCollection';
import EMLTrackTimer from './submodules/EMLTrackTimer/main.svelte';
import _OLSKSharedCreate from '../_shared/__external/OLSKUIAssets/_OLSKSharedCreate.svg';
</script>

<div class="EMLTrackJournals">

<OLSKStandardView>

<div class="EMLTrackJournalsHead OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeBottom" slot="OLSKStandardViewHead">
	<div class="OLSKToolbarElementGroup"></div>
	<div class="OLSKToolbarElementGroup">
		<button class="EMLTrackJournalsCreateButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('EMLTrackJournalsCreateButtonText') } on:click={ EMLTrackJournalsDispatchCreate } accesskey="n">
			<div class="EMLTrackJournalsCreateButtonImage">{@html _OLSKSharedCreate }</div>
		</button>
	</div>
</div>

<OLSKCollection
	bind:this={ mod._OLSKCollection }
	
	OLSKCollectionSortFunction={ EMLTrackJournalsLogic.EMLTrackJournalsSort }
	_OLSKCollectionDispatchKey={ mod._OLSKCollectionDispatchKey }

	OLSKCollectionChunkFunction={ mod.OLSKCollectionChunkFunction }
	
	OLSKCollectionItemAccessibilitySummaryFunction={ mod.OLSKCollectionItemAccessibilitySummaryFunction }
	OLSKCollectionDispatchClick={ OLSKCollectionDispatchClick }
	
	OLSKCollectionItems={ OLSKCollectionItems }

	let:OLSKCollectionItem
	>
	<div slot="OLSKCollectionItem" class="EMLTrackJournalsListItem" >
		<EMLTrackTimer
			EMLTrackTimerEventDate={ OLSKCollectionItem.EMLJournalTouchDate }
			EMLTrackTimerText={ EMLTrackJournalsLogic.EMLTrackJournalsSymbol(OLSKCollectionItem) }
			/>
	</div>
</OLSKCollection>

</OLSKStandardView>

</div>

{#if OLSK_SPEC_UI() && EMLTrackJournals_DebugShowLauncherButton }
	<button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}

<style>
.EMLTrackJournals {
	width: 100%;
}

.EMLTrackJournals :global(.OLSKCollection, .OLSKCollectionChunk, .OLSKCollectionChunkItems) {
	display: flex;
	flex-direction: column;
}

.EMLTrackJournals :global(.OLSKCollectionChunkItems) {
	padding: 10px;
	
	flex-direction: unset;
	flex-wrap: wrap;
}

.EMLTrackJournals :global(.OLSKCollectionChunk:nth-child(3)) {
	opacity: 0.7;
}

.EMLTrackJournals :global(.OLSKCollectionChunk:nth-child(4)) {
	opacity: 0.5;
}

.EMLTrackJournals :global(.OLSKCollectionChunk:nth-child(5)) {
	opacity: 0.3;
}
</style>
