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

<div class="EMTTrackUnit">

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
			<button class="EMTTrackUnitToolbarDiscardButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ EMTTrackUnitDispatchDiscard }>{ OLSKLocalized('EMTTrackUnitToolbarDiscardButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="EMTTrackUnitForm">
	<p>
		<input class="EMTTrackUnitFormNameField" bind:value={ EMTTrackUnitItem.EMTDocumentName } placeholder="{ OLSKLocalized('EMTTrackUnitFormNameFieldPlaceholderText') }" autofocus />
	</p>
</div>
{/if}

</div>
