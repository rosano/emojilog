<script>
export let EMLBrowseListFilterText;
export let EMLBrowseListItems;
export let EMLBrowseListItemSelected = null;
export let EMLBrowseListDispatchClose;
export let EMLBrowseListDispatchForm;
export let EMLBrowseListDispatchCreate;
export let EMLBrowseListDispatchClick;
export let EMLBrowseListDispatchArrow;
export let EMLBrowseListDispatchFilter;
export let OLSKMobileViewInactive = false;

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec'

import EMLBrowseListLogic from './ui-logic.js';

import OLSKMasterList from 'OLSKMasterList';
import _OLSKSharedBack from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedBack.svg';
import _OLSKSharedEdit from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedEdit.svg';
import _OLSKSharedCreate from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedCreate.svg';
import EMLBrowseListItem from '../EMLBrowseListItem/main.svelte';
</script>

<OLSKMasterList
	OLSKMasterListItems={ EMLBrowseListItems }
	OLSKMasterListItemSelected={ EMLBrowseListItemSelected }
	OLSKMasterListFilterText={ EMLBrowseListFilterText }
	OLSKMasterListDispatchClick={ EMLBrowseListDispatchClick }
	OLSKMasterListDispatchArrow={ EMLBrowseListDispatchArrow }
	OLSKMasterListDispatchFilter={ EMLBrowseListDispatchFilter }
	let:OLSKResultsListItem={ item }
	OLSKMasterListItemAccessibilitySummaryFunction={ (inputData) => EMLBrowseListLogic.EMLBrowseListItemAccessibilitySummary(inputData, OLSKLocalized) }	
	OLSKMasterListClass={ 'EMLBrowseList' }
	OLSKMobileViewInactive={ OLSKMobileViewInactive }
	>
	<div slot="OLSKMasterListToolbarHead">
		<div class="OLSKToolbarElementGroup">
			<button class="EMLBrowseListToolbarCloseButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('EMLBrowseListToolbarCloseButtonText') } on:click={ EMLBrowseListDispatchClose }>
				<div class="EMLBrowseListToolbarCloseButtonImage">{@html _OLSKSharedBack }</div>
			</button>
		</div>
	</div>

	<div slot="OLSKMasterListToolbarTail">
		<div class="OLSKToolbarElementGroup">
			<button class="EMLBrowseListToolbarFormButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('EMLBrowseListToolbarFormButtonText') } on:click={ () => EMLBrowseListDispatchForm() } accesskey="f">
				<div class="EMLBrowseListToolbarFormButtonImage">{@html _OLSKSharedEdit }</div>
			</button>

			<button class="EMLBrowseListToolbarCreateButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('EMLBrowseListToolbarCreateButtonText') } on:click={ () => EMLBrowseListDispatchCreate() } accesskey="n">
				<div class="EMLBrowseListToolbarCreateButtonImage">{@html _OLSKSharedCreate }</div>
			</button>
		</div>
	</div>

	<div slot="OLSKMasterListItem">
		<EMLBrowseListItem
			EMLBrowseListItemObject={ item }
			/>
	</div>
</OLSKMasterList>	

<style src="./ui-style.css"></style>
