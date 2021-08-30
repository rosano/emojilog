import EMLTrackTimerLogic from './submodules/EMLTrackTimer/ui-logic.js';
import OLSKMoment from 'OLSKMoment';

const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	EMLTrackJournalsSort (a, b) {
		if (!(a.EMLJournalTouchDate && b.EMLJournalTouchDate)) {
			return a.EMLJournalTouchDate ? 1 : -1;
		}
		
		return (function(e) {
			return uDescending(a[e], b[e]);
		})(['EMLJournalTouchDate', 'EMLJournalModificationDate', 'EMLJournalCreationDate'].filter(function (e) {
			return a[e] && b[e];
		}).shift());
	},

	_EMLTrackJournalsChunk (inputData) {
		if (!inputData.EMLJournalTouchDate) {
			return 'EMLTrackJournalsGroupReadyText';
		}

		const groupingDate = OLSKMoment.OLSKMomentPerceptionDate(new Date());

		if (inputData.EMLJournalTouchDate >= groupingDate) {
			return 'EMLTrackJournalsGroupTodayText';
		}

		const delta = groupingDate - inputData.EMLJournalTouchDate;

		if (delta < EMLTrackTimerLogic.EMLTrackTimerFrameMonth()) {
			return 'EMLTrackJournalsGroupEarlierText';
		}

		if (delta <= EMLTrackTimerLogic.EMLTrackTimerFrameYear()) {
			return 'EMLTrackJournalsGroupOverMonthText';
		}

		return 'EMLTrackJournalsGroupOverYearText';
	},

	EMLTrackJournalsChunkFunction (inputData, OLSKLocalized) {
		if (!Array.isArray(inputData)) {
			throw new Error('EMLErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			const group = OLSKLocalized(mod._EMLTrackJournalsChunk(item));
			return Object.assign(coll, {
				[group]: (coll[group] || []).concat(item),
			});
		}, {});
	},

	EMLTrackJournalsAccessibilitySummary (inputData, OLSKLocalized) {
		return inputData.EMLJournalName || OLSKLocalized('EMLTrackJournalsListItemUntitledText');
	},

	EMLTrackJournalsSymbol (inputData) {
		return (inputData.EMLJournalName || '?').split(' ').shift();
	},

};

export default mod;
