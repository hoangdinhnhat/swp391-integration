import classNames from "classnames/bind";
import styles from "./NewPassword.module.scss";
import {useEffect, useState} from "react";
import Alert from "react-bootstrap/Alert";

const cx = classNames.bind(styles);

function NewPassword({onClick}) {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [msg, setMsg] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [passwordType, setPasswordType] = useState("password");
    const [passwordConfirmType, setPasswordConfirmType] = useState("password");

    useEffect(() => {
        if (password === "" && confirm === "") {
            setDisabled(true);
        } else if (password !== confirm) {
            setDisabled(true);
            setMsg("Passwords do not match");
        } else {
            setMsg("");
            setDisabled(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirm]);

    const togglePassword = (e) => {
        e.preventDefault();
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    };

    const togglePasswordConfirm = (e) => {
        e.preventDefault();
        if (passwordConfirmType === "password") {
            setPasswordConfirmType("text");
            return;
        }
        setPasswordConfirmType("password");
    };
    const handleSubmit = (e) => {
        onClick(e, {confirm});
    };

    return (
        <>
            <div className={cx("container")}>
                <div className={cx("content")}>
                    <form>
                        <div className={cx("head-text")}>
                            <p>New password</p>
                        </div>
                        <div className={cx("header-subText")}>
                            <p>Enter your new password below to reset your password.</p>
                        </div>
                        <div className={cx("info")}>
                            <div className={cx("text")}>
                                <input
                                    type={passwordType}
                                    className={cx("password")}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className={cx("input-group-btn")}>
                                    <button className={cx("eyes-btn")} onClick={togglePassword}>
                                        {passwordType === "password" ? (
                                            <i className="bi bi-eye-slash"></i>
                                        ) : (
                                            <i className="bi bi-eye"></i>
                                        )}
                                    </button>
                                </div>
                                <span></span>
                                <label>New password</label>{" "}
                            </div>

                            <div className={cx("text")}>
                                <input
                                    type={passwordConfirmType}
                                    className={cx("password")}
                                    required
                                    onChange={(e) => setConfirm(e.target.value)}
                                />
                                <div className={cx("input-group-btn")}>
                                    <button
                                        className={cx("eyes-btn")}
                                        onClick={togglePasswordConfirm}
                                    >
                                        {passwordConfirmType === "password" ? (
                                            <i className="bi bi-eye-slash"></i>
                                        ) : (
                                            <i className="bi bi-eye"></i>
                                        )}
                                    </button>
                                </div>
                                <span></span>
                                <label>Confirm password</label>
                            </div>
                            {msg && (
                                <div className={cx("error")}>
                                    <Alert key="danger" variant="danger">
                                        {msg}
                                    </Alert>
                                </div>
                            )}
                            <div className={cx("btn-submit")}>
                                <button disabled={disabled} onClick={handleSubmit}>
                                    RESET
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NewPassword;
