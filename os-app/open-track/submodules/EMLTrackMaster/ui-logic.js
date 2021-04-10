import EMLTrackTimerLogic from '../EMLTrackTimer/ui-logic.js';
import OLSKMoment from 'OLSKMoment';

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

	_EMLTrackMasterChunk (inputData) {
		if (!inputData.EMLJournalTouchDate) {
			return 'EMLTrackMasterGroupReadyText';
		}

		const groupingDate = OLSKMoment.OLSKMomentPerceptionDate(new Date());

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

	EMLTrackMasterChunkFunction (inputData, OLSKLocalized) {
		if (!Array.isArray(inputData)) {
			throw new Error('EMLErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			const group = OLSKLocalized(mod._EMLTrackMasterChunk(item));
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
