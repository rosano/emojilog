const mod = {

	EMTTrackSort (a, b) {
		if (a.EMTJournalModificationDate && b.EMTJournalModificationDate) {
			return b.EMTJournalModificationDate - a.EMTJournalModificationDate;
		}

		return b.EMTJournalCreationDate - a.EMTJournalCreationDate;
	},

};

Object.assign(exports, mod);
