import Home from "~/pages/Home";
import Login from "~/pages/Login";
import Signup from "~/pages/Signup";
import Forget from "~/pages/ForgetPassword";
import About from "~/pages/About";
import Contact from "~/pages/Contact";
import Account from "~/pages/Profile/Account";
import Password from "~/pages/Profile/Password";
import Address from "~/pages/Profile/Address";
import Confirm from "~/pages/Confirm";
import FlashSale from "~/pages/FlashSale";
import Product from "~/pages/Product";
import Shop from "~/pages/Shop";
import ProductSearch from "~/pages/ProductSearch";
import Cart from "~/pages/Cart";
import Category from "~/pages/Category";
import ProductAll from "~/pages/ProductAll";
import Checkout from "~/pages/Checkout";

import Notifications from "~/pages/Notifications";
import Purchase from "~/pages/Purchase";
import Cancelled from "~/pages/Purchase/Cancelled";
import Completed from "~/pages/Purchase/Completed";
import ContactPurchase from "~/pages/Purchase/Contact";
import Pending from "~/pages/Purchase/Pending";
import Shipping from "~/pages/Purchase/Shipping";
import Refund from "~/pages/Purchase/Refund";

import Seller from "~/pages/Seller";
import Register from "~/pages/Seller/Register";
import Dashboard from "~/pages/SellerPortal/Dashboard";
import Notify from "~/pages/SellerPortal/NotifyMng";

import OrderMng from "~/pages/SellerPortal/OrderMng";
import ContactOrder from "~/pages/SellerPortal/OrderMng/ContactOrder";
import PendingOrder from "~/pages/SellerPortal/OrderMng/Pending";
import ShippingOrder from "~/pages/SellerPortal/OrderMng/Shipping";
import CompleteOrder from "~/pages/SellerPortal/OrderMng/Completed";
import CancelOrder from "~/pages/SellerPortal/OrderMng/Cancelled";
import RefundOrder from "~/pages/SellerPortal/OrderMng/Refund";

import ProductMng from "~/pages/SellerPortal/ProductMng";
import Active from "~/pages/SellerPortal/ProductMng/Active";
import SoldOut from "~/pages/SellerPortal/ProductMng/SoldOut";
import PendingProduct from "~/pages/SellerPortal/ProductMng/Pending";
import Band from "~/pages/SellerPortal/ProductMng/Band";
import AddProduct from "~/pages/SellerPortal/ProductMng/AddProduct";
import Package from "~/pages/SellerPortal/ProductMng/Package";

import FeedbackMng from "~/pages/SellerPortal/FeedbackMng";
import FeedbackDetail from "~/pages/SellerPortal/FeedbackMng/FeedbackDetail";

import Message from "~/pages/SellerPortal/Message";

import ShopMng from "~/pages/SellerPortal/ShopMng";
import Chart from "~/pages/SellerPortal/Chart";

import DashboardAdmin from "~/pages/Admin/Dashboard";

import AllUserMng from "~/pages/Admin/AdminUserMng/AllUserMng/AllUserMng";
import AvailableUserMng from "~/pages/Admin/AdminUserMng/AvailableUserMng";
import BanUserMng from "~/pages/Admin/AdminUserMng/BanUserMng";

import AllProductMng from "~/pages/Admin/AdminProductMng/AllProductMng";
import AvailableProductMng from "~/pages/Admin/AdminProductMng/AvailableProductMng";
import BanProductMng from "~/pages/Admin/AdminProductMng/BanProductMng";

import AllShopMng from "~/pages/Admin/AdminShopMng/AllShopMng";
import AvailableShopMng from "~/pages/Admin/AdminShopMng/AvailableShopMng";
import BanShopMng from "~/pages/Admin/AdminShopMng/BanShopMng";

import ReportMng from "~/pages/Admin/ReportMng";
import Setting from "~/pages/Admin/Setting";
import AdNotifications from "~/pages/Admin/Notifications";

import Shipper from "~/pages/Shipper";

const publicRoutes = [
    {path: "/", component: Home},
    {path: "/login", component: Login},
    {path: "/signup", component: Signup},
    {path: "/reset", component: Forget},
    {path: "/about", component: About},
    {path: "/contact", component: Contact},
    {path: "/confirm", component: Confirm},
    {path: "/shop", component: Shop},
    {path: "/flash_sale", component: FlashSale},
    {path: "/product", component: Product},
    {path: "/search", component: ProductSearch},
    {path: "/category", component: Category},
    {path: "/products", component: ProductAll},
    {path: "/cart", component: Cart},
    {path: "/checkout", component: Checkout},

    {path: "/user/notification", component: Notifications},
    {path: "/user/account/profile", component: Account},
    {path: "/user/account/password", component: Password},
    {path: "/user/account/address", component: Address},

    {path: "/purchase/all", component: Purchase},
    {path: "/purchase/contact", component: ContactPurchase},
    {path: "/purchase/pending", component: Pending},
    {path: "/purchase/shipping", component: Shipping},
    {path: "/purchase/complete", component: Completed},
    {path: "/purchase/cancel", component: Cancelled},
    {path: "/purchase/refund", component: Refund},

    {path: "/seller", component: Seller},
    {path: "/seller/register", component: Register},
    {path: "/seller/portal/dashboard", component: Dashboard},
    {path: "/seller/portal/notifications", component: Notify},

    {path: "/seller/portal/order/all", component: OrderMng},
    {path: "/seller/portal/order/contact", component: ContactOrder},
    {path: "/seller/portal/order/pending", component: PendingOrder},
    {path: "/seller/portal/order/shipping", component: ShippingOrder},
    {path: "/seller/portal/order/complete", component: CompleteOrder},
    {path: "/seller/portal/order/cancel", component: CancelOrder},
    {path: "/seller/portal/order/refund", component: RefundOrder},

    {path: "/seller/portal/product/all", component: ProductMng},
    {path: "/seller/portal/product/active", component: Active},
    {path: "/seller/portal/product/soldout", component: SoldOut},
    {path: "/seller/portal/product/pending", component: PendingProduct},
    {path: "/seller/portal/product/ban", component: Band},
    {path: "/seller/portal/product/new", component: AddProduct},
    {path: "/seller/portal/product/package", component: Package},

    {path: "/seller/portal/feedback", component: FeedbackMng},
    {path: "/seller/portal/feedback/detail", component: FeedbackDetail},

    {path: "/seller/portal/message", component: Message},

    {path: "/seller/portal/shop", component: ShopMng},

    {path: "/seller/portal/chart", component: Chart},

    {path: "/admin/portal/dashboard", component: DashboardAdmin},

    {path: "/admin/portal/usermng/all", component: AllUserMng},
    {path: "/admin/portal/usermng/available", component: AvailableUserMng},
    {path: "/admin/portal/usermng/banned", component: BanUserMng},

    {path: "/admin/portal/shopmng/all", component: AllShopMng},
    {path: "/admin/portal/shopmng/available", component: AvailableShopMng},
    {path: "/admin/portal/shopmng/banned", component: BanShopMng},

    {path: "/admin/portal/productmng/all", component: AllProductMng},
    {path: "/admin/portal/productmng/banned", component: BanProductMng},
    {path: "/admin/portal/productmng/available", component: AvailableProductMng},

    {path: "/admin/portal/report", component: ReportMng},
    {path: "/admin/portal/settings", component: Setting},
    {path: "/admin/portal/notifications", component: AdNotifications},

    {path: "/shipping-unit", component: Shipper},
];

const privateRoutes = [];

export {publicRoutes, privateRoutes};
