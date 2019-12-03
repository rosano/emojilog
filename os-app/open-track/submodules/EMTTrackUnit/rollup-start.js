import RollupStart from './main.svelte';

const EMTTrackUnit = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMTTrackUnitDispatchBack () {
			window.TestEMTTrackUnitDispatchBack.innerHTML = parseInt(window.TestEMTTrackUnitDispatchBack.innerHTML) + 1;
		},
		EMTTrackUnitDispatchDiscard () {
			window.TestEMTTrackUnitDispatchDiscard.innerHTML = parseInt(window.TestEMTTrackUnitDispatchDiscard.innerHTML) + 1;
		},
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['EMTTrackUnitItem'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		};

		return e;
	}))),
});

export default EMTTrackUnit;
