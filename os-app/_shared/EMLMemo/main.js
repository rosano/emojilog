import { factory } from 'ulid';
const uniqueID = factory();
import OLSKRemoteStorage from 'OLSKRemoteStorage';

import EMLJournal from '../EMLJournal/main.js';

const mod = {

	EMLMemoErrors (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMLErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.EMLMemoID !== 'string') {
			errors.EMLMemoID = [
				'EMLErrorNotString',
			];
		} else if (!inputData.EMLMemoID.trim()) {
			errors.EMLMemoID = [
				'EMLErrorNotFilled',
			];
		}

		if (typeof inputData.EMLMemoJournalID !== 'string') {
			errors.EMLMemoJournalID = [
				'EMLErrorNotString',
			];
		} else if (!inputData.EMLMemoJournalID.trim()) {
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

		if (typeof inputData.EMLMemoCustomData !== 'undefined') {
			if (typeof inputData.EMLMemoCustomData !== 'object' || inputData.EMLMemoCustomData === null) {
				errors.EMLMemoCustomData = [
					'EMLErrorNotObject',
				];
			}
		}

		return Object.entries(errors).length ? errors : null;
	},

	EMLMemoDirectory () {
		return 'eml_memos';
	},

	EMLMemoFolderPath (inputData) {
		return [
			EMLJournal.EMLJournalFolderPath({
				EMLJournalID: inputData.EMLMemoJournalID,
			}) + mod.EMLMemoDirectory(),
			inputData.EMLMemoCreationDate.toJSON().split('T').shift(),
			inputData.EMLMemoID,
		].join('/') + '/';
	},

	EMLMemoObjectPath (inputData) {
		return mod.EMLMemoFolderPath(inputData) + 'main';
	},

	EMLMemoStub (inputData) {
		const groups = (inputData.match(new RegExp(`\/(?<journal>[\\w\.]+)\/${ mod.EMLMemoDirectory() }\/(?<date>[0-9]{4}-[0-9]{2}-[0-9]{2})\/(?<memo>[\\w\.]+)\/main`)) || {}).groups || {};

		return {
			EMLMemoID: groups.memo,
			EMLMemoJournalID: groups.journal,
			EMLMemoCreationDate: new Date(groups.date || Date.now()),
		};
	},

};

export default Object.assign(mod, {
	ZDRSchemaKey: 'EMLMemo',
	ZDRSchemaDispatchValidate: mod.EMLMemoErrors,
	ZDRSchemaPath: mod.EMLMemoObjectPath,
	ZDRSchemaStub: mod.EMLMemoStub,
	ZDRSchemaMethods: {
		
		EMLMemoCreate (param1, param2) {
			if (typeof param1 !== 'object' || param1 === null) {
				throw new Error('EMLErrorInputNotValid');
			}

			if (EMLJournal.EMLJournalErrors(param2)) {
				throw new Error('EMLErrorInputNotValid');
			}

			const EMLMemoCreationDate = new Date();

			return this.App.EMLMemo.ZDRModelWriteObject(Object.assign(param1, Object.assign({
				EMLMemoID: uniqueID(),
				EMLMemoJournalID: param2.EMLJournalID,
				EMLMemoCreationDate,
				EMLMemoModificationDate: EMLMemoCreationDate,
			}, param1)));
		},

		EMLMemoUpdate (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('EMLErrorInputNotValid');
			}

			return this.App.EMLMemo.ZDRModelWriteObject(Object.assign(inputData, {
				EMLMemoModificationDate: new Date(),
			}));
		},

		async EMLMemoList (inputData) {
			if (EMLJournal.EMLJournalErrors(inputData)) {
				throw new Error('EMLErrorInputNotValid');
			}
			
			const _this = this;

			return Promise.all((await _this.App.ZDRStoragePathsRecursive(EMLJournal.EMLJournalFolderPath(inputData) + mod.EMLMemoDirectory())).filter(function (e) {
				return e === mod.EMLMemoObjectPath(mod.EMLMemoStub(e));
			}).map(async function (e) {
				return OLSKRemoteStorage.OLSKRemoteStoragePostJSONParse(await _this.App.ZDRStorageReadObject(e));
			}));
		},

		async EMLMemoDelete (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('EMLErrorInputNotValid');
			}

			if (mod.EMLMemoErrors(inputData)) {
				throw new Error('EMLErrorInputNotValid');
			}

			await this.App.ZDRStorageDeleteFolderRecursive(mod.EMLMemoFolderPath(inputData));

			return inputData;
		},

	},
});
