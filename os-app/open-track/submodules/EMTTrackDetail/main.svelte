<script>
export let EMTTrackFormItem;
export let EMTTrackFormDispatchBack;
export let EMTTrackFormDispatchDiscard;
export let EMTTrackFormDispatchUpdate;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

</script>

<div class="EMTTrackForm OLSKViewportDetail">

<header class="EMTTrackFormToolbar OLSKToolbar OLSKToolbarJustify">
	<div class="OLSKToolbarElementGroup">
		<button class="EMTTrackFormToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ EMTTrackFormDispatchBack }>{ OLSKLocalized('EMTTrackFormToolbarBackButtonText') }</button>
	</div>

	<div class="OLSKToolbarElementGroup">
		<button class="EMTTrackFormToolbarDiscardButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ () => window.confirm(OLSKLocalized('EMTTrackFormDiscardConfirmText')) && EMTTrackFormDispatchDiscard(EMTTrackFormItem) }>{ OLSKLocalized('EMTTrackFormToolbarDiscardButtonText') }</button>
	</div>
</header>

<div class="EMTTrackFormBody">
	<p>
		<input type="text" class="EMTTrackFormBodyNameField" bind:value={ EMTTrackFormItem.EMTJournalName } on:input={ EMTTrackFormDispatchUpdate } placeholder="{ OLSKLocalized('EMTTrackFormBodyNameFieldPlaceholderText') }" autofocus />
	</p>
</div>

</div>

<style>
.EMTTrackForm {
	/* EMTTrackFormFlexbox:Parent */
	display: flex;
	flex-direction: column;
}

.EMTTrackFormToolbar {
	border-bottom: var(--EMTBorderStyle);
}

.EMTTrackFormBody {
	padding: 5px;

	overflow-y: scroll;
}

.EMTTrackFormBody input[type=text] {
	width: 50%;
	border: var(--EMTBorderStyle);
	border-radius: 5px;
	padding: 5px;
}
</style>
