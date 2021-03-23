<script>
export let EMLTemplateParamFormItem;
export let EMLTemplateParamFormDispatchUpdate;
export let EMLTemplateParamFormDispatchDone;

import { OLSKLocalized } from 'OLSKInternational';
</script>

<div class="EMLTemplateParamForm">

<p>
	<input type="text" class="EMLTemplateParamFormNameField OLSKMobileSafariRemoveDefaultInputStyle" bind:value={ EMLTemplateParamFormItem.EMLFieldName } on:input={ EMLTemplateParamFormDispatchUpdate } placeholder="{ OLSKLocalized('EMLTemplateParamFormNameFieldText') }" autofocus />
	<br />
</p>

<hr role="presentation" />

<p>
	<button class="EMLTemplateParamFormDoneButton" on:click={ EMLTemplateParamFormDispatchDone }>{ OLSKLocalized('EMLTemplateParamFormDoneButtonText') }</button>
</p>

</div>
