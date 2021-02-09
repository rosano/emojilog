import RollupStart from './main.svelte';

const params = Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
	if (['EMLBrowseInfoItem'].includes(e[0])) {
		e[1] = JSON.parse(e[1]);
	}

	return e;
}));

const mod = {

	// REACT

	ReactDetailItem(inputData) {
		window.TestEMLBrowseInfoItem.innerHTML = JSON.stringify(inputData);
	},

	// SETUP

	SetupEverything() {
		mod.ReactDetailItem(params.EMLBrowseInfoItem);
	},

	// LIFECYCLE

	LifecycleModuleDidLoad() {
		mod.SetupEverything();
	},

};

mod.LifecycleModuleDidLoad();

const EMLBrowseInfo = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMLBrowseInfoDispatchBack: (function () {
			window.TestEMLBrowseInfoDispatchBack.innerHTML = parseInt(window.TestEMLBrowseInfoDispatchBack.innerHTML) + 1;
		}),
		EMLBrowseInfoDispatchDiscard: (function (inputData) {
			window.TestEMLBrowseInfoDispatchDiscard.innerHTML = parseInt(window.TestEMLBrowseInfoDispatchDiscard.innerHTML) + 1;
			window.TestEMLBrowseInfoDispatchDiscardData.innerHTML = JSON.stringify(inputData);
		}),
		EMLBrowseInfoDispatchUpdate: (function () {
			window.TestEMLBrowseInfoDispatchUpdate.innerHTML = parseInt(window.TestEMLBrowseInfoDispatchUpdate.innerHTML) + 1;

			mod.ReactDetailItem(params.EMLBrowseInfoItem);
		}),
		EMLBrowseInfoDispatchDebug: (function (inputData) {
			window.TestEMLBrowseInfoDispatchDebug.innerHTML = parseInt(window.TestEMLBrowseInfoDispatchDebug.innerHTML) + 1;
			window.TestEMLBrowseInfoDispatchDebugData.innerHTML = JSON.stringify(inputData);
		}),
		EMLBrowseInfo_DebugShowLauncherButton: true,
	}, params),
});

export default EMLBrowseInfo;