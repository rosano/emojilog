import { ulid } from 'ulid';
const uniqueID = ulid();
import OLSKRemoteStorage from 'OLSKRemoteStorage';

const mod = {

	EMLJournalErrors (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMLErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.EMLJournalID !== 'string') {
			errors.EMLJournalID = [
				'EMLErrorNotString',
			];
		} else if (!inputData.EMLJournalID.trim()) {
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

		if (typeof inputData.EMLJournalTouchDate !== 'undefined') {
			if (!(inputData.EMLJournalTouchDate instanceof Date) || Number.isNaN(inputData.EMLJournalTouchDate.getTime())) {
				errors.EMLJournalTouchDate = [
					'EMLErrorNotDate',
				];
			}
		}

		if (typeof inputData.EMLJournalFields !== 'undefined') {
			if (!Array.isArray(inputData.EMLJournalFields)) {
				errors.EMLJournalFields = [
					'EMLErrorNotArray',
				];
			} else {
				inputData.EMLJournalFields.map(function (e) {
					if (mod.EMLFieldErrors(e)) {
						throw new Error('EMLErrorInputNotValid');
					}
				});
			}
		}

		if (typeof inputData.EMLJournalChildCount !== 'undefined') {
			if (typeof inputData.EMLJournalChildCount !== 'number' || (parseInt(inputData.EMLJournalChildCount) !== inputData.EMLJournalChildCount)) {
				errors.EMLJournalChildCount = [
					'EMLErrorNotInteger',
				];
			}
		}

		if (typeof inputData.EMLJournalFieldsOnParent !== 'undefined') {
			if (typeof inputData.EMLJournalFieldsOnParent !== 'boolean') {
				errors.EMLJournalFieldsOnParent = [
					'EMLErrorNotBoolean',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	EMLFieldErrors (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMLErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.EMLFieldID !== 'string') {
			errors.EMLFieldID = [
				'EMLErrorNotString',
			];
		} else if (!inputData.EMLFieldID.trim()) {
			errors.EMLFieldID = [
				'EMLErrorNotFilled',
			];
		}

		if (typeof inputData.EMLFieldName !== 'string') {
			errors.EMLFieldName = [
				'EMLErrorNotString',
			];
		}

		if (!(inputData.EMLFieldCreationDate instanceof Date) || Number.isNaN(inputData.EMLFieldCreationDate.getTime())) {
			errors.EMLFieldCreationDate = [
				'EMLErrorNotDate',
			];
		}

		if (!(inputData.EMLFieldModificationDate instanceof Date) || Number.isNaN(inputData.EMLFieldModificationDate.getTime())) {
			errors.EMLFieldModificationDate = [
				'EMLErrorNotDate',
			];
		}		

		return Object.entries(errors).length ? errors : null;
	},

	EMLFieldGenerate () {
		const EMLFieldCreationDate = new Date();

		return {
			EMLFieldID: uniqueID(),
			EMLFieldName: '',
			EMLFieldCreationDate,
			EMLFieldModificationDate: EMLFieldCreationDate,
		};
	},
	
	EMLJournalDirectory () {
		return 'eml_journals';
	},

	EMLJournalFolderPath (inputData) {
		return `${ mod.EMLJournalDirectory() }/${ inputData.EMLJournalID }/`;
	},

	EMLJournalObjectPath (inputData) {
		return mod.EMLJournalFolderPath(inputData) + 'main';
	},

	EMLJournalStub (inputData) {
		return {
			EMLJournalID: inputData.split('/main').shift().split('/').pop(),
		};
	},

};

export default Object.assign(mod, {
	ZDRSchemaKey: 'EMLJournal',
	ZDRSchemaDispatchValidate: mod.EMLJournalErrors,
	ZDRSchemaPath: mod.EMLJournalObjectPath,
	ZDRSchemaStub: mod.EMLJournalStub,
	ZDRSchemaMethods: {
		
		EMLJournalCreate (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('EMLErrorInputNotValid');
			}

			const EMLJournalCreationDate = new Date();

			return this.App.EMLJournal.ZDRModelWriteObject(Object.assign(inputData, Object.assign({
				EMLJournalID: uniqueID(),
				EMLJournalCreationDate,
				EMLJournalModificationDate: EMLJournalCreationDate,
			}, inputData)));
		},

		EMLJournalUpdate (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('EMLErrorInputNotValid');
			}

			return this.App.EMLJournal.ZDRModelWriteObject(Object.assign(inputData, {
				EMLJournalModificationDate: new Date(),
			}));
		},

		async EMLJournalList () {
			const _this = this;
			return (await Promise.all((await _this.App.ZDRStoragePaths(mod.EMLJournalDirectory())).map(function (e) {
				return _this.App.ZDRStorageReadObject(mod.EMLJournalDirectory() + '/' + e + 'main');
			}))).filter(function (e) {
				return !!e;
			}).map(OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse);
		},

		async EMLJournalDelete (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('EMLErrorInputNotValid');
			}

			if (mod.EMLJournalErrors(inputData)) {
				throw new Error('EMLErrorInputNotValid');
			}

			await this.App.ZDRStorageDeleteFolderRecursive(mod.EMLJournalFolderPath(inputData));

			return inputData;
		},

	},
});
