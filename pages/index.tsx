import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'

// Components
import { BackGroundImage1, BackGroundImage2,FootContainer, GenerateQuoteButton, GenerateQuoteButtonText, GradientBackgroundColor, FontLink, QuoteGeneratorContainer, QuoteGeneratorInnerCon, QuoteGeneratorSubTitle, QuoteGeneratorTitle } from '@/Components/QuoteGenerator/QuoteGenerator'


//Images
import cloud1 from "../assest/images/2.png"
import cloud2 from "../assest/images/cloudy-weather.png"
import { API } from 'aws-amplify'
import { quoteQueryName } from '@/src/graphql/queries'
import { GraphQLResult } from "@aws-amplify/api-graphql"

//interface for DynamoDB object
interface UpdateQuoteInfoData
  {
    id : string;
    queryName: string;
    quotesGenerated : number;
    createdAt : string;
    updatedAt : string;
    }



//type guard for our fetch function
function isGraphQLResultForquotesQueryName(response: any): response is GraphQLResult<{
  quoteQueryName: {
    items: UpdateQuoteInfoData[];
  };
}> {
  return (
    response.data &&
    response.data.quoteQueryName &&
    Array.isArray(response.data.quoteQueryName.items)
  );
}

export default function Home() {
  const [numberOfQuotes,setNumberofQuotes] = useState<Number | null>(0);
  //Function for fetch to our DynamoDB object(quotes generated)
   const updateQuoteInfo = async () =>{
    try {
      const response = await API.graphql<UpdateQuoteInfoData>({
        query : quoteQueryName,
        authMode : "AWS_IAM",
        variables :{
          queryName:"LIVE",
        },
      })
      console.log('response',response);
      
      // setNumberofQuotes(response.data.quotesQueryName.items[0].quotesGenerator);
      
      //Create Type guards
      if(!isGraphQLResultForquotesQueryName(response)){
        throw new Error('Unexpected response from API.graphql');
      }
      if(!response.data){
        throw new Error('Response data is undefined');  
      }
      const receivedNumberOfQuotes = response.data.quoteQueryName.items[0].quotesGenerated;

 
      setNumberofQuotes(receivedNumberOfQuotes);


    } catch(error){
      console.log('error getting quote data',error)
    }
   }

   useEffect(() =>{
    updateQuoteInfo();
   },[])

  
  return (
    <>
      <Head>
        <title>Quote Generator</title>
        <meta name="description" content="Get Inspired by quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Background */}
      <GradientBackgroundColor >
      {/* Quote Generator Modal Pop-up */}
      {/* <QuoteGeneratorModal />
      */}

      {/* Quote Generator  */}
      <QuoteGeneratorContainer>
        <QuoteGeneratorInnerCon>
          <QuoteGeneratorTitle>
            Daily Inspiration Generator
          </QuoteGeneratorTitle>

          <QuoteGeneratorSubTitle>
          Embark on a journey of inspiration with <FontLink href="https://zenquotes.io/" target="_blank" rel="noopener">ZenQuotes API.</FontLink> Let our captivating quote cards ignite your passion and fuel your creative fire.
          </QuoteGeneratorSubTitle>
          <GenerateQuoteButton>
            <GenerateQuoteButtonText >
              Make a Quote
            </GenerateQuoteButtonText>
          </GenerateQuoteButton>
        </QuoteGeneratorInnerCon>
      </QuoteGeneratorContainer>




      {/* BackGroundImage */}
        <BackGroundImage1
        src = {cloud1}
        height="200"
        alt="Cloud image"
        priority
        />
        <BackGroundImage2
        src={cloud2}
        height="200"
        width="300"
        alt='cloud image'
        priority
        />


        {/* Footer Container */}
        <FootContainer>
          <>
          Quotes Generated : {numberOfQuotes}
          <br />
          Developed with 💖 by Rishabh Gupta
          
          </>
        </FootContainer>

       


        </GradientBackgroundColor>
    </>
  )

}
