<script>
import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import { OLSK_TESTING_BEHAVIOUR } from 'OLSKTesting'
import OLSKThrottle from 'OLSKThrottle';
import * as EMTDocumentAction from '../../../_shared/EMTDocument/action.js';
import { storageClient, DocumentsAllStore, DocumentSelectedStore } from '../../persistence.js';
import { EMTTrackSort } from '../../ui-logic.js';

let _DocumentSelected;
DocumentSelectedStore.subscribe(function (val) {
	if (!val) {
		return;
	}

	if (val === _DocumentSelected) {
		return;
	};

	setTimeout(function () {
		document.querySelector('#EMTTrackFormNameField').focus();
	});

	_DocumentSelected = val;
});

const mod = {

	// COMMAND

	_SaveThrottleMap: {},
	CommandDocumentSave() {
		DocumentsAllStore.update(function (val) {
			return val;
		});

		OLSKThrottle.OLSKThrottleMappedTimeoutFor(mod._SaveThrottleMap, $DocumentSelectedStore.EMTDocumentID, function (inputData) {
			return {
				OLSKThrottleDuration: 500,
				OLSKThrottleCallback: async function () {
					delete mod._SaveThrottleMap[inputData.EMTDocumentID];

					await EMTDocumentAction.EMTDocumentActionUpdate(storageClient, inputData);
				},
			};
		}, $DocumentSelectedStore);

		if (OLSK_TESTING_BEHAVIOUR()) {
			OLSKThrottle.OLSKThrottleSkip(mod._SaveThrottleMap[$DocumentSelectedStore.EMTDocumentID])	
		};
	},
	
	async CommandDocumentDiscard() {
		if (!window.confirm(OLSKLocalized('EMTTrackListItemDeletePromptText'))) {
			return;
		}

		DocumentsAllStore.update(function (val) {
			return val.filter(function(e) {
				return e !== $DocumentSelectedStore;
			});
		});

		await EMTDocumentAction.EMTDocumentActionDelete(storageClient, $DocumentSelectedStore.EMTDocumentID);

		return DocumentSelectedStore.set(null);
	},

};

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>

<div class="Container OLSKViewportDetail">

{#if $DocumentSelectedStore}
<header id="EMTTrackDetailToolbar">
	<OLSKToolbar OLSKToolbarJustify={ true }>
		<OLSKToolbarElementGroup>
			<button on:click={ mod.CommandDocumentDiscard } class="OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" id="EMTTrackDetailToolbarDiscardButton" title={ OLSKLocalized('EMTTrackListItemToolbarDeleteButtonText') }>{ OLSKLocalized('EMTTrackListItemToolbarDeleteButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="FormContainer">
	<p>
		<input type="text" bind:value={ $DocumentSelectedStore.EMTDocumentName } on:input={ mod.CommandDocumentSave } placeholder="{ OLSKLocalized('EMTTrackFormNameFieldPlaceholderText') }" autofocus id="EMTTrackFormNameField" />
	</p>
</div>
{/if}

{#if !$DocumentSelectedStore}
<div class="PlaceholderContainer">
	<span>{ OLSKLocalized('EMTTrackDetailPlaceholderText') }</span>
</div>
{/if}

</div>

<style src="./ui-style.css"></style>
