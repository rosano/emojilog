const mod = {

	EMTDocumentModelErrorsFor (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMTErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.EMTDocumentID !== 'string') {
			errors.EMTDocumentID = [
				'EMTErrorNotString',
			];
		} else if (inputData.EMTDocumentID.trim() === '') {
			errors.EMTDocumentID = [
				'EMTErrorNotFilled',
			];
		}

		if (typeof inputData.EMTDocumentName !== 'string') {
			errors.EMTDocumentName = [
				'EMTErrorNotString',
			];
		}

		if (!(inputData.EMTDocumentCreationDate instanceof Date) || Number.isNaN(inputData.EMTDocumentCreationDate.getTime())) {
			errors.EMTDocumentCreationDate = [
				'EMTErrorNotDate',
			];
		}

		if (!(inputData.EMTDocumentModificationDate instanceof Date) || Number.isNaN(inputData.EMTDocumentModificationDate.getTime())) {
			errors.EMTDocumentModificationDate = [
				'EMTErrorNotDate',
			];
		}

		return Object.entries(errors).length ? errors : null;
	},

};

export default mod;
