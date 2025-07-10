import React from 'react'
import "./myOrder.css"
import { useState } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const {url,token} = useContext(StoreContext);
    const [data,setdata] = useState([]);

    const fetchOrders = async ()=>{
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setdata(response.data.data);
        console.log(response.data.data)
    }

    useEffect(()=>{
        if (token) {
            fetchOrders();
            
        }
    },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className='container'>
        {data.map((order,index)=>{
            return(
                <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon}/>
                <p>{order.items.map((item,index)=>{
                       if(index === order.items.length-1){
                        return item.name+ " X"+item.qauntity
                       } else {
                        return item.name+ " X"+item.qauntity + " ,"
                       }
                })}</p>
                <p>${order.amount}.00</p>
                <p>Items:{order.items.length}</p>
                <p><span>&#x25f;</span><b>{order.status}</b></p>
                <button>Track Order</button>
                </div>
                
            )
        })}
      
    </div>
    </div>
  )
}

export default MyOrders
