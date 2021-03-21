const uDescending = function (a, b) {
  return (a > b) ? -1 : ((a < b) ? 1 : 0);
};

const mod = {

	EMLTrackSort (a, b) {
		if (!(a.EMLJournalTouchDate && b.EMLJournalTouchDate)) {
			return a.EMLJournalTouchDate ? 1 : -1;
		}
		
		return (function(e) {
			return uDescending(a[e], b[e]);
		})(['EMLJournalTouchDate', 'EMLJournalModificationDate', 'EMLJournalCreationDate'].filter(function (e) {
			return a[e] && b[e];
		}).shift());
	},

};

Object.assign(exports, mod);
