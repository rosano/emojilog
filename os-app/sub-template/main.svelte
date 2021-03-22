<script>
export let EMLTemplateItem;
export let EMLTemplateDispatchUpdate;
export let EMLTemplateDispatchDiscard;

import { OLSKLocalized } from 'OLSKInternational';
</script>

<div class="EMLTemplate OLSKDecor OLSKDecorBigForm">

<p>
	<input type="text" class="EMLTemplateNameField" bind:value={ EMLTemplateItem.EMLJournalName } on:input={ EMLTemplateDispatchUpdate } placeholder="{ OLSKLocalized('EMLTemplateNameFieldPlaceholderText') }" autofocus />
</p>

<hr role="presentation" />

<p>
	<button class="EMLTemplateDiscardButton OLSKDecorPress OLSKDecorPressDestroy" on:click={ () => window.confirm(OLSKLocalized('EMLTemplateDiscardConfirmText')) && EMLTemplateDispatchDiscard(EMLTemplateItem) }>{ OLSKLocalized('EMLTemplateDiscardButtonText') }</button>
</p>

</div>

<style>
.EMLTemplate {
	--OLSKCommonFontSize: 9pt;

	background: var(--OLSKCommonBackground);
	
	/* EMLTemplateFlexbox:Parent */
	display: flex;
	flex-direction: column;
}


.EMLTemplate input[type=text] {
	max-width: 25%;
}
</style>
