import RollupStart from './main.svelte';

const EMLTemplate = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMLTemplateDispatchDone: (function () {
			window.TestEMLTemplateDispatchDone.innerHTML = parseInt(window.TestEMLTemplateDispatchDone.innerHTML) + 1;
		}),
		EMLTemplateDispatchDiscard: (function (inputData) {
			window.TestEMLTemplateDispatchDiscard.innerHTML = parseInt(window.TestEMLTemplateDispatchDiscard.innerHTML) + 1;
			window.TestEMLTemplateDispatchDiscardData.innerHTML = JSON.stringify(inputData);
		}),
		EMLTemplateDispatchUpdate: (function () {
			window.TestEMLTemplateDispatchUpdate.innerHTML = parseInt(window.TestEMLTemplateDispatchUpdate.innerHTML) + 1;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['EMLTemplateItem'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default EMLTemplate;
