import RollupStart from './main.svelte';

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
			e[1] = JSON.parse(e[1]);
		if (['EMLTrackMasterListItems'].includes(e[0])) {
		}

		return e;
	}))),
});

export default EMLTrackMaster;
