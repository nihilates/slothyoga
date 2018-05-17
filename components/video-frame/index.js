import { Component } from 'react'
import * as posenet from "@tensorflow-models/posenet";

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
      outputStride: 16
    };

    this.video = React.createRef();
  }

  componentDidMount() {
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

        console.log(features);
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
    return (
      <video
        autoPlay
        playsInline
        ref={this.video}
        height="480px"
        width="480px"
      />
    );
  }
}

export default VideoFrame