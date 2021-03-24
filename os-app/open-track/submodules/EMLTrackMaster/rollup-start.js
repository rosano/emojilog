import RollupStart from './main.svelte';

import OLSKRemoteStorage from 'OLSKRemoteStorage';

const EMLTrackMaster = new RollupStart({
	target: document.body,
	props: Object.assign({
		OLSKCollectionItems: [],
		EMLTrackMasterDispatchCreate: (function () {
			window.TestEMLTrackMasterDispatchCreate.innerHTML = parseInt(window.TestEMLTrackMasterDispatchCreate.innerHTML) + 1;
		}),
		OLSKCollectionDispatchClick: (function () {}),
		EMLTrackMaster_DebugShowLauncherButton: true,
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).filter(function ([key, value]) {
		if (['EMLTrackMasterListItems'].includes(key)) {
			setTimeout(function () {
				OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(JSON.parse(value)).map(EMLTrackMaster.modPublic.OLSKCollectionInsert);
			});

			return false;
		}

		return true;
	}))),
});

export default EMLTrackMaster;
