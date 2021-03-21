import RollupStart from './main.svelte';

const EMLTrackTimer = new RollupStart({
	target: document.body,
	props: Object.assign({
		EMLTrackTimerText: '🙂',
	}, Object.fromEntries(Array.from((new window.URLSearchParams(window.location.search)).entries()).map(function (e) {
		if ([].includes(e[0])) {
			e[1] = JSON.parse(e[1]);
		}

		if (e[0] === 'EMLTrackTimerEventDate') {
			e[1] = new Date(e[1]);
		}

		return e;
	}))),
});

export default EMLTrackTimer;
