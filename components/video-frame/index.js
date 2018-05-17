import { Component, Fragment } from "react";
import * as posenet from "@tensorflow-models/posenet";
import PropTypes from "prop-types";
import AudioService from "../../service/audio";

import { receiveSound } from "../utils";

import Countdown from "../countdown";

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
      countdown: true
    };

    this.video = React.createRef();
    this.c1 = React.createRef();
    this.c2 = React.createRef();
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
        let ctx = this.c2.current.getContext("2d");

        ctx.clearRect(0, 0, this.c2.current.width, this.c2.current.height);

        let features = await net.estimateSinglePose(
          this.video.current,
          this.state.scaleFactor,
          this.state.flipHorizontal,
          this.state.outputStride
        );

        const { keypoints } = features;
        const { part: leftPart, position: leftPosition } = keypoints[9];
        const { part: rightPart, position: rightPosition } = keypoints[10];

        ctx.fillRect(leftPosition.x, leftPosition.y, 10, 10);
        ctx.fillRect(rightPosition.x, rightPosition.y, 10, 10);

        console.log(
          "Volume",
          Math.floor((leftPosition.y + rightPosition.y) / 8)
        );

        console.log(
          "Pitch",
          Math.floor(leftPosition.x * 1.5 + rightPosition.x * 1.5) / 2
        );

        this.audio.changeVolume(
          Math.floor((leftPosition.y + rightPosition.y) / 8)
        );

        this.audio.changePitch(
          Math.floor(leftPosition.x * 1.5 + rightPosition.x * 1.5) / 2
        );
      });
    });
  }

  updateCanvas = () => {
    let ctx = this.c1.current.getContext("2d");

    ctx.clearRect(0, 0, this.c1.current.width, this.c1.current.height);

    let scale = Math.min(
      this.c1.current.width / this.video.current.videoWidth,
      this.c1.current.height / this.video.current.videoHeight
    );

    let vidH = this.video.current.videoHeight;
    let vidW = this.video.current.videoWidth;

    let top = this.c1.current.height / 2 - vidH / 2 * scale;
    let left = this.c1.current.width / 2 - vidW / 2 * scale;

    ctx.drawImage(this.video.current, left, top, vidW * scale, vidH * scale);

    requestAnimationFrame(this.updateCanvas);
  };

  handleWebRTCSuccess = stream => {
    this.video.current.srcObject = stream;

    this.video.current.onplay = () => {
      this.c1.current.height = 480;
      this.c2.current.height = 480;
      this.c1.current.width = 480;
      this.c2.current.width = 480;

      requestAnimationFrame(this.updateCanvas);
    };
  };

  handleWebRTCError = error => {
    console.log(error);
  };

  allowCountdown() {
    setTimeout(() => this.setState({ countdown: false }), 4500);
  }

  render() {
    const { size } = this.props;

    const canvasStyle = {
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0"
    };

    this.allowCountdown();

    return (
      <Fragment>
        {this.state.countdown && <Countdown />}

        <canvas id="c1" ref={this.c1} style={canvasStyle} />
        <canvas id="c2" ref={this.c2} style={canvasStyle} />

        <video
          autoPlay
          playsInline
          ref={this.video}
          height={size}
          width={size}
          style={{
            display: "none"
          }}
        />
      </Fragment>
    );
  }
}

VideoFrame.propTypes = {
  size: PropTypes.string
};

VideoFrame.defaultProps = {
  size: "480px"
};

export default VideoFrame;
