import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "~/layouts/components/Footer";
import Forget from "~/pages/ForgetPassword/Forget";
import HeaderForm from "~/layouts/components/HeaderForm";
import Verify from "~/pages/ForgetPassword/Verify";
import NewPassword from "~/pages/ForgetPassword/NewPassword";
import axios from "axios";

function ForgetPassword() {
  const steps = [Forget, Verify, NewPassword];
  const [step, setStep] = useState(0);
  const [arg, setArg] = useState();
  const [user, setUser] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let CurStep = steps[step];

  useEffect(() => {
    if (arg) {
      switch (step) {
        case 0:
          axios
            .get("/api/v1/auths/reset/find", { params: { email: arg.email } })
            .then((res) => {
              setUser(res.data);
              setArg(null);
              setStep((step) => step + 1);
              setErrMsg("");
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              setErrMsg(err.response.data.message);
            });
          break;
        case 1:
          axios
            .post("/api/v1/auths/reset/confirm", user, {
              params: { code: arg.code },
            })
            .then((res) => {
              setLoading(false);
              setStep((step) => step + 1);
            })
            .catch((e) => {
              setLoading(false);
              setErrMsg(e.response.data.message);
            });
          break;
        case 2:
          axios
            .post("/api/v1/auths/reset/new", user, {
              params: { password: arg.confirm },
            })
            .then((res) => {
              console.log(res);
              navigate("/login");
            })
            .catch((e) => {
              console.log(e);
            });
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arg]);

  useEffect(() => {
    if (user) {
      axios.post("/api/v1/auths/reset/send", user)
      .then((res) => {
        console.log(res);
      });
    }
  }, [user]);

  
  const handleSubmit = (e, args) => {
    e.preventDefault();
    setLoading(true);
    if (args) {
      setArg(args);
    }
  };

  return (
    <>
      <HeaderForm />
      <CurStep
        onClick={handleSubmit}
        errMsg={errMsg}
        loading={loading}
        user={user}
      />
      <Footer />
    </>
  );
}

export default ForgetPassword;
