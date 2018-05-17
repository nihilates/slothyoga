import React, { Component } from "react";
import Container from "../components/container";

import * as posenet from "@tensorflow-models/posenet";

class Index extends Component {
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
      <Container>
        <video
          autoPlay
          playsInline
          ref={this.video}
          height="480px"
          width="480px"
        />
      </Container>
    );
  }
}

export default Index;
