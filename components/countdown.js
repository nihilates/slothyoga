import { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/style.scss'


// export default class Countdown extends Component {
// 	constructor() {
//     super();

//     this.state = {
//       timer: 3,
//       start: false,
//       display: true
//     };

//     this.changeTimer = this.changeTimer.bind(this);
//     // this.stopTimer = this.stopTimer.bind(this);
//     // this.resetTimer = this.resetTimer.bind(this);
//     // this.onSecondsChanged = this.onSecondsChanged.bind(this);
//   }

//   changeTimer(time) {
//   	if (time >= 0) {
//   		setTimeout(() => {
//   			console.log(time)
//   			this.setState({timer: time--})
//   		}, 1000)
//   	} else {
//   		console.log('not!')
//   	}
//   }

//  // onSecondsChanged(seconds) {
//  //      seconds = parseInt(seconds);

//  //      if (seconds && typeof seconds === 'number') {
//  //          if (seconds <= 359999) {
//  //              this.setState(() => ({ seconds: seconds, time: seconds * 1000 }));
//  //          }
//  //      } else {
//  //          this.setState(() => ({ seconds: 0, time: 0 }));
//  //      }
//  //  }

//  //  startTimer() {
//  //      if (this.state.status !== 'started') {
//  //          this.interval = setInterval(() => {
//  //              if (this.state.time !== 0) {
//  //                  this.setState(prevState => ({ time: prevState.time - 10 }));
//  //              } else {
//  //                  this.setState(() => ({ seconds: 0, status: null, time: 0 }));

//  //                  clearInterval(this.interval);
//  //              }
//  //          }, 10);

//  //          this.setState(() => ({ status: 'started' }));
//  //      }
//  //  }

//  //  stopTimer() {
//  //      if (this.state.status && this.state.status === 'started') {

//  //          clearInterval(this.interval);

//  //          this.setState((prevState) => {
//  //              return ({
//  //                  status: 'stopped',
//  //                  seconds: Math.floor(prevState.time / 1000)
//  //              });
//  //          });
//  //      }
//  //  }

//   resetTimer() {
//       clearInterval(this.interval);

//       this.setState(() => ({ seconds: 0, status: null, time: 0 }));
//   }

// 	render() {
// 		// console.log('rendering')
// 		// console.log(this.state.timer)
// 		// this.changeTimer(this.state.timer)
// 		return (
// 		  // { this.state.display ?
// 		  	<div className='countdown'>
// 		  		<h1>{this.state.timer}</h1>
// 		  	</div>
// 		 //  :
// 		 //  	<div />
// 			// }
// 		)
// 	}
// }

// Countdown.propTypes = {

// }


class Countdown extends Component {
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
				console.log('current time', this.state.timer)
				this.tickDown(this.state.timer)
			},1000)
		}
		return (
	  	<div>
				{(this.state.display) ? <h1>{this.displayTime(this.state.timer)}</h1> : <div />}
	  	</div>
		)
	}
}

export default Countdown
