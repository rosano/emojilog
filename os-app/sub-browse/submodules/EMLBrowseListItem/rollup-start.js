import RollupStart from './main.svelte';

const EMLBrowseListItem = new RollupStart({
	target: document.body,
	props: Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['EMLBrowseListItemObject'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);

			e[1].EMLMemoEventDate = new Date(e[1].EMLMemoEventDate);
		}

		return e;
	})),
});

export default EMLBrowseListItem;
