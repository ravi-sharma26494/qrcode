import React, { useRef, useState } from "react";
import qrcode from "qrcode";
import QrReader from "react-qr-reader";

const QRCodeEx = () => {
    const qrRef = useRef(null);
    const [fileResult,setFileResult]= useState();
    const [webcamResult,setWebcamResult]= useState();
    const [text, setText] = useState("");
    const [imageQR, setImageQR] = useState("");
    const generateQRCode = async () => {
    const image = await qrcode.toDataURL(text);
    setImageQR(image);
  };
  const openDialog =() =>{
    qrRef.current.openImageDialog();
  };
  const fileError = (error) =>{
    if(error){
        console.log(error);
    }
  };
  const  fileScan = (result) =>{
    if(result){
        setFileResult(result);
    }
  }
  const webcamError = (error) =>{
    if(error){
        console.log(error);
    }
  };
  const  webcamScan = (result) =>{
    if(result){
        setWebcamResult(result);
    }
  }
  return (
    <div className="container mx-auto mt-4">
      <div className="row">
        <h2 className="col-sm-12 badges bg-danger text-center text-white">
          Qr Code generator
        </h2>
      </div>
      <div className="row">
        <h3 className="col-sm-12 ">Enter text For Qr code</h3>
      </div>
      <div className="row">
        <input
          type="text"
          className="col-sm-5 m-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="col-sm-2 btn btn-info btn m-2"
          onClick={generateQRCode}
        >
          Generate Qr Code
        </button>
      </div>
      <div className="row">
        <div className="card col-sm-4">
          <div className="card-header m-1 rounded text-center">
            <h3>QrCode Image</h3>
          </div>
          <div className="card-body text-center">
            {imageQR && 
                <a href={imageQR} download><img src={imageQR} alt="qr code pic" width={"70%"}/></a> 
            }
          </div>
        </div>

        <div className="card col-sm-4">
          <div className="card-header m-1 rounded text-center">
            <button className="btn  btn-warning" onClick={openDialog}>
              <h5>Open Qr Code File</h5>
            </button>
          </div>
          <div className="card-body text-center">
            <QrReader
              ref={qrRef}
              delay={300}
              onError={fileError}
              onScan={fileScan}
              legacyMode={true}
            />
          </div>
          <div className="card-footer rounded mb-1">
            <h6>Image Result: {fileResult}</h6>
          </div>
        </div>

        <div className="card col-sm-4">
          <div className="card-header m-1 rounded text-center">
            <h3>WebCam Image</h3>
          </div>
          <div className="card-body text-center">
            <QrReader
            delay={300}
            onError={webcamError}
            onScan={webcamScan}
            legacyMode={false}
            facingMode="environment"
            />
          </div>
          <div className="card-footer rounded mb-1">
            <h6>WebCam Result: {webcamResult}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeEx;
