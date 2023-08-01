import classNames from "classnames/bind";

import ChatWindow from "./ChatWindow";

import styles from "./ChatPopup.module.scss";

const cx = classNames.bind(styles);

function ChatPupup({openChat, setOpenChat}) {

    return (
        <>
            {openChat && <ChatWindow closeChat={setOpenChat}/>}
            <div className={cx("chat_popup")}>
                <button
                    className={cx("chat-btn")}
                    onClick={() => setOpenChat(true)}
                >
                    <i className={cx("fa-solid fa-messages", "chat-icon")}></i>
                    Chat
                </button>
            </div>
        </>
    );
}

export default ChatPupup;
