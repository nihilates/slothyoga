import React, { Component } from "react"
import * as posenet from "@tensorflow-models/posenet";
import PropTypes from "prop-types"
import AudioService from '../../service/audio'

import { receiveSound } from "../utils"

class VideoFrame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      constraints: {
        audio: false,
        video: true
      },
      scaleFactor: 0.5,
      flipHorizontal: true,
      outputStride: 16,
    };

    this.video = React.createRef();
  }

  componentDidMount() {
    this.audio = new AudioService();
    // setup webrtc
    navigator.mediaDevices
      .getUserMedia(this.state.constraints)
      .then(this.handleWebRTCSuccess)
      .catch(this.handleWebRTCError);

    posenet.load().then(net => {
      setInterval(async () => {
        let features = await net.estimateSinglePose(
          this.video.current,
          this.state.scaleFactor,
          this.state.flipHorizontal,
          this.state.outputStride
        );
        
        const { keypoints } = features
        const { part: leftPart, position: leftPosition } = keypoints[9]
        const { part: rightPart, position: rightPosition } = keypoints[10]
        console.log('Volume', Math.floor((leftPosition.y+rightPosition.y)/8))
        console.log('Pitch', Math.floor((leftPosition.x*1.5)+(rightPosition.x*1.5))/2)
        
        this.audio.changeVolume(Math.floor((leftPosition.y+rightPosition.y)/8))
        this.audio.changePitch(Math.floor((leftPosition.x*1.5)+(rightPosition.x*1.5))/2)
      });
    });
  }

  handleWebRTCSuccess = stream => {
    this.video.current.srcObject = stream;
  };

  handleWebRTCError = error => {
    console.log(error);
  };

  render() {
    const { size } = this.props

    return (
      <div className="video-container" style={{ height: size, width: size }}>
        <video
          autoPlay
          playsInline
          ref={this.video}
          height={size}
          width={size}
        />
      </div>
    );
  }
}

VideoFrame.propTypes = {
  size: PropTypes.string
}

VideoFrame.defaultProps = {
  size: "480px"
}

export default VideoFrame