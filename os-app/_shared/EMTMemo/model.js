const mod = {

	EMTMemoModelErrorsFor(inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMTErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.EMTMemoID !== 'string') {
			errors.EMTMemoID = [
				'EMTErrorNotString',
			];
		} else if (inputData.EMTMemoID.trim() === '') {
			errors.EMTMemoID = [
				'EMTErrorNotFilled',
			];
		}

		if (typeof inputData.EMTMemoJournalID !== 'string') {
			errors.EMTMemoJournalID = [
				'EMTErrorNotString',
			];
		} else if (inputData.EMTMemoJournalID.trim() === '') {
			errors.EMTMemoJournalID = [
				'EMTErrorNotFilled',
			];
		}

		if (!(inputData.EMTMemoCreationDate instanceof Date) || Number.isNaN(inputData.EMTMemoCreationDate.getTime())) {
			errors.EMTMemoCreationDate = [
				'EMTErrorNotDate',
			];
		}

		if (!(inputData.EMTMemoModificationDate instanceof Date) || Number.isNaN(inputData.EMTMemoModificationDate.getTime())) {
			errors.EMTMemoModificationDate = [
				'EMTErrorNotDate',
			];
		}

		if (!(inputData.EMTMemoEventDate instanceof Date) || Number.isNaN(inputData.EMTMemoEventDate.getTime())) {
			errors.EMTMemoEventDate = [
				'EMTErrorNotDate',
			];
		}

		if (typeof inputData.EMTMemoNotes !== 'string') {
			errors.EMTMemoNotes = [
				'EMTErrorNotString',
			];
		}

		return Object.entries(errors).length ? errors : null;
	},

};

export default mod;
