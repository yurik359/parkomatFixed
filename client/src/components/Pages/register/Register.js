import { useState } from "react";
import "./register.css";
import { useNavigate, Link } from "react-router-dom";
import { useHandlePOST } from "../../../services/requests";
import { setAccessToken } from "../main/mainSlice";
import { useDispatch } from "react-redux";
import { registerAPI } from "../../../services/requests";
import parkomatPic from "../../../services/img/Frame2.png";
const Register = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const handlePOST = useHandlePOST();
  const [valid, setValid] = useState(null);
  const [response,setResponse] = useState(null)
  

  const formValidate = (e) => {
    if (e.target[0].value.trim().length < 2) {
      setValid("Імя повинно містити мінімум 2 символи");
      return false;
    }
    if (e.target[2].value !== e.target[3].value) {
      setValid("Паролі не співпадають");
      return false;
    }
    if (e.target[2].value.length < 7) {
      setValid("Пароль повинен містити мінімум 7 символів");
      return false;
    }
    setValid(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValidate(e)) {
      const res = await handlePOST(registerAPI, {
        organizationName: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
      });
      if(res&&res.status&&res.status=="401"){
        return setResponse(res.message)
      }
      setResponse(null)
      dispatch(setAccessToken(res.token))
      localStorage.setItem("accessToken", res.token);
      navigate("/dashboard");
    }
  };
  return (
    <>
      <div className="register-page">
        <form onSubmit={handleSubmit} className="form-register">
          <div className="form-name">Sign up</div>
          <input required type="text" placeholder="Organization Name" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
          <input required type="password" placeholder="Confirm password" />
          {valid && <span className="validation">{valid}</span>}
          <div className="policy">
            {" "}
            By signing up you are agree to our <span>Terms and Services</span>
          </div>
          {response&&<span>{response}</span>}
          <button>
            Sign Up <div class="right-arrow"></div>
          </button>
          <div className="form__have-account">
            Are you already have account?{" "}
            <Link to="/login">
              <span>Log in</span>
            </Link>
          </div>
        </form>
        <div className='parkomatReg-pic'></div>
        {/* <img src={parkomatPic} alt="" /> */}
        <div className="register-blur"></div>
      </div>
    </>
  );
};

export default Register;
