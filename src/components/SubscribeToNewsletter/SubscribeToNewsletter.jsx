import axios from 'axios'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

const SubscribeToNewsletter = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    })
    
    const [isValid, setIsValid] = useState({
        name: false,
        email: false
    })
    
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }
    
    const validateName = (name) => {
        return name.trim().length >= 2
    }
    
    const changeHandler = (e) => {
        const { name, value } = e.target
        
        setFormData({
            ...formData,
            [name]: value
        })
        
        if (name === 'email') {
            setIsValid({
                ...isValid,
                email: validateEmail(value)
            })
        } else if (name === 'name') {
            setIsValid({
                ...isValid,
                name: validateName(value)
            })
        }
    }
    
    const submitMail = async () => {
        if (!isValid.email || !isValid.name) return
        
        try {
            const response = await axios.post('https://travelmate-backend-zuqb.onrender.com/travelmate/subscribetonewsletter', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            
            if (response.data.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully subscribed to newsletter!",
                    showConfirmButton: false,
                    timer: 1500
                })
                setFormData({ name: '', email: '' })
                setIsValid({ name: false, email: false })
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Subscription failed",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Something went wrong",
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    
    return (
        <div className=' w-full'>
            <h5 className='text-light opacity-75 '>Subscribe to our newsletter</h5>
            <p className='text-light opacity-75'>Monthly digest of what's new and exciting from us.</p>
            <div className="d-flex flex-column w-100 gap-2">
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                    <label htmlFor="newsletter-name" className="visually-hidden">Your name</label>
                    <input 
                        id="newsletter-name"
                        name="name"
                        value={formData.name} 
                        onChange={changeHandler}
                        type="text" 
                        className="form-control"
                        placeholder="Your name"
                        style={{ border: '0' }}
                    />
                </div>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                    <label htmlFor="newsletter-email" className="visually-hidden">Email address</label>
                    <input 
                        id="newsletter-email"
                        name="email"
                        value={formData.email} 
                        onChange={changeHandler}
                        type="email" 
                        className="form-control"
                        placeholder="Email address"
                        style={{ border: '0' }}
                    />
                    <button 
                        onClick={submitMail}
                        className="btn btn-danger"
                        type="button"
                        disabled={!isValid.email || !isValid.name}
                    >
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SubscribeToNewsletter
