<script>
export let EMLTemplateItem;
export let EMLTemplateDispatchDone;
export let EMLTemplateDispatchDiscard;
export let EMLTemplateDispatchUpdate;

import { OLSKLocalized } from 'OLSKInternational';
</script>
<div class="EMLTemplate OLSKViewportDetail">

<header class="EMLTemplateToolbar OLSKToolbar OLSKToolbarJustify OLSKCommonEdgeBottom">
	<div class="OLSKToolbarElementGroup">
		<button class="EMLTemplateToolbarDoneButton OLSKDecorButtonNoStyle OLSKDecorTappable" on:click={ EMLTemplateDispatchDone }>{ OLSKLocalized('EMLTemplateToolbarDoneButtonText') }</button>
	</div>

	<div class="OLSKToolbarElementGroup">
		<button class="EMLTemplateToolbarDiscardButton OLSKDecorButtonNoStyle OLSKDecorTappable" on:click={ () => window.confirm(OLSKLocalized('EMLTemplateDiscardConfirmText')) && EMLTemplateDispatchDiscard(EMLTemplateItem) }>{ OLSKLocalized('EMLTemplateToolbarDiscardButtonText') }</button>
	</div>
</header>

<div class="EMLTemplateForm">
	<p>
		<input type="text" class="EMLTemplateFormNameField" bind:value={ EMLTemplateItem.EMLJournalName } on:input={ EMLTemplateDispatchUpdate } placeholder="{ OLSKLocalized('EMLTemplateFormNameFieldPlaceholderText') }" autofocus />
	</p>
</div>

</div>

<style>
.EMLTemplate {
	/* EMLTemplateFlexbox:Parent */
	display: flex;
	flex-direction: column;
}

.EMLTemplateForm {
	padding: 5px;

	overflow-y: scroll;
}

.EMLTemplateForm input[type=text] {
	width: 50%;
	border: var(--OLSKCommonEdgeBorder);
	border-radius: 5px;
	padding: 5px;
}
</style>
