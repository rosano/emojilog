const mod = {

	// LIFECYCLE

	LifecyclePageWillLoad () {
		new Main({
			target: document.body,
			props: {
			},
		});
	},

};

window.EMTTrackBehaviour = mod;
