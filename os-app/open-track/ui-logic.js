const mod = {

	EMLTrackSort (a, b) {
		if (a.EMLJournalModificationDate && b.EMLJournalModificationDate) {
			return b.EMLJournalModificationDate - a.EMLJournalModificationDate;
		}

		return b.EMLJournalCreationDate - a.EMLJournalCreationDate;
	},

};

Object.assign(exports, mod);
