<script>
export let EMTBrowseListItemObject;

import OLSKInternational from 'OLSKInternational';
const OLSKLocalized = function(translationConstant) {
	return OLSKInternational.OLSKInternationalLocalizedString(translationConstant, JSON.parse(`{"OLSK_I18N_SEARCH_REPLACE":"OLSK_I18N_SEARCH_REPLACE"}`)[window.OLSKPublicConstants('OLSKSharedPageCurrentLanguage')]);
};

import OLSKString from 'OLSKString';
</script>

<div class="EMTBrowseListItem">

<div class="EMTBrowseListItemEventDate">{ EMTBrowseListItemObject.EMTMemoEventDate.valueOf() }</div>
<div class="EMTBrowseListItemNotesSnippet">{ OLSKString.OLSKStringSnippet(EMTBrowseListItemObject.EMTMemoNotes) }</div>

</div>

<style>	
.EMTBrowseListItem {
	min-height: 46px;
	padding: 10px;
	border-bottom: var(--EMTBorderStyle);

	overflow: hidden;
	text-overflow: ellipsis;

	/* prevent breaking from long urls */
	overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-word;
	hyphens: auto;
}

</style>
