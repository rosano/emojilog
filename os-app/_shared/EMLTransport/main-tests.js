const { throws, rejects, deepEqual, strictEqual, notStrictEqual } = require('assert');

const mod = require('./main.js').default;

describe('EMLTransportImport', function test_EMLTransportImport() {

	const uJournal = function (inputData) {
		return StubJournalObjectValid(Object.assign({
			$EMLJournalMemos: [],
		}, inputData));
	};

	it('rejects if not object', async function () {
		await rejects(ZDRTestingWrap.App.EMLTransport.EMLTransportImport(null), /EMLErrorInputNotValid/);
	});

	it('returns object', async function () {
		deepEqual(await ZDRTestingWrap.App.EMLTransport.EMLTransportImport({}), {});
	});

	context('EMLJournal', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.EMLTransport.EMLTransportImport({
				EMLJournal: null,
			}), /EMLErrorInputNotValid/);
		});
		
		it('rejects if not valid', async function () {
			await rejects(ZDRTestingWrap.App.EMLTransport.EMLTransportImport({
				EMLJournal: [uJournal({
					EMLJournalName: null,
				})],
			}), /EMLErrorInputNotValid/);
		});

		it('passes input', async function () {
			const item = uJournal()
			strictEqual((await ZDRTestingWrap.App.EMLTransport.EMLTransportImport({
				EMLJournal: [item],
			})).EMLJournal.shift(), item);
		});

		it('removes $EMLJournalMemos', async function () {
			const item = await ZDRTestingWrap.App.EMLTransport.EMLTransportImport({
				EMLJournal: [uJournal()],
			});

			deepEqual(item.EMLJournal.shift().$EMLJournalMemos, undefined);
		});

		it('writes objects', async function () {
			const item = uJournal();

			await ZDRTestingWrap.App.EMLTransport.EMLTransportImport({
				EMLJournal: [item],
			});

			deepEqual(await ZDRTestingWrap.App.EMLJournal.EMLJournalList(), [item]);
		});		

		context('$EMLJournalMemos', function () {
			
			it('rejects if not array', async function () {
				await rejects(ZDRTestingWrap.App.EMLTransport.EMLTransportImport({
					EMLJournal: [uJournal({
						$EMLJournalMemos: null,
					})],
				}), /EMLErrorInputNotValid/);
			});

			it('rejects if not valid', async function () {
				await rejects(ZDRTestingWrap.App.EMLTransport.EMLTransportImport({
					EMLJournal: [uJournal({
						$EMLJournalMemos: [StubMemoObjectValid({
							EMLMemoNotes: null,
						})],
					})],
				}), /EMLErrorInputNotValid/);
			});

			it('creates EMLMemo objects', async function () {
				const item = StubMemoObjectValid();

				delete item.EMLMemoID;
				delete item.EMLMemoJournalID;

				const list = await ZDRTestingWrap.App.EMLMemo.EMLMemoList((await ZDRTestingWrap.App.EMLTransport.EMLTransportImport({
					EMLJournal: [uJournal({
						$EMLJournalMemos: [item],
					})],
				})).EMLJournal.shift());

				deepEqual(list, [Object.assign(item, {
					EMLMemoID: list[0].EMLMemoID,
					EMLMemoJournalID: list[0].EMLMemoJournalID,
				})]);
			});
		
		});
	
	});

	context('EMLSetting', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.EMLTransport.EMLTransportImport({
				EMLSetting: null,
			}), /EMLErrorInputNotValid/);
		});
		
		it('rejects if not valid', async function () {
			await rejects(ZDRTestingWrap.App.EMLTransport.EMLTransportImport({
				EMLSetting: [StubSettingObjectValid({
					EMLSettingKey: null,
				})],
			}), /EMLErrorInputNotValid/);
		});

		it('passes input', async function () {
			const item = StubSettingObjectValid()
			strictEqual((await ZDRTestingWrap.App.EMLTransport.EMLTransportImport({
				EMLSetting: [item],
			})).EMLSetting.shift(), item);
		});

		it('writes objects', async function () {
			const item = StubSettingObjectValid();

			await ZDRTestingWrap.App.EMLTransport.EMLTransportImport({
				EMLSetting: [item],
			});

			deepEqual(await ZDRTestingWrap.App.EMLSetting.EMLSettingList(), [item]);
		});
	
	});

});

describe('EMLTransportExport', function test_EMLTransportExport() {

	it('rejects if not object', async function () {
		await rejects(ZDRTestingWrap.App.EMLTransport.EMLTransportExport(null), /EMLErrorInputNotValid/);
	});

	context('EMLJournal', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.EMLTransport.EMLTransportExport({
				EMLJournal: null,
			}), /EMLErrorInputNotValid/);
		});

		it('copies input', async function () {
			const item = StubJournalObjectValid();
			notStrictEqual((await ZDRTestingWrap.App.EMLTransport.EMLTransportExport({
				EMLJournal: [item],
			})).EMLJournal.shift(), item);
		});

		it('strips dynamic attributes', async function () {
			const item = StubJournalObjectValid({
				$alfa: Math.random().toString(),
			});
			deepEqual((await ZDRTestingWrap.App.EMLTransport.EMLTransportExport({
				EMLJournal: [item],
			})).EMLJournal.shift().$alfa, undefined);
		});

		context('$EMLJournalMemos', function () {
			
			it('sets to EMLMemo objects', async function () {
				const journal = StubJournalObjectValid();
				const item = await ZDRTestingWrap.App.EMLMemo.EMLMemoCreate(StubMemoObjectValid(), journal);

				deepEqual(await ZDRTestingWrap.App.EMLTransport.EMLTransportExport({
					EMLJournal: [journal],
				}), {
					EMLJournal: [Object.assign(journal, {
						$EMLJournalMemos: await ZDRTestingWrap.App.EMLMemo.EMLMemoList(journal),
					})],
				});
			});
		
		});
	
	});

	context('EMLSetting', function () {

		it('rejects if not array', async function () {
			await rejects(ZDRTestingWrap.App.EMLTransport.EMLTransportExport({
				EMLSetting: null,
			}), /EMLErrorInputNotValid/);
		});

		it('copies input', async function () {
			const item = StubSettingObjectValid();
			notStrictEqual((await ZDRTestingWrap.App.EMLTransport.EMLTransportExport({
				EMLSetting: [item],
			})).EMLSetting.shift(), item);
		});

		it('strips dynamic attributes', async function () {
			const item = StubSettingObjectValid({
				$alfa: Math.random().toString(),
			});
			deepEqual((await ZDRTestingWrap.App.EMLTransport.EMLTransportExport({
				EMLSetting: [item],
			})).EMLSetting.shift().$alfa, undefined);
		});
	
	});

});
