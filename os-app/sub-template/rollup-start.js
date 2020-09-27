import RollupStart from './main.svelte';

const EMTTrackForm = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMTTrackFormDispatchBack: (function () {
			window.TestEMTTrackFormDispatchBack.innerHTML = parseInt(window.TestEMTTrackFormDispatchBack.innerHTML) + 1;
		}),
		EMTTrackFormDispatchDiscard: (function (inputData) {
			window.TestEMTTrackFormDispatchDiscard.innerHTML = parseInt(window.TestEMTTrackFormDispatchDiscard.innerHTML) + 1;
			window.TestEMTTrackFormDispatchDiscardData.innerHTML = JSON.stringify(inputData);
		}),
		EMTTrackFormDispatchUpdate: (function () {
			window.TestEMTTrackFormDispatchUpdate.innerHTML = parseInt(window.TestEMTTrackFormDispatchUpdate.innerHTML) + 1;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['EMTTrackFormItem'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default EMTTrackForm;
