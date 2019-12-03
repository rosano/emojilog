import RollupStart from './main.svelte';

const EMTTrackMaster = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMTTrackMasterListItems: [],
		EMTTrackMasterDispatchCreate () {
			window.TestEMTTrackMasterDispatchCreate.innerHTML = parseInt(window.TestEMTTrackMasterDispatchCreate.innerHTML) + 1;
		},
		EMTTrackMasterDispatchSelect (inputData) {
			window.TestEMTTrackMasterDispatchSelect.innerHTML = parseInt(window.TestEMTTrackMasterDispatchSelect.innerHTML) + 1;
			window.TestEMTTrackMasterDispatchSelectData.innerHTML = JSON.stringify(inputData);
		},
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['EMTTrackMasterListItems', 'EMTTrackMasterListItemSelected'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		};

		return e;
	}))),
});

export default EMTTrackMaster;
