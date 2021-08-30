import RollupStart from './main.svelte';

import OLSKRemoteStorage from 'OLSKRemoteStorage';

const EMLTrackJournals = new RollupStart({
	target: document.body,
	props: Object.assign({
		OLSKCollectionItems: [],
		EMLTrackJournalsDispatchCreate: (function () {
			window.TestEMLTrackJournalsDispatchCreate.innerHTML = parseInt(window.TestEMLTrackJournalsDispatchCreate.innerHTML) + 1;
		}),
		OLSKCollectionDispatchClick: (function () {}),
		EMLTrackJournals_DebugShowLauncherButton: true,
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).filter(function ([key, value]) {
		if (['EMLTrackJournalsListItems'].includes(key)) {
			setTimeout(function () {
				OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(JSON.parse(value)).map(EMLTrackJournals.modPublic.OLSKCollectionInsert);
			});

			return false;
		}

		return true;
	}))),
});

export default EMLTrackJournals;
