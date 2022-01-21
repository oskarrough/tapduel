import TapDuelVote from './tap-duel-vote.js'

export default class TapDuel extends HTMLElement {
    newGame() {
	this.state = {
	    a: 0,
	    b: 0,
	    max: 2
	}
    }
    handleVote({detail}) {
	console.log(detail.vote)
	this.state[detail.vote]++
	this.runLogic()
    }
    runLogic() {
	const {a, b, max} = this.state



	
	if (a === max || b === max) {
	    this.state.gameOver = true
	    this.render()
	}
    }
    connectedCallback() {
	this.newGame()
	this.render()
	this.addEventListener('vote', this.handleVote.bind(this))
    }
    render() {
	this.innerHTML = ''
	const $a = document.createElement('tap-duel-vote')
	$a.setAttribute('vote', 'a')
	$a.style = `flex-basis: ${this.state.a}`
	const $b = document.createElement('tap-duel-vote')
	$b.setAttribute('vote', 'b')
	this.append($a, $b)
	if (this.state.gameOver) {
	    alert('someone won')
	}
    }
}

customElements.define('tap-duel', TapDuel)
