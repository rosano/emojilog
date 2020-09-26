const mod = {

	EMTJournalModelErrorsFor (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMTErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.EMTJournalID !== 'string') {
			errors.EMTJournalID = [
				'EMTErrorNotString',
			];
		} else if (inputData.EMTJournalID.trim() === '') {
			errors.EMTJournalID = [
				'EMTErrorNotFilled',
			];
		}

		if (typeof inputData.EMTJournalName !== 'string') {
			errors.EMTJournalName = [
				'EMTErrorNotString',
			];
		}

		if (!(inputData.EMTJournalCreationDate instanceof Date) || Number.isNaN(inputData.EMTJournalCreationDate.getTime())) {
			errors.EMTJournalCreationDate = [
				'EMTErrorNotDate',
			];
		}

		if (!(inputData.EMTJournalModificationDate instanceof Date) || Number.isNaN(inputData.EMTJournalModificationDate.getTime())) {
			errors.EMTJournalModificationDate = [
				'EMTErrorNotDate',
			];
		}

		return Object.entries(errors).length ? errors : null;
	},

};

export default mod;
