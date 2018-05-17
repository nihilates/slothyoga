import React, { Component } from "react";
import * as posenet from "@tensorflow-models/posenet";

import Container from "../components/container";
import VideoFrame from "../components/video-frame"


class Index extends Component {
  render() {
    return (
      <Container>
        <VideoFrame />
      </Container>
    );
  }
}

export default Index;
