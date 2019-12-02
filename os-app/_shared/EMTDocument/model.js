export const EMTDocumentModelErrorsFor = function(inputData, options = {}) {
	if (typeof inputData !== 'object' || inputData === null) {
		throw new Error('EMTErrorInputNotValid');
	}

	var errors = {};

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
};

export const EMTDocumentModelPreJSONSchemaValidate = function(inputData) {
	if (inputData.EMTDocumentCreationDate) {
		inputData.EMTDocumentCreationDate = inputData.EMTDocumentCreationDate.toISOString();
	}

	if (inputData.EMTDocumentModificationDate) {
		inputData.EMTDocumentModificationDate = inputData.EMTDocumentModificationDate.toISOString();
	}

	return inputData;
};

export const EMTDocumentModelPostJSONParse = function(inputData) {
	if (!inputData) {
		return inputData;
	}

	if (inputData.EMTDocumentCreationDate) {
		inputData.EMTDocumentCreationDate = new Date(inputData.EMTDocumentCreationDate);
	}

	if (inputData.EMTDocumentModificationDate) {
		inputData.EMTDocumentModificationDate = new Date(inputData.EMTDocumentModificationDate);
	}

	return inputData;
};
