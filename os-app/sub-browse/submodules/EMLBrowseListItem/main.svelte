<script>
export let EMLBrowseListItemObject;

import { OLSKLocalized } from 'OLSKInternational';
import OLSKString from 'OLSKString';
</script>

<div class="EMLBrowseListItem OLSKCommonEdgeBottom">

<div class="EMLBrowseListItemEventDate">{ EMLBrowseListItemObject.EMLMemoEventDate.toLocaleString() }</div>
<div class="EMLBrowseListItemNotesSnippet">{ OLSKString.OLSKStringSnippet(EMLBrowseListItemObject.EMLMemoNotes) }</div>

</div>

<style>	
.EMLBrowseListItem {
	min-height: 46px;
	padding: 10px;

	overflow: hidden;
	text-overflow: ellipsis;

	/* prevent breaking from long urls */
	overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-word;
	hyphens: auto;
}
</style>
