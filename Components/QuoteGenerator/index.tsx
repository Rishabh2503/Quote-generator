
import React,{useEffect, useState} from 'react'

//Material Ui Imports
import { Fade,Backdrop,Modal } from '@mui/material'
import { ModalCircularProgress, QuoteGeneratorModalCon, QuoteGeneratorModalInnerCon, QuoteGeneratorSubTitle, QuoteGeneratorTitle } from './QuoteGenerator';
import ImageBlob from '../animations/ImageBlob';
import { ImageBlobCon } from '../animations/animationElements';
import AnimatedDownloadButton from '../animations/AnimatedDownloadButton';
interface QuoteGeneratorModalProps {
    open: boolean,
    close : () => void;
    processingQuote : boolean;
    setProcessingQuote : React.Dispatch<React.SetStateAction<boolean>>;
    quoteReceived :  String | null;
    setQuoteReceived :  React.Dispatch<React.SetStateAction<String | null>>;
}


const style = {

}

const QuoteGeneratorModal = ({
    open,
    close,
    processingQuote,
    setProcessingQuote,
    quoteReceived,
    setQuoteReceived
}:QuoteGeneratorModalProps) => {
    const wiseDevQuote = '"IF you can center a div,anything is possible"';
    const wiseDevQuoteAuthor = "-a wise Heavy Coder🧑🏼‍💻";
    const [blobUrl,setBlobUrl] = useState<string | null>(null)
   
    //Function : Handling the download of quote card
      const handleDownload = () => {
        const link = document.createElement('a');
        if(typeof blobUrl === 'string'){
            link.href = blobUrl;
            link.download = 'quote.png';
            link.click();
        };
      }
    //Function : Handle the receiving of quote card
    useEffect(() =>{
        if(quoteReceived){
            const binaryData = Buffer.from(quoteReceived,'base64');
            const blob = new Blob([binaryData],{type : 'image/png'});
            const blobUrlGenerated = URL.createObjectURL(blob);
            console.log(blobUrlGenerated);
            setBlobUrl(blobUrlGenerated);
           return () => {
            URL.revokeObjectURL(blobUrlGenerated)
           } 
        }


    },[quoteReceived])
   
    return (
        <Modal
        id="QuoteGeneratorModal"
        aria-labelledby = "spring-modal-quotegeneratormodal"
        aria-describedby = "spring-modal-opens-and-closes-quote-generator"
        open = {open}
        onClose = {close}
        closeAfterTransition
        BackdropComponent = {Backdrop}
        BackdropProps ={{
            timeout : 500,
        }}
        >
            <Fade in={open}>
                <QuoteGeneratorModalCon 
                sx={style}
                >
                    <QuoteGeneratorModalInnerCon>
                        {/* State 1 : Processing request to quote + quote state is empty */}
                        {(processingQuote === true && quoteReceived === null) &&
                        <>
                        <ModalCircularProgress
                        size = {"8rem"}
                        thickness = {2.5} 
                        />
                        <QuoteGeneratorTitle>
                            Creating your Quote...
                        </QuoteGeneratorTitle>
                        <QuoteGeneratorSubTitle style={{marginTop : "20px"}} >
                            {wiseDevQuote}
                            <br></br>
                            <span style={{fontSize:26}}>{wiseDevQuoteAuthor}</span>
                        </QuoteGeneratorSubTitle>
                        
                        </>

                        }
                        {/* State 2 : Quote state is fulfilled */}
                        {quoteReceived === null &&
                        <>
                        <QuoteGeneratorTitle>
                            Download your quote!
                        </QuoteGeneratorTitle>
                        <QuoteGeneratorSubTitle style={{marginTop:"20px"}}>See a preview:👇🏼</QuoteGeneratorSubTitle>
                        <ImageBlobCon>
                         <ImageBlob 
                         quoteReceived={quoteReceived}
                         blobUrl={blobUrl}
                         />
                        </ImageBlobCon>
                        <AnimatedDownloadButton 
                        handleDownload={handleDownload}
                        />
                        </>
                        }

                    </QuoteGeneratorModalInnerCon>
                </QuoteGeneratorModalCon>

            </Fade>
        
        </Modal>
  )
}

export default QuoteGeneratorModal
