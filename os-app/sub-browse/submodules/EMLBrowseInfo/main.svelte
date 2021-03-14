<script>
export let EMLBrowseInfoItem;
export let EMLBrowseInfoDispatchBack;
export let EMLBrowseInfoDispatchUpdate;
export let EMLBrowseInfoDispatchDiscard;
export let EMLBrowseInfoDispatchDebug;
export let EMLBrowseInfo_DebugShowLauncherButton = false;

export const modPublic = {

	EMLBrowseInfoRecipes () {
		return mod.DataBrowseInfoRecipes();
	},

};

import { OLSKLocalized } from 'OLSKInternational';
import { OLSK_SPEC_UI } from 'OLSKSpec';

const mod = {

	// VALUE

	_ValueDateFieldIsVisible: false,

	// DATA

	DataBrowseInfoRecipes () {
		if (!EMLBrowseInfoItem) {
			return [];
		}

		const items = [{
			LCHRecipeSignature: 'EMLBrowseInfoLauncherItemDebug',
			LCHRecipeName: OLSKLocalized('EMLBrowseInfoLauncherItemDebugText'),
			LCHRecipeCallback () {
				EMLBrowseInfoDispatchDebug(EMLBrowseInfoItem);
			},
		}];

		if (OLSK_SPEC_UI()) {
			items.push({
				LCHRecipeName: 'EMLBrowseInfoLauncherFakeItemProxy',
				LCHRecipeCallback: function EMLBrowseInfoLauncherFakeItemProxy () {},
			});
		}
		
		return items;
	},

	// INTERFACE

	InterfaceDateButtonDidClick () {
		mod._ValueDateFieldIsVisible = true;
	},

	InterfaceDateFieldDidInput (event) {
		mod._ValueDateNext = event.target.value;
	},

	InterfaceDateFormDidSubmit (event) {
		event.preventDefault();

		if (!mod._ValueDateFieldIsVisible) {
			return;
		};
		
		mod._ValueDateFieldIsVisible = false;

		const EMLMemoEventDate = new Date(mod._ValueDateNext);

		if (Number.isNaN(EMLMemoEventDate.getTime())) {
			return;
		}

		Object.assign(EMLBrowseInfoItem, {
			EMLMemoEventDate,
		});

		EMLBrowseInfoDispatchUpdate();		
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

<div class="EMLBrowseInfo">

{#if !EMLBrowseInfoItem}
<OLSKDetailPlaceholder />
{/if}

{#if EMLBrowseInfoItem}
<header class="EMLBrowseInfoToolbar OLSKMobileViewHeader OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeBottom">
	<div class="OLSKToolbarElementGroup">
		<button class="EMLBrowseInfoToolbarBackButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton OLSKVisibilityMobile" title={ OLSKLocalized('EMLBrowseInfoToolbarBackButtonText') } on:click={ EMLBrowseInfoDispatchBack }>
			<div class="EMLBrowseInfoToolbarBackButtonImage">{@html _OLSKSharedBack }</div>
		</button>
	</div>

	<div class="OLSKToolbarElementGroup">
		<button class="EMLBrowseInfoToolbarDiscardButton OLSKDecorButtonNoStyle OLSKDecorTappable OLSKToolbarButton" title={ OLSKLocalized('EMLBrowseInfoToolbarDiscardButtonText') } on:click={ () => window.confirm(OLSKLocalized('EMLBrowseInfoDiscardConfirmText')) && EMLBrowseInfoDispatchDiscard(EMLBrowseInfoItem) }>
			<div class="EMLBrowseInfoToolbarDiscardButtonImage">{@html _OLSKSharedDiscard }</div>
		</button>
	</div>
</header>

<div class="EMLBrowseInfoForm OLSKDecor OLSKDecorBigForm">

<p>
	<textarea class="EMLBrowseInfoFormNotesField" placeholder="{ OLSKLocalized('EMLBrowseInfoFormNotesFieldText') }" bind:value={ EMLBrowseInfoItem.EMLMemoNotes } on:input={ EMLBrowseInfoDispatchUpdate }></textarea>
</p>

<hr role="presentation" />

<p>
	{#if !mod._ValueDateFieldIsVisible }
		<button class="EMLBrowseInfoFormDateButton" on:click={ mod.InterfaceDateButtonDidClick }>{ OLSKLocalized('EMLBrowseInfoFormDateButtonText') }</button>
	{/if}

	{#if mod._ValueDateFieldIsVisible }
		<form class="EMLBrowseInfoFormDateForm" on:submit={ mod.InterfaceDateFormDidSubmit }>
			<input class="EMLBrowseInfoFormDateField" type="text" value={ EMLBrowseInfoItem.EMLMemoEventDate.toJSON() } on:input={ mod.InterfaceDateFieldDidInput } autofocus />

			<button class="EMLBrowseInfoFormDateSaveButton">{ OLSKLocalized('EMLBrowseInfoFormDateSaveButtonText') }</button>
		</form>
	{/if}
</p>

</div>
{/if}

</div>

{#if OLSK_SPEC_UI() && EMLBrowseInfo_DebugShowLauncherButton }
	<button class="OLSKAppToolbarLauncherButton" on:click={ mod._OLSKAppToolbarDispatchLauncher }></button>
{/if}

<style src="./ui-style.css"></style>
