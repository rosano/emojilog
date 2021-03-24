<script>
export let EMLTemplateParamFormItem;
export let EMLTemplateParamFormDispatchUpdate;
export let EMLTemplateParamFormDispatchDone;

import { OLSKLocalized } from 'OLSKInternational';
</script>

<form class="EMLTemplateParamForm" on:submit={ (event) => [event.preventDefault(), EMLTemplateParamFormDispatchDone()] }>

<p>
	<input type="text" class="EMLTemplateParamFormNameField" bind:value={ EMLTemplateParamFormItem.EMLFieldName } on:input={ EMLTemplateParamFormDispatchUpdate } placeholder="{ OLSKLocalized('EMLTemplateParamFormNameFieldText') }" autofocus />
	<br />
</p>

<hr role="presentation" />

<p>
	<button class="EMLTemplateParamFormDoneButton">{ OLSKLocalized('EMLTemplateParamFormDoneButtonText') }</button>
</p>

</form>
