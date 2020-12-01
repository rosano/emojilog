<script>
export let EMTBrowseInfoItem;
export let EMTBrowseInfoDispatchBack;
export let EMTBrowseInfoDispatchUpdate;
export let EMTBrowseInfoDispatchDiscard;
export let EMTBrowseInfoDispatchDebug;
export let OLSKMobileViewInactive = false;
export let EMTBrowseInfo_DebugShowLauncherButton = false;

export const modPublic = {

	EMTBrowseInfoRecipes () {
		return mod.DataBrowseInfoRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

const mod = {

	// DATA

	DataBrowseInfoRecipes () {
		if (!EMTBrowseInfoItem) {
			return [];
		}

		const items = [{
			LCHRecipeSignature: 'EMTBrowseInfoLauncherItemDebug',
			LCHRecipeName: OLSKLocalized('EMTBrowseInfoLauncherItemDebugText'),
			LCHRecipeCallback () {
				EMTBrowseInfoDispatchDebug(EMTBrowseInfoItem);
			},
		}];

		if (OLSK_SPEC_UI()) {
			items.push({
				LCHRecipeName: 'EMTBrowseInfoLauncherFakeItemProxy',
				LCHRecipeCallback: function EMTBrowseInfoLauncherFakeItemProxy () {},
			});
		}
		
		return items;
	},

	// MESSAGE

	_OLSKAppToolbarDispatchLauncher () {
		window.Launchlet.LCHSingletonCreate({
			LCHOptionRecipes: mod.DataBrowseInfoRecipes(),
		});
	},

};

import OLSKDetailPlaceholder from 'OLSKDetailPlaceholder';
import _OLSKSharedBack from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedBack.svg';
import _OLSKSharedDiscard from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedDiscard.svg';
import _OLSKSharedClone from '../../../_shared/__external/OLSKUIAssets/_OLSKSharedClone.svg';
</script>

<div class="EMTBrowseInfo OLSKViewportDetail" class:OLSKMobileViewInactive={ OLSKMobileViewInactive } aria-hidden={ OLSKMobileViewInactive ? true : null }>

{#if !EMTBrowseInfoItem}
<OLSKDetailPlaceholder />
{/if}

{#if EMTBrowseInfoItem}
<header class="EMTBrowseInfoToolbar OLSKMobileViewHeader OLSKToolbar OLSKToolbarJustify">
	<div class="OLSKToolbarElementGroup">
		<button class="EMTBrowseInfoToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton OLSKVisibilityMobile" title={ OLSKLocalized('EMTBrowseInfoToolbarBackButtonText') } on:click={ EMTBrowseInfoDispatchBack }>
			<div class="EMTBrowseInfoToolbarBackButtonImage">{@html _OLSKSharedBack }</div>
		</button>
	</div>

	<div class="OLSKToolbarElementGroup">
		<button class="EMTBrowseInfoToolbarDiscardButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable OLSKToolbarButton" title={ OLSKLocalized('EMTBrowseInfoToolbarDiscardButtonText') } on:click={ () => window.confirm(OLSKLocalized('EMTBrowseInfoDiscardConfirmText')) && EMTBrowseInfoDispatchDiscard(EMTBrowseInfoItem) }>
			<div class="EMTBrowseInfoToolbarDiscardButtonImage">{@html _OLSKSharedDiscard }</div>
		</button>
	</div>
</header>

<div class="EMTBrowseInfoForm">

<p>
	<textarea class="EMTBrowseInfoFormNotesField" placeholder="{ OLSKLocalized('EMTBrowseInfoFormNotesFieldText') }" bind:value={ EMTBrowseInfoItem.EMTMemoNotes } on:input={ EMTBrowseInfoDispatchUpdate }></textarea>
</p>

<hr role="presentation" />

</div>
{/if}

</div>

{#if OLSK_SPEC_UI() && EMTBrowseInfo_DebugShowLauncherButton }
	<button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}

<style src="./ui-style.css"></style>
