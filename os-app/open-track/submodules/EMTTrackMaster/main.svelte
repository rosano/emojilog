<script>
import OLSKInternational from 'OLSKInternational';
export const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKString from 'OLSKString';
export const OLSKFormatted = function () {
	return OLSKString.OLSKStringWithFormat.apply(null, arguments)
};

import * as EMTDocumentAction from '../../../_shared/EMTDocument/action.js';
import * as EMTDocumentMetal from '../../../_shared/EMTDocument/metal.js';
import { EMTDocumentModelPostJSONParse } from '../../../_shared/EMTDocument/model.js';
import { EMTTrackSort } from '../../ui-logic.js';

import { storageClient, DocumentsAllStore, DocumentSelectedStore } from '../../persistence.js';

const mod = {

	// VALUE

	_ValueDocumentsVisible: [],
	
	// COMMAND

	async CommandDocumentCreate() {
		let item = await EMTDocumentAction.EMTDocumentActionCreate(storageClient, {
			EMTDocumentName: '',
			EMTDocumentModificationDate: new Date(),
		});

		DocumentsAllStore.update(function (val) {
			return val.concat(item).sort(EMTTrackSort);
		});

		return mod.CommandDocumentSelect(item);
	},
	
	CommandDocumentSelect(inputData) {
		return DocumentSelectedStore.set(inputData);
	},

	// REACT

	ReactDocumentsVisible() {
		mod._ValueDocumentsVisible = $DocumentsAllStore;
	},
	
};

DocumentsAllStore.subscribe(mod.ReactDocumentsVisible);

import OLSKToolbar from 'OLSKToolbar';
import OLSKToolbarElementGroup from 'OLSKToolbarElementGroup';
</script>

<div class="Container OLSKViewportMaster">

<header>
	<OLSKToolbar>
		<OLSKToolbarElementGroup>
			<button on:click={ mod.CommandDocumentCreate } class="OLSKLayoutButtonNoStyle OLSKLayoutElementTappable" accesskey="n" id="EMTTrackCreateButton" title={ OLSKLocalized('EMTTrackCreateButtonText') }>{ OLSKLocalized('EMTTrackCreateButtonText') }</button>
		</OLSKToolbarElementGroup>
	</OLSKToolbar>
</header>

<div class="List">
	{#each mod._ValueDocumentsVisible as e}
		<div on:click={ () => mod.CommandDocumentSelect(e) } class="ListItem OLSKLayoutElementTappable">
			<strong>{ e.EMTDocumentName || e.EMTDocumentID }</strong>
		</div>
	{/each}
</div>

</div>

<style>
.Container {
	border-right: var(--EMTBorderStyle);

	/* ContainerFlexboxParent */
	display: flex;
	flex-direction: column;
}

header {
	border-bottom: var(--EMTBorderStyle);
}

.List {
	/* ContainerFlexboxChild */
	flex-grow: 1;
	overflow: auto;
}

.ListItem {
	min-height: 40px;
	padding: 5px;
	border-bottom: var(--EMTBorderStyle)
}

.EMTTrackListItemFlagged {
	background: #ffff66;
}
</style>
