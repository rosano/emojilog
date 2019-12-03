const mod = {

	EMTTrackSort (a, b) {
		if (a.EMTDocumentModificationDate && b.EMTDocumentModificationDate) {
			return b.EMTDocumentModificationDate - a.EMTDocumentModificationDate;
		}

		return b.EMTDocumentCreationDate - a.EMTDocumentCreationDate;
	},

};

module.exports = mod
