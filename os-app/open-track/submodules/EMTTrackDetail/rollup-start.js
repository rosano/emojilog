import RollupStart from './main.svelte';

const EMTTrackDetail = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMTTrackDetailDispatchBack () {
			window.TestEMTTrackDetailDispatchBack.innerHTML = parseInt(window.TestEMTTrackDetailDispatchBack.innerHTML) + 1;
		},
		EMTTrackDetailDispatchDiscard (inputData) {
			window.TestEMTTrackDetailDispatchDiscard.innerHTML = parseInt(window.TestEMTTrackDetailDispatchDiscard.innerHTML) + 1;
			window.TestEMTTrackDetailDispatchDiscardData.innerHTML = JSON.stringify(inputData);
		},
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['EMTTrackDetailItem'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		};

		return e;
	}))),
});

export default EMTTrackDetail;
