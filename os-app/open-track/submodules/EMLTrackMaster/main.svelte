<script>
export let EMLTrackMasterDispatchCreate;
export let OLSKCollectionItems;
export let OLSKCollectionDispatchClick;
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

	_OLSKCollectionDispatchKey (inputData) {
		return inputData.EMLJournalID;
	},

	OLSKCollectionChunkFunction (inputData) {
		return EMLTrackMasterLogic.EMLTrackMasterGroupFunction(inputData, OLSKLocalized);
	},

	OLSKCollectionItemAccessibilitySummaryFunction (inputData) {
		return EMLTrackMasterLogic.EMLTrackMasterAccessibilitySummary(inputData, OLSKLocalized)
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
import EMLTrackTimer from '../EMLTrackTimer/main.svelte';
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

<OLSKCollection
	bind:this={ mod._OLSKCollection }
	
	OLSKCollectionSortFunction={ EMLTrackMasterLogic.EMLTrackMasterSort }
	_OLSKCollectionDispatchKey={ mod._OLSKCollectionDispatchKey }

	OLSKCollectionChunkFunction={ mod.OLSKCollectionChunkFunction }
	
	OLSKCollectionItemAccessibilitySummaryFunction={ mod.OLSKCollectionItemAccessibilitySummaryFunction }
	OLSKCollectionDispatchClick={ OLSKCollectionDispatchClick }
	
	OLSKCollectionItems={ OLSKCollectionItems }

	let:OLSKCollectionItem
	>
	<div slot="OLSKCollectionItem" class="EMLTrackMasterListItem OLSKDecorTappable" >
		<EMLTrackTimer
			EMLTrackTimerEventDate={ OLSKCollectionItem.EMLJournalTouchDate }
			EMLTrackTimerText={ EMLTrackMasterLogic.EMLTrackMasterSymbol(OLSKCollectionItem) }
			/>
	</div>
</OLSKCollection>

</OLSKStandardView>

</div>

{#if OLSK_SPEC_UI() && EMLTrackMaster_DebugShowLauncherButton }
	<button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}

<style>
.EMLTrackMaster {
	width: 100%;
}

.EMLTrackMaster :global(.OLSKCollection, .OLSKCollectionChunk, .OLSKCollectionChunkItems) {
	display: flex;
	flex-direction: column;
}

.EMLTrackMaster :global(.OLSKCollectionChunkHeading) {
	padding: 6px;
	outline: #cccccc solid 1px;

	font-weight: bold;
	background: #e9e9e9;
}

.EMLTrackMaster :global(.OLSKCollectionChunkItems) {
	padding: 10px;
	
	flex-direction: unset;
	flex-wrap: wrap;
}

.EMLTrackMaster :global(.OLSKCollectionChunk:nth-child(3)) {
	opacity: 0.7;
}

.EMLTrackMaster :global(.OLSKCollectionChunk:nth-child(4)) {
	opacity: 0.5;
}

.EMLTrackMaster :global(.OLSKCollectionChunk:nth-child(5)) {
	opacity: 0.3;
}
</style>
