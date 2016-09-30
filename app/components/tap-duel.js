import Ember from 'ember';

const {Component, get, computed, run} = Ember;

// Defining a computed property macro
function percentage(dependentKey, dependentKeyB) {
	return computed(dependentKey, dependentKeyB, function() {
		const votes = get(this, dependentKey);
		const total = get(this, dependentKeyB);
		const percentage = (votes / total * 100) || 0;
		return Math.round(percentage);
	});
}

export default Component.extend({
	classNames: ['TapDuel'],
	maxVotes: 10,
	votesForLeft: 0,
	votesForRight: 0,

	votes: computed.collect('votesForLeft', 'votesForRight'),
	totalVotes: computed.sum('votes'),
	winningVote: computed.max('votes'),
	votingFinished: computed('totalVotes', {
		get() {
			return get(this, 'totalVotes') === get(this, 'maxVotes');
		}
	}),
	votesLeft: computed('totalVotes', {
		get() {
			return get(this, 'maxVotes') - get(this, 'totalVotes');
		}
	}),
	isTie: computed('votes', {
		get() {
			const votes = get(this, 'votes');
			return votes[0] === votes[1];
		}
	}),

	leftPercentage: percentage('votesForLeft', 'totalVotes'),
	rightPercentage: percentage('votesForRight', 'totalVotes'),

	resetVote() {
		this.setProperties({
			votesForLeft: 0,
			votesForRight: 0
		});
	},

	actions: {
		castVote(vote) {
			if (get(this, 'votingFinished')) {
				return;
			}
			this.incrementProperty(vote, 1);
			if (get(this, 'votingFinished')) {
				// if (get(this, 'isTie')) {
				// }
				run.later(this, this.resetVote, 1500);
			}
		}
	}
});
