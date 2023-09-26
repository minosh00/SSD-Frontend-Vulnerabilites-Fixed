import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterStudent } from "../../Services/AuthServices";
import Swal from 'sweetalert2';
import { ValidateSignUp } from "./Validation";
import Main from "./Main.css"

import Login from '../../images/test.png';
const Register = () => {

	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		Fullname: "",
		email: "",
		password: "",
		password2: "",
		pNumber:""
	});

	const { Fullname, email, password, password2  , pNumber } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {

		e.preventDefault();

		let validate = ValidateSignUp(formData);
console.log(validate)
		if(validate.status == false)
		{
			alert(validate.message);
		}

		else{
				if (password !== password2) {
					alert("Password do not match...", "danger");
				} else {
					let data = await RegisterStudent(formData);
					console.log("data",data)
					if(data?.data?.userRole)
					{
					localStorage.setItem("token",data?.data?.token);
					localStorage.setItem("userRole",data?.data?.userRole);
					localStorage.setItem("user",data?.data?.user);
					Swal.fire({
						icon: 'success',
						title: 'Congrats!',
						text: 'Register successfull...!',
					})
					navigate("/dashboard");
					}
					else
					{
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Registration Failed..!',
						})
					}
				}
			}
	};


	return (
		<div className="container">
		<br></br> <br></br> <br></br>     
		<div className="square border border-primary border-4 " > 
		
		<form onSubmit={(e) => onSubmit(e)}>
		<h3 style={{alignContent: 'center',marginLeft:'40%'}}>Sign Up </h3><br></br>
		<div className="container" style-={{alignContent: 'center',}}>
		<img  src={Login} alt="" width="35%" height="20%" style={{marginLeft:'40%'}}/>
		</div>
		
		
		<br></br>
		<label htmlFor="username" style={{width:'70%' ,marginLeft:'15%'}} className="h6">Full name : </label>
		<input 	type="text"
				placeholder="Enter Your full name "
				name="Fullname"
				value={Fullname}
				onChange={(e) => onChange(e)} 
				style={{width:'70%' ,marginLeft:'15%'}}
				className="form-control" 
			/>
		<br></br>
		
		<label htmlFor="fname"style={{width:'70%' ,marginLeft:'15%'}} className="h6">Email address: </label>
		<input 
		type="email"
		placeholder="Email Address"
		name="email"
		value={email}
		onChange={(e) => onChange(e)}
		style={{width:'70%' ,marginLeft:'15%'}}
			
			  className="form-control" 
			/>
		<br></br>
		<label htmlFor="password" style={{width:'70%' ,marginLeft:'15%'}}  className="h6">Password: </label>
		<input 
		style={{width:'70%' ,marginLeft:'15%'}}
		type="password"
		
		name="password"
		minLength="6"
		value={password}
		onChange={(e) => onChange(e)}
			  className="form-control" 
			  placeholder="Enter Password"/>
			  <br></br>
		
		<label htmlFor="Phonenumber"style={{width:'70%' ,marginLeft:'15%'}}  className="h6">Confirm Password: </label>
		<input 
		type="password"
		placeholder="Confirm Password"
		name="password2"
		minLength="6"
		value={password2}
		onChange={(e) => onChange(e)} 
			  style={{width:'70%' ,marginLeft:'15%'}}
			  className="form-control" 
		/>
		
		<br></br>
		
		
		<label htmlFor="role" style={{width:'70%' ,marginLeft:'15%'}} className="h6">Mobile Number: </label>
		<input 
			  style={{width:'70%' ,marginLeft:'15%'}}
			   
			  type="number"
			  placeholder="Mobile number"
			  name="pNumber"
			  value={pNumber}
			  className="form-control"
			  onChange={(e) => onChange(e)}/>
			  <br></br>
		
			  <div class="mb-3 form-check">
		
		<input type="checkbox" style={{width:'1%' ,marginLeft:'15%'}}  class="form-check-input" id="exampleCheck1"/>
		<label class="form-check-label" for="exampleCheck1" style={{width:'70%' ,marginLeft:'18%'}} >"I Agree" Checkboxes for Privacy Policies and Terms and Conditions Agreements</label>
		</div>
		<button className="btn btn-lg btn-primary btn-block" style={{width:'50%' ,marginLeft:'25%'}}
				value="Register" type="submit">Register</button>     <br></br> <br></br> <br></br>
		</form>
		<p className="link"  style={{width:'50%' ,marginLeft:'40%'}} >
						Already have an account? <Link to="/login">Sign In</Link>
						<br></br>
					</p>
		</div>
		</div>
	);
};

export default Register;