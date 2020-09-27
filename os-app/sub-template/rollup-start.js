import RollupStart from './main.svelte';

const EMTTemplate = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMTTemplateDispatchBack: (function () {
			window.TestEMTTemplateDispatchBack.innerHTML = parseInt(window.TestEMTTemplateDispatchBack.innerHTML) + 1;
		}),
		EMTTemplateDispatchDiscard: (function (inputData) {
			window.TestEMTTemplateDispatchDiscard.innerHTML = parseInt(window.TestEMTTemplateDispatchDiscard.innerHTML) + 1;
			window.TestEMTTemplateDispatchDiscardData.innerHTML = JSON.stringify(inputData);
		}),
		EMTTemplateDispatchUpdate: (function () {
			window.TestEMTTemplateDispatchUpdate.innerHTML = parseInt(window.TestEMTTemplateDispatchUpdate.innerHTML) + 1;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['EMTTemplateItem'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default EMTTemplate;
