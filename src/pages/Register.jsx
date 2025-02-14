import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const Register = () => {
  const [disabled, setDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;

      console.log("result from createUser fn: ", loggedUser);


      // update profile segment 

      // updateUserProfile(data.name, data.photo)
      // .then(()=>{
      //   const newUser ={
      //     name: data.name, 
      //     photoURL: data.photo,
      //   }
      // })


      updateUserProfile(data.name, data.photo)
        .then(() => {
          console.log(loggedUser);
          const newUser = { name: loggedUser.displayName ? loggedUser.displayName : "", email: loggedUser.email, photoURL: loggedUser.photoURL, blockStatus: "unblocked", role: "user", totalParticipation: 0, totalWinning: 0, }
          console.log("new User:", newUser);
          fetch('https://conformz-server.vercel.app/new-user-registration', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
          })
            .then(res => res.json())
            .then(data => {
              if (data.insertedId) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'User created successfully.',
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            })
          console.log("from : ", from);
          navigate(from);
        })
        .catch(error => {
          console.log(error);
          // setError(error.message)
        })
      // .then(() => {
      //   console.log("User Profile Updated!");
      //   reset();
      //   Swal.fire({
      //     title: "User Created!",
      //     text: "Your account has been created successfully!",
      //     icon: "success",
      //   });
      //   navigate(from, { replace: true });
      // })
      // .catch((error) => console.log(error));
    });
  };

  console.log(watch("example"));

  useEffect(() => {
    loadCaptchaEnginge(4);
  }, [])

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
    console.log(value);
  }

  // const handleRegister = e => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const name = form.name.value;
  //   const email = form.email.value;
  //   const password = form.password.value;
  //   const photo = form.photo.value;

  //   console.log(name, email, password, photo);
  // }
  return (
    <div>
      <Helmet>
        <title>Conformz | Register</title>
      </Helmet>
      <div className="w-11/12 mx-auto font-mulish">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col">
            <div className="text-center">
              <h1 className="text-5xl font-bold">Create an Account</h1>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    name="name"
                    placeholder="Name"
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-red-600">Name is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-600">Email is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    {...register("password", { required: true, minLength: 6 })}
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                  />
                  {errors.password && (
                    <span className="text-red-600">Password is required</span>
                  )}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Photo URL</span>
                    </label>
                    <input
                      type="text"
                      {...register("photo", { required: true })}
                      name="photo"
                      placeholder="Photo URL"
                      className="input input-bordered"
                    />
                    {errors.photo && (
                      <span className="text-red-600">Photo is required</span>
                    )}
                  </div>
                  <label className="label">
                    <LoadCanvasTemplate />
                  </label>
                  <input
                    type="text"
                    // ref={captchaRef}
                    onBlur={handleValidateCaptcha}
                    name="captcha"
                    placeholder="captcha"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <Link
                      to="/login"
                      href="#"
                      className="label-text-alt link link-hover"
                    >
                      Already have an account? Login
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary text-white">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
