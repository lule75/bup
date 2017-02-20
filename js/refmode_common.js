'use strict';

var refmode_common = (function() {

function craft_event(s, match_storage_module) {
	var ev = s.event;
	var res = utils.pluck(ev, [
		'id', 'event_name', 'tournament_name',
		'courts',
		'location', 'protest', 'matchday', 'starttime', 'notes',
		'team_competition', 'team_names', 'league_key',
		'all_players', 'backup_players', 'present_players',
		'last_update',
	]);

	if (ev.matches) {
		res.matches = ev.matches.map(function(m) {
			var mr = utils.pluck(
				m, ['setup', 'network_score', 'presses', 'presses_json']);
			if (!m.presses && !m.presses_json && match_storage_module) {
				var loaded = match_storage_module.get(m.setup.match_id);
				if (loaded) {
					mr.presses = loaded.presses;
				}
			}
			return mr;
		});
	}
	return res;
}

return {
	craft_event: craft_event,
};

})();

/*@DEV*/
if ((typeof module !== 'undefined') && (typeof require !== 'undefined')) {
	var utils = require('./utils');

	module.exports = refmode_common;
}
/*/@DEV*/
