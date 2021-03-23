import RollupStart from './main.svelte';

const EMLTemplateParamForm = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMLTemplateParamFormDispatchUpdate: (function () {
			window.TestEMLTemplateParamFormDispatchUpdate.innerHTML = parseInt(window.TestEMLTemplateParamFormDispatchUpdate.innerHTML) + 1;
		}),
		EMLTemplateParamFormDispatchDone: (function () {
			window.TestEMLTemplateParamFormDispatchDone.innerHTML = parseInt(window.TestEMLTemplateParamFormDispatchDone.innerHTML) + 1;
		}),
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if (['EMLTemplateParamFormItem'].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		return e;
	}))),
});

export default EMLTemplateParamForm;
