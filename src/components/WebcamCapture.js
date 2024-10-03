import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef(null);

  const captureImage = () => {
    const image = webcamRef.current.getScreenshot();
    setImageSrc(image);
    retrieveRecord(image); // Replace this with your actual retrieval logic.
  };

  // Placeholder for data retrieval logic
  const retrieveRecord = image => {
    console.log('Retrieving record for captured image...', image);
    // Add your API call or logic here
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <h1 className='text-2xl mb-4'>Capture Image</h1>

      {showWebcam ? (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          className='rounded-lg border-2 border-gray-300 shadow-lg'
          style={{ width: '400px', height: '300px' }}
        />
      ) : (
        <div className='bg-gray-200 rounded-lg p-8 text-center'>
          <p className='text-gray-600'>
            Webcam is off. Click "Open Webcam" to start.
          </p>
        </div>
      )}

      <div className='mt-4 flex space-x-4'>
        <button
          className='btn bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105'
          onClick={() => setShowWebcam(!showWebcam)}
        >
          {showWebcam ? 'Close Webcam' : 'Open Webcam'}
        </button>

        {showWebcam && (
          <button
            className='btn bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105'
            onClick={captureImage}
          >
            Take Picture
          </button>
        )}
      </div>

      {imageSrc && (
        <div className='mt-8'>
          <h2 className='text-xl mb-2'>Captured Image:</h2>
          <img
            src={imageSrc}
            alt='Captured'
            className='rounded-lg shadow-lg border-2 border-gray-300'
          />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
