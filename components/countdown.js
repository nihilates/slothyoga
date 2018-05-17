import { Component } from 'react'
import '../styles/style.scss'

export default class Countdown extends Component {
	constructor() {
		super()
		this.state = {
			timer: 3,
			isInitiated: false,
			display: true
		}

		this.tickDown = this.tickDown.bind(this)
		this.displayTime = this.displayTime.bind(this)
	}

	componentDidMount() {
		this.setState({isInitiated: true})
	}

	displayTime(time) {
		return (time > 0)  ? time : 'START'
	}

	tickDown(time) {
		if (time === 0) {
			this.setState({isInitiated: false, display: false})
			return;
		}
		let newTime = time -1
		this.setState({timer: newTime})
	}

	render() {
		if (this.state.isInitiated) {
			setTimeout(() => {
				this.tickDown(this.state.timer)
			},1000)
		}
		return (
	  	<div className="countdown">
				{(this.state.display) ? <span className="timer">{this.displayTime(this.state.timer)}</span> : <div />}
	  	</div>
		)
	}
}
