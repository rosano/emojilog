import RollupStart from './main.svelte';

import EMLMemo from '../_shared/EMLMemo/main.js';
import RemoteStorage from 'remotestoragejs';
import OLSKRemoteStorage from 'OLSKRemoteStorage';
import zerodatawrap from 'zerodatawrap';

(async function() {
	const EMLBrowse = new RollupStart({
		target: document.body,
		props: Object.assign({
			EMLBrowseStorageClient: await zerodatawrap.ZDRWrap({
				ZDRParamLibrary: RemoteStorage,
				ZDRParamScopes: [{
					ZDRScopeKey: 'App',
					ZDRScopeDirectory: 'emojilog',
					ZDRScopeSchemas: [
						EMLMemo,
						],
				}],
			}),
			EMLBrowseListDispatchCreate: (function (inputData) {
				window.TestEMLBrowseListDispatchCreate.innerHTML = parseInt(window.TestEMLBrowseListDispatchCreate.innerHTML) + 1;
				window.TestEMLBrowseListDispatchCreateData.innerHTML = JSON.stringify(Object.keys(inputData));
			}),
			EMLBrowseListDispatchForm: (function () {
				window.TestEMLBrowseListDispatchForm.innerHTML = parseInt(window.TestEMLBrowseListDispatchForm.innerHTML) + 1;
			}),
			EMLBrowseListDispatchClose: (function () {
				window.TestEMLBrowseListDispatchClose.innerHTML = parseInt(window.TestEMLBrowseListDispatchClose.innerHTML) + 1;
			}),
			EMLBrowseListDispatchExport: (function () {
				window.TestEMLBrowseListDispatchExport.innerHTML = parseInt(window.TestEMLBrowseListDispatchExport.innerHTML) + 1;
			}),
			EMLBrowseListDispatchTouch: (function (inputData) {
				window.TestEMLBrowseListDispatchTouch.innerHTML = parseInt(window.TestEMLBrowseListDispatchTouch.innerHTML) + 1;
				window.TestEMLBrowseListDispatchTouchData.innerHTML = inputData.toJSON().slice(0, 13);
			}),
			EMLBrowseJournalMemos: [],
			EMLBrowse_DEBUG: true,
		}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e, index, coll) {
			if (['EMLBrowseJournalSelected', 'EMLBrowseItemSelected'].includes(e[0])) {
				e[1] = JSON.parse(e[1]);
			}

			if (['EMLBrowseJournalSelected'].includes(e[0])) {
				e[1] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(e[1]);
			}

			if (['EMLBrowseItemSelected'].includes(e[0]) && coll.length > 1) {
				e[1] = coll[index - 1][1].filter(function (item) {
					return item.EMLMemoID === e[1].EMLMemoID;
				}).pop();
			}

			return e;
		}))),
	});
})();
