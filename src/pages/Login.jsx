import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';


const Login = () => {
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        loadCaptchaEnginge(4);
    }, [])

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = captchaRef.current.value;
        if(validateCaptcha(user_captcha_value)){
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
        console.log(value);
    }

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
    }
  return (
    <div>
      <Helmet>
        <title>Conformz | Login</title>
      </Helmet>
      <div className="w-11/12 mx-auto">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col">
            <div className="text-center">
              <h1 className="text-5xl font-bold">Please Login!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleLogin} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                  <LoadCanvasTemplate />
                  </label>
                  <input
                    type="text"
                    ref={captchaRef}
                    name="captcha"
                    placeholder="captcha"
                    className="input input-bordered"
                    required
                  />
                  <button 
                  onClick={handleValidateCaptcha}
                  className="btn btn-active btn-neutral btn-xs mt-3">Validate</button>
                  <label className="label">
                    <Link
                      to="/register"
                      className="label-text-alt link link-hover"
                    >
                      Create an Account
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    disabled={disabled}
                    value="Login"
                    className="btn btn-primary text-white"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
