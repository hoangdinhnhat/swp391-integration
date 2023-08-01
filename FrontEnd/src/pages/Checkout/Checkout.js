import classNames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MyAddress from "./MyAddress";
import PaymentMethod from "./PaymentMethod";
import CheckoutPopup from "./CheckoutPopup";
import { UserContext } from "~/userContext/Context";
import AddressPopup from "~/layouts/components/AddressPopup/AddressPopup";
import ChatPupup from "~/layouts/components/ChatPopup";

import Footer from "~/layouts/components/Footer";
import styles from "./Checkout.module.scss";
import axios from "axios";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const cx = classNames.bind(styles);

const payments = [
  {
    id: 1,
    image:
      "https://lzd-img-global.slatic.net/g/tps/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png_2200x2200q80.png_.webp",
    title: "Cash On Delivery",
    subTitle: "Pay when you receive",
  },
  {
    id: 2,
    image:
      "https://lzd-img-global.slatic.net/g/tps/tfs/TB17BAYE7L0gK0jSZFAXXcA9pXa-80-80.png_2200x2200q80.png_.webp",
    title: "ZaloPay Wallet",
    subTitle: "Link your ZaloPay E-Wallet",
  },
];

var stompClient = null;

function Checkout() {
  const { state } = useLocation();
  const [show, setShow] = useState(false);
  const [showCheckOutPopup, setShowCheckOutPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [paymentId, setPaymentId] = useState(1);
  const [openAddress, setOpenAddress] = useState(true);
  const [infoReceive, setInfoReceive] = useState(false);
  const [open, setOpen] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")
  const [defaultReceiveInfo, setDefaultReceiveInfo] = useState({
    id: 0,
    fullname: "",
    phone: "",
    province: {
      id: 0,
      name: "",
    },
    district: {
      id: 0,
      name: "",
    },
    ward: {
      id: 0,
      name: "",
    },
    specific_address: "",
  });
  const [changed, setChanged] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const UC = useContext(UserContext);
  const context = UC.state;

  useEffect(() => {
    document.title = "Checkout";
  }, []);

  useEffect(() => {
    if (context && context.defaultReceiveInfo) {
      setDefaultReceiveInfo(context.defaultReceiveInfo);
    }
  }, [context]);

  console.log(state);

  useEffect(() => {
    if (state) {
      setCartItem(state.item);
    }
  }, [state]);

  async function vndToUsd(amount) {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/VND"
    );
    const data = await response.json();
    const rate = data.rates.USD;
    return amount * rate;
  }

  useEffect(() => {
    if (
      context &&
      context.defaultReceiveInfo &&
      context.defaultReceiveInfo.district.name &&
      state.item &&
      cartItem.length > 0
    ) {
      let receiveInfo = context.defaultReceiveInfo;
      cartItem.forEach((ci, index) => {
        let calObj = {
          from_province_id: ci.shop.address.province.id,
          from_district_id: ci.shop.address.district.id,
          from_ward_code: ci.shop.address.ward.id,
          service_id: 53320,
          service_type_id: 2,
          to_province_id: receiveInfo.province.id,
          to_district_id: receiveInfo.district.id,
          to_ward_code: receiveInfo.ward.id,
          height: 50,
          length: 20,
          weight: 200,
          width: 20,
          insurance_value: 10000,
          cod_failed_amount: 2000,
          coupon: null,
        };

        axios
          .post(
            "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
            calObj,
            {
              headers: {
                "Content-Type": "application/json",
                Token: "fc0ea700-c65d-11ed-ab31-3eeb4194879e",
              },
            }
          )
          .then(async (res) => {
            let usd = await vndToUsd(res.data.data.total);
            ci.shippingFee = Math.round((usd + Number.EPSILON) * 100) / 100;
            setChanged((prev) => !prev);
          })
          .catch((e) => console.log(e));
      });
    }
  }, [state.item, context]);

  useEffect(() => {
    if (cartItem.length > 0) {
      setCartItem(Array.from(cartItem));
    }
  }, [changed]);

  const saleCondition = (item) => {
    console.log(item);
    if (item) {
      return item.salePercent && item.saleQuantity > item.saleSold;
    }
  };

  const roundedFloat = (float) => {
    return Math.round((float + Number.EPSILON) * 100) / 100;
  };

  const totalPrice = (items, shippingFee) => {
    let total = 0;
    items.forEach((item, index) => {
      total += saleCondition(item)
        ? item.product.price * (1 - item.salePercent / 100) * item.quantity
        : item.product.price * item.quantity;
    });
    return roundedFloat(total + shippingFee);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    setOpen(true);
    let receiveInfo = defaultReceiveInfo.id;
    let request = cartItem.map((ci, index) => ({
      payment: payments.filter((p) => p.id === paymentId)[0].title,
      receiveInfo,
      shippingFee: ci.shippingFee,
      shopId: ci.shop.id,
      checkOutItems: ci.cartProducts.map((cp, i) => ({
        ...cp,
        product: undefined,
        productId: cp.product.id,
      })),
    }));
    if (paymentId === 2) {
      axios
        .post(
          "/api/v1/users/payment/open?total=" +
            (calShippingFeeTotal() + state.total),
          request
        )
        .then((res) => {
          window.open(res.data, "_self");
        })
        .catch((e) => {
          if (e.response)
          {
            console.log(e.response.data.message)
            setShowErrorPopup(true)
            setErrorMsg(e.response.data.message)
          }
          console.log(e)
        });
    } else {
      axios
        .post("/api/v1/users/order/create", request)
        .then((res) => {
          setOpen(false);
          setShowCheckOutPopup(true);
        })
        .catch((e) => {
          if (e.response)
          {
            setOpen(false);
            console.log(e.response.data.message)
            setShowErrorPopup(true)
            setErrorMsg(e.response.data.message)
          }
          console.log(e)
        });
    }
  };

  const calShippingFee = (cartItem) => {};

  const calShippingFeeTotal = () => {
    return cartItem.reduce((total, item) => {
      return total + item.shippingFee;
    }, 0);
  };

  const handleNewConversation = (event, shopId) => {
    event.preventDefault();
    axios
      .get("/api/v1/users/info")
      .then((res) => {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect(
          {},
          () => onConnected(shopId, res.data.id),
          (e) => console.log(e)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onConnected = (shopId, userId) => {
    const request = {
      fromId: userId,
      toId: shopId,
      content: "Let's Start",
      sendTime: new Date(),
      chatterType: "USER",
    };
    stompClient.send("/app/conversation-request", {}, JSON.stringify(request));
    setOpenChat(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {openAddress && defaultReceiveInfo.province.name === "" && (
        <AddressPopup
          closeModel={setOpenAddress}
          receiveInfoChange={setInfoReceive}
        />
      )}
      {showCheckOutPopup && <CheckoutPopup type="success" />}
      {showErrorPopup && <CheckoutPopup type="error" msg={errorMsg}/>}
      {show && (
        <MyAddress close={setShow} setReceiveInfo={setDefaultReceiveInfo} />
      )}
      <div className={cx("checkout_wrapper")}>
        {/*------------------HEADER-------------------*/}
        <div className={cx("checkout_header")}>
          <div className={cx("header_container")}>
            <ChatPupup openChat={openChat} setOpenChat={setOpenChat} />
            <Link to="/" className={cx("logo-link")}>
              <p className={cx("text")}>
                <span className={cx("sub-text")}>B</span>ird
                <span className={cx("inner-subText")}>
                  <span className={cx("sub-text")}>T</span>rading
                </span>
              </p>
              <div className={cx("checkout-text")}>Checkout</div>
            </Link>
          </div>
        </div>
        <div className={cx("checkout_container")}>
          <div className={cx("checkout_inner")}>
            {/*------------------DELIVERY ADDRESS-------------------*/}
            <div className={cx("style_address")}></div>
            <div className={cx("checkout_address")}>
              <div className={cx("delivery_address")}>
                <i
                  className={cx(
                    "fa-sharp fa-solid fa-location-dot",
                    "location-icon"
                  )}
                ></i>
                <div className={cx("delivery-text")}>Delivery Address</div>
              </div>
              <div className={cx("address_detail")}>
                <div className={cx("address-info")}>
                  <span className={cx("name")}>
                    {defaultReceiveInfo.fullname}
                  </span>
                  <span className={cx("phone")}>
                    {defaultReceiveInfo.phone}
                  </span>
                  {defaultReceiveInfo.specific_address !== "" && (
                    <span className={cx("address")}>
                      {`${defaultReceiveInfo.specific_address}, ${defaultReceiveInfo.ward.name}, ${defaultReceiveInfo.district.name}, ${defaultReceiveInfo.province.name}`}
                    </span>
                  )}

                  {defaultReceiveInfo.specific_address !== "" &&
                    defaultReceiveInfo._default && (
                      <span className={cx("default")}>Default</span>
                    )}
                </div>
                <div className={cx("address-change")}>
                  <button
                    className={cx("change-btn")}
                    onClick={() => setShow(true)}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
            {/*------------------PRODUCT ORDER-------------------*/}
            <div className={cx("product_order")}>
              <div className={cx("order-title")}>Product Ordered</div>
              <div className={cx("order-types")}>
                <div className={"type"}>Unit Price</div>
                <div className={"type"}>Quantity</div>
                <div className={"type"}>Total Price</div>
              </div>
            </div>
            {/*------------------PRODUCT ORDER DETAIL-------------------*/}
            {cartItem.map((item, index) => (
              <div key={index} className={cx("product_order_detail")}>
                <div className={cx("shop")}>
                  <div className={cx("shop-name")}>{item.shop.name}</div>
                  <div className={cx("chat-now")}>
                    <button className={cx("chat-btn")}>
                      <i
                        className={cx("fa-solid fa-messages", "chat-icon")}
                      ></i>
                      <span
                        className={cx("btn-chat-text")}
                        onClick={(e) => handleNewConversation(e, item.shop.id)}
                      >
                        Chat now
                      </span>
                    </button>
                  </div>
                </div>
                {item.cartProducts.map((c, i) => (
                  <div className={cx("product-order")}>
                    <div className={cx("product")}>
                      <div className={cx("product-info")}>
                        <img
                          src={c.product.images[0].url}
                          alt="product-img"
                          className={cx("product-img")}
                        />
                        <div className={cx("product-name")}>
                          {c.product.name}
                        </div>
                      </div>
                      <div className={cx("product-type")}>
                        <div className={cx("product-unit-price")}>
                          $
                          {saleCondition(c)
                            ? roundedFloat(
                                c.product.price * (1 - c.salePercent / 100)
                              )
                            : c.product.price}
                        </div>
                        <div className={cx("product-amount")}>{c.quantity}</div>
                        <div className={cx("product-total-price")}>
                          $
                          {saleCondition(c)
                            ? roundedFloat(
                                c.product.price * (1 - c.salePercent / 100)
                              ) * c.quantity
                            : c.product.price * c.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className={cx("product-shipping")}>
                  <div className={cx("shipping-title")}>Shipping Option:</div>
                  <div className={cx("shipping-info")}>
                    <div className={cx("shipping-detail")}>
                      <div className={cx("name")}>GHN</div>
                    </div>
                  </div>

                  <div className={cx("shipping-price")}>
                    ${item.shippingFee}
                  </div>
                </div>
                <div className={cx("product-total")}>
                  <span className={cx("order-total")}>
                    Order Total (
                    <span>
                      {item.cartProducts && item.cartProducts.length} Item
                    </span>
                    ):
                  </span>
                  <span className={cx("price-total")}>
                    ${totalPrice(item.cartProducts, item.shippingFee)}
                  </span>
                </div>
              </div>
            ))}
            {/*------------------PAYMENT METHOD-------------------*/}
            <div className={cx("payment-method")}>
              <div className={cx("payment-method-header")}>
                <span className={cx("title")}>Payment Method</span>
              </div>
              <div className={cx("payment-method-container")}>
                <div className={cx("payment-method")}>
                  {payments.map((payment) => (
                    <PaymentMethod
                      payment={payment}
                      paymentId={paymentId}
                      setPaymentId={setPaymentId}
                      key={payment.id}
                    />
                  ))}
                </div>
                <div className={cx("payment-detail")}>
                  <div className={cx("payment-order")}>
                    <div className={cx("shipping-total", "content")}>
                      <div className={cx("text")}>Shipping Total:</div>
                      <div className={cx("price")}>
                        ${calShippingFeeTotal()}
                      </div>
                    </div>
                    <div className={cx("total-payment", "content")}>
                      <div className={cx("text")}>Total Payment:</div>
                      <div className={cx("price")}>
                        ${roundedFloat(calShippingFeeTotal() + state.total)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cx("payment-method-footer")}>
                <div className={cx("payment-submit")} onClick={handleOrder}>
                  <button className={cx("submit-btn")}>Place Order</button>
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={open}
                    onClick={handleClose}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Checkout;
