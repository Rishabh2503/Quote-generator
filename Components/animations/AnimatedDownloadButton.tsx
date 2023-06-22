import Image from 'next/image'
import React from 'react'

import Lottie from 'react-lottie-player'
import lottieJson from "../../assest/images/animatedphoto.json"
import { CenteredLottie, DownloadQuoteCardCon, DownloadQuoteCardConText } from './animationElements'

interface AnimatedDownloadButtonProps{
  handleDownload : () => void;
}

const AnimatedDownloadButton = ({handleDownload}:AnimatedDownloadButtonProps) => {
  return (
    <DownloadQuoteCardCon 
    onClick={handleDownload}
    >
      <CenteredLottie 
      loop
      animationData={lottieJson}
      play
      />
      <DownloadQuoteCardConText>
        Download your quote card 
      </DownloadQuoteCardConText>
      
    </DownloadQuoteCardCon>
  )
}

export default AnimatedDownloadButton
