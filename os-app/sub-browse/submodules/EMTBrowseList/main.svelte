<script>
export let EMTBrowseListFilterText;
export let EMTBrowseListItems;
export let EMTBrowseListItemSelected = null;
export let EMTBrowseListDispatchClose;
export let EMTBrowseListDispatchCreate;
export let EMTBrowseListDispatchClick;
export let EMTBrowseListDispatchArrow;
export let EMTBrowseListDispatchFilter;
export let OLSKMobileViewInactive = false;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'

import EMTBrowseListLogic from './ui-logic.js';

const mod = {

	// INTERFACE

	InterfaceCreateButtonDidClick () {
		EMTBrowseListDispatchCreate();
	},

};

import OLSKMasterList from 'OLSKMasterList';
import _OLSKSharedBack from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedBack.svg';
import _OLSKSharedCreate from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedCreate.svg';
import EMTBrowseListItem from '../EMTBrowseListItem/main.svelte';
</script>

<OLSKMasterList
	OLSKMasterListItems={ EMTBrowseListItems }
	OLSKMasterListItemSelected={ EMTBrowseListItemSelected }
	OLSKMasterListFilterText={ EMTBrowseListFilterText }
	OLSKMasterListDispatchClick={ EMTBrowseListDispatchClick }
	OLSKMasterListDispatchArrow={ EMTBrowseListDispatchArrow }
	OLSKMasterListDispatchFilter={ EMTBrowseListDispatchFilter }
	let:OLSKResultsListItem={ item }
	OLSKMasterListItemAccessibilitySummaryFor={ (inputData) => EMTBrowseListLogic.EMTBrowseListItemAccessibilitySummary(inputData, OLSKLocalized) }	
	OLSKMasterListClass={ 'EMTBrowseList' }
	OLSKMobileViewInactive={ OLSKMobileViewInactive }
	>
	<div slot="OLSKMasterListToolbarHead">
		<div class="OLSKToolbarElementGroup">
			<button class="EMTBrowseListToolbarCloseButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" title={ OLSKLocalized('EMTBrowseListToolbarCloseButtonText') } on:click={ EMTBrowseListDispatchClose }>
				<div class="EMTBrowseListToolbarCloseButtonImage">{@html _OLSKSharedBack }</div>
			</button>
		</div>
	</div>

	<div slot="OLSKMasterListToolbarTail">
		<div class="OLSKToolbarElementGroup">
			<button class="EMTBrowseListToolbarCreateButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" title={ OLSKLocalized('EMTBrowseListToolbarCreateButtonText') } on:click={ mod.InterfaceCreateButtonDidClick } accesskey="n">
				<div class="EMTBrowseListToolbarCreateButtonImage">{@html _OLSKSharedCreate }</div>
			</button>
		</div>
	</div>

	<EMTBrowseListItem
		EMTBrowseListItemObject={ item }
		/>
</OLSKMasterList>	

<style src="./ui-style.css"></style>
