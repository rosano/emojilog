import EMLTrackTimerLogic from '../EMLTrackTimer/ui-logic.js';

const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	EMLTrackMasterSort (a, b) {
		if (!(a.EMLJournalTouchDate && b.EMLJournalTouchDate)) {
			return a.EMLJournalTouchDate ? 1 : -1;
		}
		
		return (function(e) {
			return uDescending(a[e], b[e]);
		})(['EMLJournalTouchDate', 'EMLJournalModificationDate', 'EMLJournalCreationDate'].filter(function (e) {
			return a[e] && b[e];
		}).shift());
	},

	_EMLTrackMasterGroupingDate(inputData) {
		if (!(inputData instanceof Date) || Number.isNaN(inputData.getTime())) {
			throw new Error('EMLErrorInputNotValid');
		}

		const date = (new Date(inputData.valueOf() - (inputData.getTimezoneOffset() / 60 + 4) * 1000 * 60 * 60)).toJSON().slice(0, 10);

		return new Date(date + `T04:00:00-${ (inputData.getTimezoneOffset() / 60).toString().padStart(2, '0') }:00`);
	},

	_EMLTrackMasterGroup (inputData) {
		if (!inputData.EMLJournalTouchDate) {
			return 'EMLTrackMasterGroupReadyText';
		}

		const groupingDate = mod._EMLTrackMasterGroupingDate(new Date());

		if (inputData.EMLJournalTouchDate >= groupingDate) {
			return 'EMLTrackMasterGroupTodayText';
		}

		const delta = groupingDate - inputData.EMLJournalTouchDate;

		if (delta < EMLTrackTimerLogic.EMLTrackTimerFrameMonth()) {
			return 'EMLTrackMasterGroupEarlierText';
		}

		if (delta <= EMLTrackTimerLogic.EMLTrackTimerFrameYear()) {
			return 'EMLTrackMasterGroupOverMonthText';
		}

		return 'EMLTrackMasterGroupOverYearText';
	},

	EMLTrackMasterGroupFunction (inputData, OLSKLocalized) {
		if (!Array.isArray(inputData)) {
			throw new Error('EMLErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			const group = OLSKLocalized(mod._EMLTrackMasterGroup(item));
			return Object.assign(coll, {
				[group]: (coll[group] || []).concat(item),
			});
		}, {});
	},

	EMLTrackMasterAccessibilitySummary (inputData, OLSKLocalized) {
		return inputData.EMLJournalName || OLSKLocalized('EMLTrackMasterListItemUntitledText');
	},

	EMLTrackMasterSymbol (inputData) {
		return (inputData.EMLJournalName || '?').split(' ').shift();
	},

};

export default mod;
