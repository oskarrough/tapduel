export default class TapDuelVote extends HTMLElement {
    vote() {
	const event = new CustomEvent('vote', {
	    bubbles: true,
	    detail: {
		vote: this.getAttribute('vote'),
		count: this.count
	    }
	})
	this.dispatchEvent(event)
    }
    connectedCallback() {
	this.render()
    }
    render() {
	const $el = document.createElement('button')
	$el.innerText = this.getAttribute('vote')
	$el.addEventListener('click', this.vote.bind(this))
	this.append($el)	
    }
}

customElements.define('tap-duel-vote', TapDuelVote)
