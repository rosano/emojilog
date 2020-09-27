import RollupStart from './main.svelte';

const EMTBrowseList = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMTBrowseListItems: [],
		EMTBrowseListFilterText: '',
		EMTBrowseListDispatchClose: (function _EMTBrowseListDispatchClose() {
			window.TestEMTBrowseListDispatchClose.innerHTML = parseInt(window.TestEMTBrowseListDispatchCreate.innerHTML) + 1;
		}),
		EMTBrowseListDispatchForm: (function _EMTBrowseListDispatchForm() {
			window.TestEMTBrowseListDispatchForm.innerHTML = parseInt(window.TestEMTBrowseListDispatchForm.innerHTML) + 1;
		}),
		EMTBrowseListDispatchCreate: (function _EMTBrowseListDispatchCreate() {
			window.TestEMTBrowseListDispatchCreate.innerHTML = parseInt(window.TestEMTBrowseListDispatchCreate.innerHTML) + 1;
		}),
		EMTBrowseListDispatchClick: (function _EMTBrowseListDispatchClick(inputData) {
			window.TestEMTBrowseListDispatchClick.innerHTML = parseInt(window.TestEMTBrowseListDispatchClick.innerHTML) + 1;
			window.TestEMTBrowseListDispatchClickData.innerHTML = JSON.stringify(inputData);
		}),
		EMTBrowseListDispatchArrow: (function _EMTBrowseListDispatchArrow(inputData) {
			window.TestEMTBrowseListDispatchArrow.innerHTML = parseInt(window.TestEMTBrowseListDispatchArrow.innerHTML) + 1;
			window.TestEMTBrowseListDispatchArrowData.innerHTML = JSON.stringify(inputData);
		}),
		EMTBrowseListDispatchFilter: (function _EMTBrowseListDispatchFilter(inputData) {
			window.TestEMTBrowseListDispatchFilter.innerHTML = parseInt(window.TestEMTBrowseListDispatchFilter.innerHTML) + 1;
			window.TestEMTBrowseListDispatchFilterData.innerHTML = inputData;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
		if (['EMTBrowseListItems', 'EMTBrowseListItemSelected'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (e[0] === 'EMTBrowseListItemSelected') {
			e[1] = coll[0][1].filter(function (item) {
				return item.EMTMemoID === e[1].EMTMemoID;
			}).shift();
		}

		return e;
	}))),
});

export default EMTBrowseList;
