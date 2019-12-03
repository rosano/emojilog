import RollupStart from './main.svelte';

const EMTTrackList = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMTTrackListItems: [],
		EMTTrackListDispatchCreate () {
			window.TestEMTTrackListDispatchCreate.innerHTML = parseInt(window.TestEMTTrackListDispatchCreate.innerHTML) + 1;
		},
		EMTTrackListDispatchSelect (inputData) {
			window.TestEMTTrackListDispatchSelect.innerHTML = parseInt(window.TestEMTTrackListDispatchSelect.innerHTML) + 1;
			window.TestEMTTrackListDispatchSelectData.innerHTML = JSON.stringify(inputData);
		},
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['EMTTrackListItems', 'EMTTrackListItemSelected'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		};

		return e;
	}))),
});

export default EMTTrackList;
