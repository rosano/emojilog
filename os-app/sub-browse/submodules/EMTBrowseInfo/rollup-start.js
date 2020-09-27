import RollupStart from './main.svelte';

const params = Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
	if (['EMTBrowseInfoItem', 'EMTBrowseInfoJournal'].includes(e[0])) {
		e[1] = JSON.parse(e[1]);
	}

	return e;
}));

const mod = {

	// REACT

	ReactDetailItem(inputData) {
		window.TestEMTBrowseInfoItem.innerHTML = JSON.stringify(inputData);
	},

	// SETUP

	SetupEverything() {
		mod.ReactDetailItem(params.EMTBrowseInfoItem);
	},

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		mod.SetupEverything();
	},

};

mod.LifecycleModuleDidLoad();

const EMTBrowseInfo = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMTBrowseInfoJournal: {},
		EMTBrowseInfoDispatchBack: (function _EMTBrowseInfoDispatchBack() {
			window.TestEMTBrowseInfoDispatchBack.innerHTML = parseInt(window.TestEMTBrowseInfoDispatchBack.innerHTML) + 1;
		}),
		EMTBrowseInfoDispatchDiscard: (function _EMTBrowseInfoDispatchDiscard(inputData) {
			window.TestEMTBrowseInfoDispatchDiscard.innerHTML = parseInt(window.TestEMTBrowseInfoDispatchDiscard.innerHTML) + 1;
			window.TestEMTBrowseInfoDispatchDiscardData.innerHTML = JSON.stringify(inputData);
		}),
		EMTBrowseInfoDispatchUpdate: (function _EMTBrowseInfoDispatchUpdate() {
			window.TestEMTBrowseInfoDispatchUpdate.innerHTML = parseInt(window.TestEMTBrowseInfoDispatchUpdate.innerHTML) + 1;

			mod.ReactDetailItem(params.EMTBrowseInfoItem);
		}),
		EMTBrowseInfoDispatchDebug: (function _EMTBrowseInfoDispatchDebug(inputData) {
			window.TestEMTBrowseInfoDispatchDebug.innerHTML = parseInt(window.TestEMTBrowseInfoDispatchDebug.innerHTML) + 1;
			window.TestEMTBrowseInfoDispatchDebugData.innerHTML = JSON.stringify(inputData);
		}),
		EMTBrowseInfo_DebugShowLauncherButton: true,
	}, params),
});

export default EMTBrowseInfo;
