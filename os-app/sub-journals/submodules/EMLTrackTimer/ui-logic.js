const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	EMLTrackTimerFrameMinute () {
		return 1000 * 60;
	},

	EMLTrackTimerFrameHour () {
		return mod.EMLTrackTimerFrameMinute() * 60;
	},

	EMLTrackTimerFrameDay () {
		return mod.EMLTrackTimerFrameHour() * 24;
	},

	EMLTrackTimerFrameWeek () {
		return mod.EMLTrackTimerFrameDay() * 7;
	},

	EMLTrackTimerFrameMonth () {
		return mod.EMLTrackTimerFrameDay() * 365 / 12.0;
	},

	EMLTrackTimerFrameYear () {
		return mod.EMLTrackTimerFrameDay() * 365;
	},

	EMLTrackTimerFrameInfinity () {
		return Infinity;
	},

	EMLTrackTimerFrames () {
		return [
			mod.EMLTrackTimerFrameMinute(),
			mod.EMLTrackTimerFrameHour(),
			mod.EMLTrackTimerFrameDay(),
			mod.EMLTrackTimerFrameWeek(),
			mod.EMLTrackTimerFrameMonth(),
			mod.EMLTrackTimerFrameYear(),
			mod.EMLTrackTimerFrameInfinity(),
		];
	},

	EMLTrackTimerFrame (param1, param2) {
		if (!(param1 instanceof Date) || Number.isNaN(param1.getTime())) {
			throw new Error('EMLErrorInputNotValid');
		}

		if (!(param2 instanceof Date) || Number.isNaN(param2.getTime())) {
			throw new Error('EMLErrorInputNotValid');
		}

		const delta = param2 - param1;
		return mod.EMLTrackTimerFrames().filter(function (e) {
			return delta < e;
		}).shift();
	},

	EMLTrackTimerLines () {
		return {
			[mod.EMLTrackTimerFrameMinute()]: 1,
			[mod.EMLTrackTimerFrameHour()]: 4,
			[mod.EMLTrackTimerFrameDay()]: 24,
			[mod.EMLTrackTimerFrameWeek()]: 7,
			[mod.EMLTrackTimerFrameMonth()]: 2,
			[mod.EMLTrackTimerFrameYear()]: 12,
			[mod.EMLTrackTimerFrameInfinity()]: 0,
		};
	},

};

Object.assign(exports, mod);
