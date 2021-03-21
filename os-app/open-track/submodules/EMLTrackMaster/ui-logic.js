const mod = {

	EMLTrackMasterSymbol (inputData) {
		return inputData.EMLJournalName || '?';
	},

};

Object.assign(exports, mod);
