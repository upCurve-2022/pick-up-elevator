import React from "react";
import './Qr.css';
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate,useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getQr } from '../../services/getQr';

  function QRgererator() {
    
    let navigate = useNavigate();

    let url= '';
    const {orderId,customerId} =useParams();

    const {isLoading, data, isError, error } = useQuery(['orders'], async()=>await getQr({orderId}.orderId,{customerId}.customerId)); 

    if(data) {
      url = data.data.image_code;
    }
    
    const qrcode = (
      <QRCodeCanvas
        value={url}
        size={200}
        bgColor={"white"}
      />
    );

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>{error.message}</div>

    if(!data) navigate("/error")

    return (
      <>
      <div className="container">
        <h2>Scan the QR Code at pickup store</h2>
        <p>{qrcode}</p>
      </div>
      </>
    );
}
  
export default QRgererator;