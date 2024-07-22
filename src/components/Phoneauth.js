import React, { useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Button,Form,Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
const Phoneauth = () =>{
const [number,setNumber] = useState("");
const [error, setError] = useState("");
const [otp, setOtp] = useState("");
const [flag,setFlag] = useState("flase");
const [confirmObj, setConfirmObj] = useState("");
const {setUpRecaptcha} = useUserAuth("");
const navigate = useNavigate()
const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if(number==="" || number === undefined) return setError("Please enter valid phone number")
        try {
            const response = await setUpRecaptcha(number)
            console.log(response)
            setConfirmObj(response);
            setFlag(true);
        } catch (error) {
            setError(error.message)
        }
    console.log(number)
};

const verifyOtp = async (e)=>{
    e.preventDefault();
    console.log(otp)
    if(otp ==="" || otp ===null) return
    try {
        setError("");
        await confirmObj.confirm(otp);
        navigate("/home");
    } catch (error) {
        setError(error.message)
    }
}
    return (
        <>
        <div className="p-4 box">
          <h2 className="mb-3">Firebase Phone Auth</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={getOtp} style={{display: !flag ? "block":"none"}}>
            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
             <PhoneInput defaultCountry="PH"
             value={number}
             onChange={setNumber}
             placeholder="Enter your Phone Number"/>
             <div id="recaptcha-container" />
            </Form.Group>
            <div className="button-right">
                <Link to="/">
                <Button variant="success">cancel</Button>
                </Link>&nbsp;
            <Button type="submit" variant="primary">Send OTP</Button>
            </div>
          </Form>
          <Form onSubmit={verifyOtp} style={{display: !flag ? "block":"none"}}>
            <Form.Group className="mb-3" controlId="formBasicOtp">
             <Form.Control
                type="text"
                placeholder="Enter your OTP"
                onChange={(e)=> setOtp(e.target.value)}
               />
            </Form.Group>
            <div className="button-right">
                <Link to="/">
                <Button variant="success">cancel</Button>
                </Link>&nbsp;
            <Button type="submit" variant="primary">Verify OTP</Button>
            </div>
          </Form>
          <hr />
          </div>
          </>
       );
};
export default Phoneauth