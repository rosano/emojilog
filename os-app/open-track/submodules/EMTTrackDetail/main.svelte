<script>
export let EMTTrackDetailItem = null;
export let EMTTrackDetailDispatchBack;
export let EMTTrackDetailDispatchDiscard;
export let EMTTrackDetailDispatchUpdate;
export let OLSKMobileViewInactive = false;

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
import OLSKDetailPlaceholder from 'OLSKDetailPlaceholder';
</script>

<div class="EMTTrackDetail OLSKViewportDetail" class:OLSKMobileViewInactive={ OLSKMobileViewInactive }>

{#if !EMTTrackDetailItem}
<OLSKDetailPlaceholder />
{/if}

{#if EMTTrackDetailItem}
<header class="EMTTrackDetailToolbar">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<button class="EMTTrackDetailToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ EMTTrackDetailDispatchBack }>{ OLSKLocalized('EMTTrackDetailToolbarBackButtonText') }</button>
		</OLSKToolbarElementGroup>

		<OLSKToolbarElementGroup>
			<button class="EMTTrackDetailToolbarDiscardButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ () => window.confirm(OLSKLocalized('EMTTrackDetailDiscardPromptText')) && EMTTrackDetailDispatchDiscard(EMTTrackDetailItem) }>{ OLSKLocalized('EMTTrackDetailToolbarDiscardButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="EMTTrackDetailForm">
	<p>
		<input type="text" class="EMTTrackDetailFormNameField" bind:value={ EMTTrackDetailItem.EMTDocumentName } on:input={ EMTTrackDetailDispatchUpdate } placeholder="{ OLSKLocalized('EMTTrackDetailFormNameFieldPlaceholderText') }" autofocus />
	</p>
</div>
{/if}

</div>

<style>
.EMTTrackDetail {
	/* EMTTrackDetailFlexbox:Parent */
	display: flex;
	flex-direction: column;
}

.EMTTrackDetail :global(.OLSKDetailPlaceholder) {
	/* EMTTrackDetailFlexbox:Child */
	flex-grow: 1;
}

.EMTTrackDetailToolbar {
	border-bottom: var(--EMTBorderStyle);
}

.EMTTrackDetailForm {
	padding: 5px;

	overflow-y: scroll;
}

.EMTTrackDetailForm input[type=text] {
	width: 50%;
	border: var(--EMTBorderStyle);
	border-radius: 5px;
	padding: 5px;
}
</style>
