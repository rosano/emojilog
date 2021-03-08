const { rejects, throws, deepEqual } = require('assert');

const mod = require('./main.js').default;

describe('EMLSettingModelErrors', function test_EMLSettingModelErrors() {

	it('throws error if not object', function() {
		throws(function() {
			mod.EMLSettingModelErrors(null);
		}, /EMLErrorInputNotValid/);
	});

	it('returns object if EMLSettingKey not string', function() {
		deepEqual(mod.EMLSettingModelErrors(StubSettingObjectValid({
			EMLSettingKey: null,
		})), {
			EMLSettingKey: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns object if EMLSettingKey not filled', function() {
		deepEqual(mod.EMLSettingModelErrors(StubSettingObjectValid({
			EMLSettingKey: ' ',
		})), {
			EMLSettingKey: [
				'EMLErrorNotFilled',
			],
		});
	});

	it('returns object if EMLSettingValue not string', function() {
		deepEqual(mod.EMLSettingModelErrors(StubSettingObjectValid({
			EMLSettingValue: null,
		})), {
			EMLSettingValue: [
				'EMLErrorNotString',
			],
		});
	});

	it('returns null', function() {
		deepEqual(mod.EMLSettingModelErrors(StubSettingObjectValid()), null);
	});

});

describe('EMLSettingDirectory', function test_EMLSettingDirectory() {

	it('returns string', function() {
		deepEqual(mod.EMLSettingDirectory(), 'eml_settings');
	});

});

describe('EMLSettingPath', function test_EMLSettingPath() {

	it('returns string', function() {
		const EMLSettingKey = Math.random().toString();
		deepEqual(mod.EMLSettingPath({
			EMLSettingKey,
		}), mod.EMLSettingDirectory() + '/' + EMLSettingKey);
	});

});

describe('EMLSettingStub', function test_EMLSettingStub() {

	it('returns string', function() {
		const EMLSettingKey = Math.random().toString();
		deepEqual(mod.EMLSettingStub(`${ mod.EMLSettingDirectory() }/${ EMLSettingKey }`), {
			EMLSettingKey,
		});
	});

});

describe('EMLSettingList', function test_EMLSettingActList() {

	it('returns array', async function() {
		deepEqual(await ZDRTestingWrap.App.EMLSetting.EMLSettingList(), []);
	});

	it('returns array with existing items', async function() {
		
		const item = await ZDRTestingWrap.App.EMLSetting.ZDRModelWriteObject(StubSettingObjectValid());
		deepEqual(await ZDRTestingWrap.App.EMLSetting.EMLSettingList(), [item]);
	});

});

describe('ZDRSchemaDispatchValidate', function () {

	it('returns function', function () {
		deepEqual(mod.ZDRSchemaDispatchValidate, mod.EMLSettingModelErrors);
	});

});

describe('ZDRSchemaPath', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaPath, mod.EMLSettingPath);
	});

});


describe('ZDRSchemaStub', function () {

	it('returns function', function() {
		deepEqual(mod.ZDRSchemaStub, mod.EMLSettingStub);
	});

});
