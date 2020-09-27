import RollupStart from './main.svelte';

const EMTBrowseListItem = new RollupStart({
	target: document.body,
	props: Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['EMTBrowseListItemObject'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);

			e[1].EMTMemoEventDate = new Date(e[1].EMTMemoEventDate);
		}

		return e;
	})),
});

export default EMTBrowseListItem;
