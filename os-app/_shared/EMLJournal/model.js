const mod = {

	EMLJournalModelErrorsFor (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMLErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.EMLJournalID !== 'string') {
			errors.EMLJournalID = [
				'EMLErrorNotString',
			];
		} else if (inputData.EMLJournalID.trim() === '') {
			errors.EMLJournalID = [
				'EMLErrorNotFilled',
			];
		}

		if (typeof inputData.EMLJournalName !== 'string') {
			errors.EMLJournalName = [
				'EMLErrorNotString',
			];
		}

		if (!(inputData.EMLJournalCreationDate instanceof Date) || Number.isNaN(inputData.EMLJournalCreationDate.getTime())) {
			errors.EMLJournalCreationDate = [
				'EMLErrorNotDate',
			];
		}

		if (!(inputData.EMLJournalModificationDate instanceof Date) || Number.isNaN(inputData.EMLJournalModificationDate.getTime())) {
			errors.EMLJournalModificationDate = [
				'EMLErrorNotDate',
			];
		}

		return Object.entries(errors).length ? errors : null;
	},

};

export default mod;
