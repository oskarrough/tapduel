import Ember from 'ember';

const {Component, get, getProperties, setProperties, computed, Handlebars} = Ember;

// Defining a computed property macro
function percentage(dependentKey, dependentKeyB) {
  return Ember.computed(dependentKey, dependentKeyB, function() {
    const votes = get(this, dependentKey);
    const total = get(this, dependentKeyB);
    const percentage = (votes / total * 100) || 0;
    return Math.round(percentage);
  });
}

export default Component.extend({
  classNames: ['TapDuel'],
  maxVotes: 5,
  votesForLeft: 0,
  votesForRight: 0,
  votes: computed.collect('votesForLeft', 'votesForRight'),
  totalVotes: computed.sum('votes'),
  winningVote: computed.max('votes'), 
  leftPercentage: percentage('votesForLeft', 'totalVotes'),
  rightPercentage: percentage('votesForRight', 'totalVotes'),
  
  castVote(vote) {
    if (get(this, 'totalVotes') === get(this, 'maxVotes')) {
      return this.resetVote();
    }
    this.incrementProperty(vote, 1);
  },
  
  resetVote() {
    const winningVote = get
  	setProperties(this, {
      votesForLeft: 0,
      votesForRight: 0
    });
  },
	
  actions: {
  	left() {
    	this.castVote('votesForLeft');
    },
    right() {
    	this.castVote('votesForRight');
    }
  }
});
