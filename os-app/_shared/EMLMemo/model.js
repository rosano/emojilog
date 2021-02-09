const mod = {

	EMLMemoModelErrorsFor(inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMLErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.EMLMemoID !== 'string') {
			errors.EMLMemoID = [
				'EMLErrorNotString',
			];
		} else if (inputData.EMLMemoID.trim() === '') {
			errors.EMLMemoID = [
				'EMLErrorNotFilled',
			];
		}

		if (typeof inputData.EMLMemoJournalID !== 'string') {
			errors.EMLMemoJournalID = [
				'EMLErrorNotString',
			];
		} else if (inputData.EMLMemoJournalID.trim() === '') {
			errors.EMLMemoJournalID = [
				'EMLErrorNotFilled',
			];
		}

		if (!(inputData.EMLMemoCreationDate instanceof Date) || Number.isNaN(inputData.EMLMemoCreationDate.getTime())) {
			errors.EMLMemoCreationDate = [
				'EMLErrorNotDate',
			];
		}

		if (!(inputData.EMLMemoModificationDate instanceof Date) || Number.isNaN(inputData.EMLMemoModificationDate.getTime())) {
			errors.EMLMemoModificationDate = [
				'EMLErrorNotDate',
			];
		}

		if (!(inputData.EMLMemoEventDate instanceof Date) || Number.isNaN(inputData.EMLMemoEventDate.getTime())) {
			errors.EMLMemoEventDate = [
				'EMLErrorNotDate',
			];
		}

		if (typeof inputData.EMLMemoNotes !== 'string') {
			errors.EMLMemoNotes = [
				'EMLErrorNotString',
			];
		}

		return Object.entries(errors).length ? errors : null;
	},

};

export default mod;
