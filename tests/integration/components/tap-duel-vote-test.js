import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tap-duel-vote', 'Integration | Component | tap duel vote', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tap-duel-vote}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tap-duel-vote}}
      template block text
    {{/tap-duel-vote}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
