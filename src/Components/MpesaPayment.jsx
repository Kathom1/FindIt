import react, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const MpesaPayment =()=>{
    //receive the product sent fro getproducts
    const{product} =useLocation().state || {

    }
    //hookes
    const [phone,setPhoneNumber]=useState("")
    const[message,setMessage] = useState("")
    const img_URL ="https://beviskiboko.alwaysdata.net/static/images/"
    console.log("res",product)
    //create a function o handle the form submition
    const submit = async(e)=>{
        e.preventDefault()
        try {
            //Crreate a form data object
            const data = new FormData()
            data.append('phone',phone)//0phone number is fro state variable
            data.append('amount',product.product_cost)//coming from the receives object
            //post data to the backend api
            const response = await axios.post('https://beviskiboko.alwaysdata.net//api/mpesa_payment',data)
            //update message hook
            setMessage(response.data.message)
        } catch (error) {
            setMessage("Tafadhali jaribu tena")
        }
    }
    return(
        <div className="card shadow  col-md-6 container">
            <div className="card-header text-success text-center">
            <h2>LIPA NA MPESA</h2>
            
            </div>
            <div className="card-body">
                <img src={img_URL+ product.product_photo} alt="product" className="product_img"/>
            <p><b>product:</b>{product.product_name}</p>
            <p><b>Price:</b>{product.product_cost}</p>
            <form onSubmit={submit}>
                <input type="text" placeholder="Enter Phone Number" className="form-control mb-2"required value={phone} onChange={(e)=>setPhoneNumber(e.target.value)}/>
                <button type="submit" className="btn btn-success w-100 bg-info">Pay Now</button>
            </form>
            </div>
            <div className="card-footer text-center">
                
                <p className="text-center mt-2">{message}</p>
            </div>
        </div>
    )
}
export default MpesaPayment;