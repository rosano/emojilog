const mod = {

	EMLTrackMasterAccessibilitySummary (inputData, OLSKLocalized) {
		return inputData.EMLJournalName || OLSKLocalized('EMLTrackMasterListItemUntitledText');
	},

	EMLTrackMasterSymbol (inputData) {
		return inputData.EMLJournalName || '?';
	},

};

Object.assign(exports, mod);
