<script>
export let EMLTemplateItem;
export let EMLTemplateDispatchUpdate;
export let EMLTemplateDispatchDiscard;

import { OLSKLocalized } from 'OLSKInternational';

import EMLJournal from '../_shared/EMLJournal/main.js';

const mod = {

	// VALUE

	_ValueVisibleFieldIDs: [],

	// INTERFACE

	InterfaceCreateParamButtonDidClick () {
		mod.ControlCreateParam();
	},

	// CONTROL

	ControlCreateParam () {
		EMLTemplateItem.EMLJournalFields = (EMLTemplateItem.EMLJournalFields || []).concat(EMLJournal.EMLFieldGenerate(OLSKLocalized));

		EMLTemplateDispatchUpdate();
	},

	ControlShowParamForm (inputData) {
		mod._ValueVisibleFieldIDs = mod._ValueVisibleFieldIDs.concat(inputData.EMLFieldID);
	},

	ControlUpdateParam (inputData) {
		EMLTemplateItem.EMLJournalFields = EMLTemplateItem.EMLJournalFields.map(function (e) {
			return Object.assign(e, e.EMLFieldID === inputData.EMLFieldID ? {
				EMLFieldModificationDate: new Date(),
			} : {});
		});
		
		EMLTemplateDispatchUpdate();
	},

	ControlHideParamForm (inputData) {
		mod._ValueVisibleFieldIDs = mod._ValueVisibleFieldIDs.filter(function (e) {
			return e !== inputData.EMLFieldID;
		});
	},

	// MESSAGE

	OLSKEmojiPickerDispatchSelect (inputData) {
		EMLTemplateItem.EMLJournalName = EMLTemplateItem.EMLJournalName ? EMLTemplateItem.EMLJournalName + ' ' + inputData : inputData;

		EMLTemplateDispatchUpdate();
	},

};

import OLSKEmojiPicker from 'OLSKEmojiPicker';
import EMLTemplateParamForm from './submodules/EMLTemplateParamForm/main.svelte';
</script>

<div class="EMLTemplate OLSKDecor OLSKDecorBigForm">

<p>
	<input type="text" class="EMLTemplateNameField" bind:value={ EMLTemplateItem.EMLJournalName } on:input={ EMLTemplateDispatchUpdate } placeholder="{ OLSKLocalized('EMLTemplateNameFieldPlaceholderText') }" autofocus />
	<br />
	<OLSKEmojiPicker OLSKEmojiPickerDispatchSelect={ mod.OLSKEmojiPickerDispatchSelect } />
</p>

<hr role="presentation" />

<p>
	<button class="EMLTemplateCreateParamButton" on:click={ mod.InterfaceCreateParamButtonDidClick }>{ OLSKLocalized('EMLTemplateCreateParamButtonText') }</button>
</p>

{#if EMLTemplateItem.EMLJournalFields }

<hr role="presentation" />

{#each EMLTemplateItem.EMLJournalFields as item }

{#if !mod._ValueVisibleFieldIDs.includes(item.EMLFieldID) }
<p>
	<button class="EMLTemplateEditParamButton" on:click={ () => mod.ControlShowParamForm(item) }>{ item.EMLFieldName || OLSKLocalized('EMLParamUntitledText') }</button>
</p>
{:else}

<EMLTemplateParamForm
	EMLTemplateParamFormItem={ item }
	EMLTemplateParamFormDispatchUpdate={ () => mod.ControlUpdateParam(item) }
	EMLTemplateParamFormDispatchDone={ () => mod.ControlHideParamForm(item) }
	/>
{/if}

{/each}

{/if}

<hr role="presentation" />

<p>
	<button class="EMLTemplateDiscardButton OLSKDecorPress OLSKDecorPressDestroy" on:click={ () => window.confirm(OLSKLocalized('OLSKWordingConfirmText')) && EMLTemplateDispatchDiscard(EMLTemplateItem) }>{ OLSKLocalized('EMLTemplateDiscardButtonText') }</button>
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
	max-width: calc(var(--EMLTemplateFormWidth) - 36px);

	font-size: 230%;
}

.EMLTemplate :global(emoji-picker) {
	--input-font-size: var(--OLSKCommonFontSize);
	--input-border-radius: var(--OLSKBorderRadius);
	--input-border-color: var(--OLSKCommonEdgeColor);
	--border-color: var(--OLSKCommonEdgeColor);

	width: 100%;
	max-width: calc(var(--EMLTemplateFormWidth) - 18px);
}
</style>
