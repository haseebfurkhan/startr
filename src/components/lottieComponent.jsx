import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from '../lottiefiles/human.json'

class LottieComponent extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <div>
        <div>
          <Lottie options={defaultOptions}
            height={"100%"}
            width={"100%"}
          />
        </div>

      </div>
    );
  }
}

export default LottieComponent;