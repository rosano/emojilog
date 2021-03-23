<script>
export let EMLTemplateItem;
export let EMLTemplateDispatchUpdate;
export let EMLTemplateDispatchDiscard;

import { OLSKLocalized } from 'OLSKInternational';

const mod = {

	// MESSAGE

	OLSKEmojiPickerDispatchSelect (inputData) {
		EMLTemplateItem.EMLJournalName = EMLTemplateItem.EMLJournalName ? EMLTemplateItem.EMLJournalName + ' ' + inputData : inputData;

		EMLTemplateDispatchUpdate();
	},

};

import OLSKEmojiPicker from 'OLSKEmojiPicker';
</script>

<div class="EMLTemplate OLSKDecor OLSKDecorBigForm">

<p>
	<input type="text" class="EMLTemplateNameField" bind:value={ EMLTemplateItem.EMLJournalName } on:input={ EMLTemplateDispatchUpdate } placeholder="{ OLSKLocalized('EMLTemplateNameFieldPlaceholderText') }" autofocus />
	<br />
	<OLSKEmojiPicker OLSKEmojiPickerDispatchSelect={ mod.OLSKEmojiPickerDispatchSelect } />
</p>

<hr role="presentation" />

<p>
	<button class="EMLTemplateDiscardButton OLSKDecorPress OLSKDecorPressDestroy" on:click={ () => window.confirm(OLSKLocalized('EMLTemplateDiscardConfirmText')) && EMLTemplateDispatchDiscard(EMLTemplateItem) }>{ OLSKLocalized('EMLTemplateDiscardButtonText') }</button>
</p>

</div>

<style>
.EMLTemplate {
	--OLSKCommonFontSize: 9pt;
	--EMLTemplateFormWidth: 350px;

	background: var(--OLSKCommonBackground);
	
	/* EMLTemplateFlexbox:Parent */
	display: flex;
	flex-direction: column;
}

.EMLTemplateNameField {
	border-bottom: none !important;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
}

input[type=text] {
	max-width: 332px;
}

.EMLTemplate :global(emoji-picker) {
	--input-font-size: var(--OLSKCommonFontSize);
	--input-border-radius: var(--OLSKBorderRadius);
	--input-border-color: var(--OLSKCommonEdgeColor);
	--border-color: var(--OLSKCommonEdgeColor);

	width: 100%;
  max-width: var(--EMLTemplateFormWidth);
}
</style>
