<script>
export let EMTTrackUnitItem = null;
export let EMTTrackUnitDispatchBack;
export let EMTTrackUnitDispatchDiscard;

import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>

<div class="EMTTrackUnit OLSKViewportDetail">

{#if !EMTTrackUnitItem}
<div class="EMTTrackUnitPlaceholder">
	<span>{ OLSKLocalized('EMTTrackUnitPlaceholderText') }</span>
</div>
{/if}

{#if EMTTrackUnitItem}
<header class="EMTTrackUnitToolbar">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<button class="EMTTrackUnitToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ EMTTrackUnitDispatchBack }>{ OLSKLocalized('EMTTrackUnitToolbarBackButtonText') }</button>
		</OLSKToolbarElementGroup>

		<OLSKToolbarElementGroup>
			<button class="EMTTrackUnitToolbarDiscardButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ () => window.confirm(OLSKLocalized('EMTTrackUnitDiscardPromptText')) && EMTTrackUnitDispatchDiscard() }>{ OLSKLocalized('EMTTrackUnitToolbarDiscardButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="EMTTrackUnitForm">
	<p>
		<input type="text" class="EMTTrackUnitFormNameField" bind:value={ EMTTrackUnitItem.EMTDocumentName } placeholder="{ OLSKLocalized('EMTTrackUnitFormNameFieldPlaceholderText') }" autofocus />
	</p>
</div>
{/if}

</div>

<style>
.EMTTrackUnit {
	/* EMTTrackUnitFlexboxParent */
	display: flex;
	flex-direction: column;
}

.EMTTrackUnitPlaceholder {
	opacity: 0.5;
	text-align: center;

	/* EMTTrackUnitFlexboxChild */
	flex-grow: 1;

	/* EMTTrackUnitPlaceholderFlexboxParent */
	display: flex;
	justify-content: center;
	align-items: center;
}

:global(.OLSKIsLoading) .EMTTrackUnitPlaceholder {
	visibility: hidden;
}

.EMTTrackUnitToolbar {
	border-bottom: var(--EMTBorderStyle);
}

.EMTTrackUnitForm {
	padding: 5px;

	overflow-y: scroll;
}

.EMTTrackUnitForm input[type=text] {
	width: 50%;
	border: var(--EMTBorderStyle);
	border-radius: 5px;
	padding: 5px;
}
</style>
