import { factory } from 'ulid';
const uniqueID = factory();
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

		return Object.entries(errors).length ? errors : null;
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
