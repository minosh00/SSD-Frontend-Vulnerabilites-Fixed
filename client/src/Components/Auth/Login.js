import React, { Fragment, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoginCustomer } from "../../Services/AuthServices";
import Swal from 'sweetalert2';
import Logins from '../../images/register.png';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;


  const vaild=()=>{
	let  error={};

	if(!email)
	{
		error.email="email is require";
	}
	if(!password){
		error.password="password is required";
	}
	   return error;
  }

  const[error,setError]=useState({});






  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });


  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("data", formData.email);
	//console.log("data", formData.password);
    let data = await LoginCustomer(formData);
    console.log("data", data);
    if (data?.data?.userRole) {
      localStorage.setItem("token", data?.data?.token);
      localStorage.setItem("userRole", data?.data?.userRole);
      localStorage.setItem("email", formData.email);
      localStorage.setItem("user", data?.data?.user);
	  Swal.fire({
        icon: "success",
        title: "Congrats ",
        text: "Login Successfully!",
      });
      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login Failed!",
      });
    }
  };


	return (
		<div className="container" >
		<br></br><br></br><br></br>
		<div className="square border border-primary border-4 " >  <br></br>  <br></br>
		<form className="form" onSubmit={(e) => onSubmit(e)} >
			<h3 style={{alignContent: 'center',marginLeft:'45%'}}>Please sign in</h3><br></br>
			<img  src={Logins} alt="" width="35%" height="20%" style={{marginLeft:'40%'}}/>
		
			<label htmlFor="username" style={{width:'70%' ,marginLeft:'15%'}} className="h6">User Name: </label>
			<input
			 style={{width:'70%' ,marginLeft:'15%'}}
			 type="email"
			 placeholder="Email Address"
			 name="email"
			 value={email}
			 onChange={(e) => onChange(e)}
			className="form-control" 
		
			/>
				   <br></br><br></br>
		
		<label htmlFor="password" style={{width:'70%' ,marginLeft:'15%'}} className="h6">Password: </label>    
		<input 
		
			 style={{width:'70%' ,marginLeft:'15%'}}
			 type="password"
			 placeholder="Password"
			 name="password"
			 minLength="6"
			 value={password}
			 onChange={(e) => onChange(e)}
				   className="form-control" 
				/>
				   <br></br><br></br>
		
			<button className="btn btn-lg btn-primary btn-block" 
					type="submit" value="Login"  style={{width:'50%' ,marginLeft:'25%'}}>Log in </button><br></br>
		</form>
		<br></br>
		    <p className="link"  style={{width:'50%' ,marginLeft:'40%'}} >
						Don't have an account? <Link to="/register">Sign Up</Link>
					</p>
		<br></br>  <br></br>
		</div>
		
		</div>
	);
};


export default Login;