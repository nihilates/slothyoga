import React from 'react';
import Slider from 'react-rangeslider'
import AudioService from '../service/audio'

export default class extends React.Component {
	constructor(props, context) {
	    super(props, context)
	    this.state = {
	      pitch: 500,
	      volume: 0
	    }
	 }

	componentDidMount() {	  	
	  	this.audio = new AudioService();
	}
		
	handlePitch = (value) => {
	    this.setState({
	      pitch: value
	    })
	   
  		this.audio.changePitch(this.state.pitch);
  	}

 	handleVolume = (value) => {
  		this.setState({
  			volume: value
  		})

  		this.audio.changeVolume(this.state.volume);
  	}

  	handleSlideComplete = () => {
  		this.audio.release();
  	}

	render() {
			let { pitch, volume } = this.state
			
		return (
			<div>
				 <Slider
				 	min={500}
				 	max={1600}
        			value={pitch}
			        orientation="horizontal"
			        onChange={this.handlePitch}
			        onChangeComplete={this.handleSlideComplete}
      			/>
      			<Slider
        			value={volume}
			        orientation="vertical"
			        onChange={this.handleVolume}
      			/>      			
      			<p>{`Pitch: ${pitch}`}</p>
      			<p>{`Volume: ${volume}`}</p>
			</div>
		);
	}
}
