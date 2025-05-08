import React, { useEffect } from 'react'
import logo from "../../assets/TravalMateLogo2.png"
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./SigninModal.css"
import google from "../../assets/google.png"
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { GoogleLogin, useGoogleLogin, useGoogleOneTapLogin, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';


const SigninModal = () => {

  const navigate = useNavigate()

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [hasAccount, setHasAccount] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [details, setDetails] = useState(
    {
      email: '',
      firstName: '',
      lastName: '',
      profilePicture: '',
    }
  );

  const [loading, setLoading] = useState(false);

  const signInWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        setLoading(true);

        // Fetch user data from Google API
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const userDetails = {
          email: res.data.email,
          firstName: res.data.given_name,
          lastName: res.data.family_name,
          profilePicture: res.data.picture,
        };

        // Logging to ensure the data is correct
        console.log("Google user data:", res.data);

        try {
          // Send user data to your backend
          const backendResponse = await axios.post(
            "http://localhost:3000/travelmate/signinwithgoogle",
            res.data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Backend response:", backendResponse.data);
          
          if (!backendResponse.data.registered) {
            // Navigate to details page if user is not registered
            navigate(`/details/${backendResponse.data.id}`);
            localStorage.setItem('doc_id', backendResponse.data.id);
            alert(backendResponse.data.id)

          } else {
            // Save the token and user details to localStorage
            alert(backendResponse.data.id)
            localStorage.setItem("auth-token", backendResponse.data.token);
            localStorage.setItem('doc_id', backendResponse.data.id);
            localStorage.setItem("user", JSON.stringify(userDetails)); // Save user details

            console.log("Auth Token:", backendResponse.data.token);
            console.log("User Details Saved:", userDetails);

            setShow(false);
            navigate("/");

            // Reload the page to reflect the updated navbar
            window.location.reload();
          }
        } catch (backendError) {
          console.error("Error during backend request:", backendError);
        }
      } catch (error) {
        console.error("Error during Google sign-in:", error);
      }
    },
  });

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      const decoded = jwtDecode(credentialResponse.credential);
      setUser(decoded); // Set the user data
      console.log(decoded);
      window.location.reload();
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  const signInWithEmailAndPassword = async () => {

    console.log(email, password);
    console.log("Sign in function called");

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/travelmate/signinwithemailandpassword', { email, password });
      console.log(response.data);

      

      if (response.data.success) {
        localStorage.setItem('auth-token', response.data.token);
        const user = await axios.get('http://localhost:3000/user/get-user', {
          headers: {
            'Authorization': `Bearer ${response.data.token}`
          }


        })
        console.log("user.data.user=============================================================");
        console.log(user.data.user);
        localStorage.setItem('user', JSON.stringify(user.data.user));
        
        navigate('/');
        window.location.reload();
      }
      else {
        setLoading(false);
        console.log(response.data.error);
        alert(response.data.error);
      }

    } catch (error) {
      console.log(error);
    }
    setShow(false);
    setLoading(false);
  }

  const signUpWithEmailAndPassword = async () => {

    setLoading(true);
    console.log(email, password);
    try {
      const response = await axios.post('http://localhost:3000/travelmate/signupwithemailandpassword', { email, password });

      if (response.data.success) {
        console.log(response.data.id);
        navigate(`/details/${response.data.id}`);
      }
      else {
        setLoading(false);
        console.log(response.data.error);
        alert(response.data.error)
      }

    } catch (error) {
      console.log(error);
    }
    setShow(false);
    setLoading(false);
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        {localStorage.getItem('auth-token') ? (

          <Button
            variant="outline-light"
            className="signin-btn"
            onClick={() => {
              localStorage.removeItem('auth-token');
              localStorage.removeItem('user');
              localStorage.removeItem('doc_id');
              navigate("/");

              window.location.reload(); // Refresh the page after logout
            }}
            style={{
              marginLeft: "20px",
              padding: "5px 15px",
              fontWeight: "600",
              border: "2px solid #3b82f6",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            Log out
          </Button>

        ) : (
          // <a className="nav-signin" onClick={handleShow}>
          //   SignUp
          // </a>
          <Button
            variant="outline-light"
            className="signin-btn"
            onClick={handleShow}
            style={{
              marginLeft: "20px",
              padding: "5px 15px",
              fontWeight: "600",
              border: "2px solid #3b82f6",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            Sign Up
          </Button>

        )}
      </div>


      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body className="text-start" style={{ padding: '20px' }}>
          <div className="d-flex justify-content-left align-items-left">
            <img
              src={logo}
              alt="Icon"
              style={{ height: "98px", paddingBottom: "33px" }}
            />
          </div>
          <h2 className='fw-bold' style={{ paddingBottom: "25px" }}>Hello, adventurer!</h2>


          <Form  >
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                style={{ borderRadius: '10px', marginBottom: "25px", width: "463px", height: "50px", borderWidth: "2px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                style={{ borderRadius: '10px', marginBottom: "25px", width: "463px", height: "50px", borderWidth: "2px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
          <p>{hasAccount ? "Don't have an account ?" : "Already have an account ?"} <span onClick={() => setHasAccount(!hasAccount)} style={{ fontWeight: "bold", color: "rgba(16, 77, 108,1)" }}>{hasAccount ? " SignUp" : " SignIn"}</span></p>


          <div className="d-flex justify-content-center">
            <Button
              variant="outline-dark"
              className="d-flex align-items-center justify-content-center" // Update justify-content-start to justify-content-center
              style={{ borderRadius: '50px', marginBottom: "7px", width: "250px", height: "50px", borderWidth: "2px" }}
              onClick={hasAccount ? signInWithEmailAndPassword : signUpWithEmailAndPassword}
              disabled={loading}
            >
              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ width: "100%" }}>  {/* Ensure it's centered */}
                  <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                  </div>
                </div>
              ) : (
                <span className="text-center flex-grow-1">{hasAccount ? "Sign in" : "Sign up"}</span>
              )}
            </Button>

          </div>

          <div className="d-flex align-items-center justify-content-center">
            <hr className="flex-grow-1" />
            <span className="mx-2">or</span>
            <hr className="flex-grow-1" />
          </div>

          <div className="d-flex justify-content-center">
            <Button
              variant="outline-dark"
              className="d-flex align-items-center justify-content-start"
              style={{ borderRadius: '50px', marginBottom: "25px", marginTop: "7px", width: "250px", height: "50px", borderWidth: "2px" }}
              onClick={signInWithGoogle}
              disabled={loading}
            >
              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ width: "100%" }}>  {/* Ensure it's centered */}
                  <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                  </div>
                </div>
              ) : (
                <>
                  <img src={google} style={{ width: "30px", marginLeft: "15px" }} />
                  <span className="text-center flex-grow-1">Continue with Google</span>
                </>
              )}

            </Button>

          </div>

          <p className="text-center" style={{ fontSize: '0.8em', color: "rgba(159, 184, 196, 1)", marginTop: "20px" }}>
            By proceeding, you agree to our <a href="#" style={{ color: "rgba(159, 184, 196, 1)" }}>Terms of Use</a> and confirm you have read our <a href="#" style={{ color: "rgba(159, 184, 196, 1)" }}>Privacy and Cookie Statement</a>.
          </p>
          <p className="text-center" style={{ fontSize: '0.8em', color: "rgba(159, 184, 196, 1)" }}>
            This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" style={{ color: "rgba(159, 184, 196, 1)" }}>Privacy Policy</a> and <a href="https://policies.google.com/terms" style={{ color: "rgba(159, 184, 196, 1)" }}>Terms of Service</a> apply.
          </p>

        </Modal.Body>
      </Modal>

    </>
  )
}

export default SigninModal