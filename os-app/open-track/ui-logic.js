const mod = {

	EMLTrackSort (a, b) {
		if (a.EMLJournalTouchDate && b.EMLJournalTouchDate) {
			return b.EMLJournalTouchDate - a.EMLJournalTouchDate;
		}

		if (a.EMLJournalTouchDate || b.EMLJournalTouchDate) {
			return a.EMLJournalTouchDate ? 1 : -1;
		}

		if (a.EMLJournalModificationDate && b.EMLJournalModificationDate) {
			return b.EMLJournalModificationDate - a.EMLJournalModificationDate;
		}

		return b.EMLJournalCreationDate - a.EMLJournalCreationDate;
	},

};

Object.assign(exports, mod);
