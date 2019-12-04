<script>
export let EMTTrackDetailItem = null;
export let EMTTrackDetailDispatchBack;
export let EMTTrackDetailDispatchDiscard;
export let EMTTrackDetailDispatchUpdate;

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>

<div class="EMTTrackDetail OLSKViewportDetail">

{#if !EMTTrackDetailItem}
<div class="EMTTrackDetailPlaceholder OLSKLayoutElementTextVisual">{ OLSKLocalized('EMTTrackDetailPlaceholderText') }</div>
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
	/* EMTTrackDetailFlexboxParent */
	display: flex;
	flex-direction: column;
}

.EMTTrackDetailPlaceholder {
	opacity: 0.5;
	text-align: center;

	/* EMTTrackDetailFlexboxChild */
	flex-grow: 1;

	/* EMTTrackDetailPlaceholderFlexboxParent */
	display: flex;
	justify-content: center;
	align-items: center;
}

:global(.OLSKIsLoading) .EMTTrackDetailPlaceholder {
	visibility: hidden;
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
