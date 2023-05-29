import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HeaderForm from "~/layouts/components/HeaderForm";
import Modal from "~/layouts/components/Modal";
import ModalFail from "~/layouts/components/ModalFail";
import "./Confirm.module.scss";
import axios from "axios";

function Confirm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [success, setSuccess] = useState(true);
  const [fail, setFail] = useState("");
  const [msg, setMsg] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let token = searchParams.get("token");
    axios
      .get("/api/v1/auths/registration/confirm?token=" + token)
      .then((res) => {
        setSuccess(true);
        setMsg((msg) => res.data.status);
      })
      .catch((e) => {
        console.log(e);
        setMsg((msg) => {
          if (!msg) {
            return e.response.data.message;
          }
          return msg;
        });
        if (e.response.data.message === "Token expired") {
          setFail("expired");
        }
      });
  }, []);

  return (
    <>
      {success ? (
        <Modal message="Confirm Success" subMessage={msg} path="/login" />
      ) : (
        <ModalFail
          message="Confirm Fail"
          subMessage={msg}
          path="/"
          isResend={fail === "expired"}
        />
      )}
      <HeaderForm />
    </>
  );
}

export default Confirm;
