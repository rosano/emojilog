import RollupStart from './main.svelte';

const EMTTrackFooter = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMTTrackFooterDispatchStorage () {
			window.TestEMTTrackFooterDispatchStorage.innerHTML = parseInt(window.TestEMTTrackFooterDispatchStorage.innerHTML) + 1;
		},
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()))),
});

export default EMTTrackFooter;
