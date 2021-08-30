import OLSKRemoteStorage from 'OLSKRemoteStorage';

export default {
	ZDRSchemaKey: 'EMLTransport',
	ZDRSchemaDispatchValidate: (function () {}),
	ZDRSchemaPath: (function () {}),
	ZDRSchemaStub: (function () {}),
	ZDRSchemaMethods: {

		async EMLTransportImport (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('EMLErrorInputNotValid');
			}

			const _this = this;

			return Object.fromEntries(await Promise.all(Object.entries(inputData).map(async function ([key, value]) {
				if (!Array.isArray(value)) {
					throw new Error('EMLErrorInputNotValid');
				}

				return [key, await ({
					EMLJournal: (function () {
						return Promise.all(value.map(async function (e) {
							if (!Array.isArray(e.$EMLJournalMemos)) {
								throw new Error('EMLErrorInputNotValid');
							}

							const journal = await _this.App.EMLJournal.EMLJournalCreate(e).catch(function () {
								throw new Error('EMLErrorInputNotValid');
							});

							await Promise.all(e.$EMLJournalMemos.map(async function (e) {
								return await _this.App.EMLMemo.EMLMemoCreate(e, journal).catch(function () {
									throw new Error('EMLErrorInputNotValid');
								});
							}));

							delete journal.$EMLJournalMemos;

							return journal;
						}));
					}),
					EMLSetting: (function () {
						return Promise.all(value.map(function (e) {
							return _this.App.EMLSetting.ZDRModelWriteObject(e).catch(function () {
								throw new Error('EMLErrorInputNotValid');
							});
						}));
					}),
				}[key]())];
			})));
		},

		async EMLTransportExport (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('EMLErrorInputNotValid');
			}

			const _this = this;

			return Object.fromEntries(await Promise.all(Object.entries(inputData).map(async function ([key, value]) {
				if (!Array.isArray(value)) {
					throw new Error('EMLErrorInputNotValid');
				}

				return [key, await Promise.all(value.map(async function (item) {
					return Object.assign(OLSKRemoteStorage.OLSKRemoteStorageSafeCopy(item), key !== 'EMLJournal' ? {} : {
						$EMLJournalMemos: await _this.App.EMLMemo.EMLMemoList(item),
					});
				}))];
			})));
		},

	},
};
