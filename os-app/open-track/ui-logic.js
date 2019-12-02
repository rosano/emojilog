export const EMTTrackSort = function (a, b) {
	if (a.EMTDocumentModificationDate && b.EMTDocumentModificationDate) {
		return b.EMTDocumentModificationDate - a.EMTDocumentModificationDate;
	}

	return b.EMTDocumentCreationDate - a.EMTDocumentCreationDate;
};
