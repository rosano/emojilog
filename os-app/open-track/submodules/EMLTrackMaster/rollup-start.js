import RollupStart from './main.svelte';

import OLSKRemoteStorage from 'OLSKRemoteStorage';

const EMLTrackMaster = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMLTrackMasterListItems: [],
		EMLTrackMasterDispatchCreate: (function () {
			window.TestEMLTrackMasterDispatchCreate.innerHTML = parseInt(window.TestEMLTrackMasterDispatchCreate.innerHTML) + 1;
		}),
		EMLTrackMasterDispatchSelect: (function (inputData) {
			window.TestEMLTrackMasterDispatchSelect.innerHTML = parseInt(window.TestEMLTrackMasterDispatchSelect.innerHTML) + 1;
			window.TestEMLTrackMasterDispatchSelectData.innerHTML = JSON.stringify(inputData);
		}),
		EMLTrackMasterDispatchImportData: (function (inputData) {
			window.TestEMLTrackMasterDispatchImportData.innerHTML = parseInt(window.TestEMLTrackMasterDispatchImportData.innerHTML) + 1;
			window.TestEMLTrackMasterDispatchImportDataData.innerHTML = inputData;
		}),
		EMLTrackMaster_DebugShowLauncherButton: true,
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['EMLTrackMasterListItems'].includes(e[0])) {
			e[1] = OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(JSON.parse(e[1]));
		}

		return e;
	}))),
});

export default EMLTrackMaster;
