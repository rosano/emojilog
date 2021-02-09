import RollupStart from './main.svelte';

const EMLBrowseList = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMLBrowseListItems: [],
		EMLBrowseListFilterText: '',
		EMLBrowseListDispatchClose: (function () {
			window.TestEMLBrowseListDispatchClose.innerHTML = parseInt(window.TestEMLBrowseListDispatchCreate.innerHTML) + 1;
		}),
		EMLBrowseListDispatchForm: (function () {
			window.TestEMLBrowseListDispatchForm.innerHTML = parseInt(window.TestEMLBrowseListDispatchForm.innerHTML) + 1;
		}),
		EMLBrowseListDispatchCreate: (function () {
			window.TestEMLBrowseListDispatchCreate.innerHTML = parseInt(window.TestEMLBrowseListDispatchCreate.innerHTML) + 1;
		}),
		EMLBrowseListDispatchClick: (function (inputData) {
			window.TestEMLBrowseListDispatchClick.innerHTML = parseInt(window.TestEMLBrowseListDispatchClick.innerHTML) + 1;
			window.TestEMLBrowseListDispatchClickData.innerHTML = JSON.stringify(inputData);
		}),
		EMLBrowseListDispatchArrow: (function (inputData) {
			window.TestEMLBrowseListDispatchArrow.innerHTML = parseInt(window.TestEMLBrowseListDispatchArrow.innerHTML) + 1;
			window.TestEMLBrowseListDispatchArrowData.innerHTML = JSON.stringify(inputData);
		}),
		EMLBrowseListDispatchFilter: (function (inputData) {
			window.TestEMLBrowseListDispatchFilter.innerHTML = parseInt(window.TestEMLBrowseListDispatchFilter.innerHTML) + 1;
			window.TestEMLBrowseListDispatchFilterData.innerHTML = inputData;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
		if (['EMLBrowseListItems', 'EMLBrowseListItemSelected'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (e[0] === 'EMLBrowseListItemSelected') {
			e[1] = coll[0][1].filter(function (item) {
				return item.EMLMemoID === e[1].EMLMemoID;
			}).shift();
		}

		return e;
	}))),
});

export default EMLBrowseList;
