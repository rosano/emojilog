<script>
export let EMTTemplateItem;
export let EMTTemplateDispatchBack;
export let EMTTemplateDispatchDiscard;
export let EMTTemplateDispatchUpdate;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

</script>

<div class="EMTTemplate OLSKViewportDetail">

<header class="EMTTemplateToolbar OLSKToolbar OLSKToolbarJustify">
	<div class="OLSKToolbarElementGroup">
		<button class="EMTTemplateToolbarBackButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ EMTTemplateDispatchBack }>{ OLSKLocalized('EMTTemplateToolbarBackButtonText') }</button>
	</div>

	<div class="OLSKToolbarElementGroup">
		<button class="EMTTemplateToolbarDiscardButton OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" on:click={ () => window.confirm(OLSKLocalized('EMTTemplateDiscardConfirmText')) && EMTTemplateDispatchDiscard(EMTTemplateItem) }>{ OLSKLocalized('EMTTemplateToolbarDiscardButtonText') }</button>
	</div>
</header>

<div class="EMTTemplateForm">
	<p>
		<input type="text" class="EMTTemplateFormNameField" bind:value={ EMTTemplateItem.EMTJournalName } on:input={ EMTTemplateDispatchUpdate } placeholder="{ OLSKLocalized('EMTTemplateFormNameFieldPlaceholderText') }" autofocus />
	</p>
</div>

</div>

<style>
.EMTTemplate {
	/* EMTTemplateFlexbox:Parent */
	display: flex;
	flex-direction: column;
}

.EMTTemplateToolbar {
	border-bottom: var(--EMTBorderStyle);
}

.EMTTemplateForm {
	padding: 5px;

	overflow-y: scroll;
}

.EMTTemplateForm input[type=text] {
	width: 50%;
	border: var(--EMTBorderStyle);
	border-radius: 5px;
	padding: 5px;
}
</style>
