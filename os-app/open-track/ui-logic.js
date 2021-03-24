const mod = {

	EMLTrackDocumentCount (inputData) {
		if (!Array.isArray(inputData)) {
			throw new Error('EMLErrorInputNotValid');
		}

		return inputData.reduce(function (coll, item) {
			if (!item || !item.EMLJournalID) {
				return coll;
			}

			return coll + (item.EMLJournalChildCount || 0);
		}, 0);
	},

};

export default mod;
