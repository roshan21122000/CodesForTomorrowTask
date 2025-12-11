
import React, { useEffect, useState } from "react";
import "./SignupLogin.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface User {
  name: string;
  email: string;
  password: string;
  country: string;
  mobile: string;
}

interface SignupForm {
  name: string;
  email: string;
  country: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

interface LoginForm {
  loginEmail: string;
  loginPassword: string;
}

const SignupLogin: React.FC = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(true);
  const [countries, setCountries] = useState<any[]>([]);
  const [dialCode, setDialCode] = useState("+91");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset: resetSignup,
  } = useForm<SignupForm>({
    mode: "onChange"
  });

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },

  } = useForm<LoginForm>();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2,idd")
      .then((res) => res.json())
      .then((data) => {
        const list = data
          .map((c: any) => ({
            name: c.name?.common ?? c.name?.official ?? "",
            code: c.cca2 || "",
            dialCode:
              c.idd?.root && c.idd?.suffixes
                ? `${c.idd.root}${c.idd.suffixes[0]}`
                : "",
          }))
          .sort((a: any, b: any) => a.name.localeCompare(b.name)); // Sort alphabetically

        setCountries(list);
      });
  }, []);

  const selectedCountry = watch("country");
  useEffect(() => {
    if (!selectedCountry) return;
    const c = countries.find((x) => x.name === selectedCountry);
    if (c) setDialCode(c.dialCode);
  }, [selectedCountry, countries]);

  const onSignUp = (data: SignupForm) => {
    const { name, email, mobile, password, country } = data;

    const newUser: User = {
      name,
      email,
      password,
      mobile: dialCode + mobile,
      country,
    };

    let users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u) => u.email === email)) {
      alert("Email already exists");
      return;
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    resetSignup();
    setIsSignUp(false);
  };

  const onLogin = (data: LoginForm) => {
    const { loginEmail, loginPassword } = data;

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const found = users.find(
      (u) => u.email === loginEmail && u.password === loginPassword
    );

    if (found) {
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="signup-login-page">
      <div className="wrapper">
        <div className="topbutton">
          <button className={isSignUp ? "active" : ""} onClick={() => setIsSignUp(true)}>
            SignUp
          </button>
          <button className={!isSignUp ? "active" : ""} onClick={() => setIsSignUp(false)}>
            SignIn
          </button>
        </div>


        {isSignUp && (
          <form onSubmit={handleSubmit(onSignUp)}>
            <h5>Signup</h5>

            <div className="input-box">


              <input
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: "Name required",
                  pattern: { value: /^[A-Za-z ]+$/, message: "Letters only" },
                })}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}


              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="country-and-mobile">
              <select
                {...register("country", { required: "Select country" })}
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name} ({c.dialCode})
                  </option>
                ))}
              </select>
              {errors.country && <p className="error">{errors.country.message}</p>}


              <div className="mobile-box">

                <input
                  type="text"
                  placeholder="Mobile Number"
                  {...register("mobile", {
                    required: "Mobile required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "10 digits required",
                    },
                  })}
                />
              </div>
              {errors.mobile && <p className="error">{errors.mobile.message}</p>}
            </div>

            <div className="input-box">

              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
              />
              {errors.password && <p className="error">{errors.password.message}</p>}


              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (val) =>
                    val === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}

              <div className="submit-button">
                <button type="submit" disabled={!isValid}>SignUp</button>
              </div>
            </div>
          </form>
        )}


        {!isSignUp && (
          <form onSubmit={handleLoginSubmit(onLogin)}>
            <h5>Login</h5>

            <div className="input-box">

              <input
                type="email"
                placeholder="Email"
                {...loginRegister("loginEmail", { required: "Email required" })}
              />
              {loginErrors.loginEmail && (
                <p className="error">{loginErrors.loginEmail.message}</p>
              )}

              <input
                type="password"
                placeholder="Password"
                {...loginRegister("loginPassword", { required: "Password required" })}
              />
              {loginErrors.loginPassword && (
                <p className="error">{loginErrors.loginPassword.message}</p>
              )}

              <div className="submit-button">
                <button type="submit">Login</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupLogin;
