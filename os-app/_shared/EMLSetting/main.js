const mod = {

	EMLSettingErrors (inputData, options = {}) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('EMLErrorInputNotValid');
		}

		const errors = {};

		if (typeof inputData.EMLSettingKey !== 'string') {
			errors.EMLSettingKey = [
				'EMLErrorNotString',
			];
		} else if (!inputData.EMLSettingKey.trim()) {
			errors.EMLSettingKey = [
				'EMLErrorNotFilled',
			];
		}

		if (typeof inputData.EMLSettingValue !== 'string') {
			errors.EMLSettingValue = [
				'EMLErrorNotString',
			];
		}

		return Object.entries(errors).length ? errors : null;
	},

	EMLSettingDirectory () {
		return 'eml_settings';
	},

	EMLSettingPath (inputData) {
		return `${ mod.EMLSettingDirectory() }/${ inputData.EMLSettingKey }`;
	},

	EMLSettingStub (inputData) {
		return {
			EMLSettingKey: inputData.split('/').pop(),
		};
	},

};

export default Object.assign(mod, {
	ZDRSchemaKey: 'EMLSetting',
	ZDRSchemaDispatchValidate: mod.EMLSettingErrors,
	ZDRSchemaPath: mod.EMLSettingPath,
	ZDRSchemaStub: mod.EMLSettingStub,
	ZDRSchemaMethods: {
		
		async EMLSettingList () {
			return Object.values(await this.App.EMLSetting.ZDRModelListObjects());
		},

	},
});
