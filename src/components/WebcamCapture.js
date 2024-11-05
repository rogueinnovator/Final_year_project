"use client";
import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react"; // import useCallback
import Image from "next/image";
import { faceCompare } from "@/services/userServices";
const CustomWebcam = () =>
{
  const formData = new FormData();
  const webcamRef = useRef( null );
  const [ imgSrc, setImgSrc ] = useState( null );
  const retake = () =>
  {
    setImgSrc( null );
  };
  // create a capture function
  const capture = useCallback( () =>
  {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc( imageSrc );
  }, [ webcamRef ] );

  const sendData = async () =>
  {
    const blob = await ( await fetch( imgSrc ) ).blob();
    formData.append( "image", new File( [ blob ], "uploaded_image.jpg" ) );
    const response = faceCompare( formData );
    console.log( response );
  };

  return (
    <div className="container">
      { imgSrc ? (
        <Image src={ imgSrc } alt="webcam" width={ 500 } height={ 500 } />
      ) : (
        <Webcam height={ 600 } width={ 600 } ref={ webcamRef } />
      ) }
      <div className="flex justify-center ">
        { imgSrc ? (
          <button className="btn btn-warning m-3" onClick={ retake }>Retake photo</button>
        ) : (
          <button className="btn btn-secondary m-3" onClick={ capture }>Capture photo</button>
        ) }
        <button className="btn btn-primary m-3" onClick={ sendData }>send photo</button>

      </div>
    </div>
  );
};
export default CustomWebcam;