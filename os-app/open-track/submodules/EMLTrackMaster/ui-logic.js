const mod = {

	EMLTrackMasterAccessibilitySummary (inputData, OLSKLocalized) {
		return inputData.EMLJournalName || OLSKLocalized('EMLTrackMasterListItemUntitledText');
	},

	EMLTrackMasterSymbol (inputData) {
		return (inputData.EMLJournalName || '?').split(' ').shift();
	},

};

Object.assign(exports, mod);
