import Ember from 'ember';

const {Component, computed, get} = Ember;

export default Component.extend({
	attributeBindings: ['style'],
	style: computed('width', function () {
		const width = get(this, 'width');
    return Ember.String.htmlSafe(`flex-basis: ${width}%`);
	}),
	click() {
		get(this, 'onClick')();
	}
});
