import React from 'react'
import classNames from "classnames/bind";
import { ListGroup, Table } from 'react-bootstrap';

import styles from "./Cart.module.scss";
import Header from '~/layouts/components/Header/Header';
const cx = classNames.bind(styles);

function Cart() {
    return (
        <div>
            <Header />
            <div className={cx('cart-container')}>
                <div className={cx('cart-header')}>
                    <div className={cx('item-1')}>Item 1</div>
                    <div>Item 2</div>
                    <div>Item 3</div>
                    <div>Item 4</div>
                    <div>Item 5</div>
                </div>
            </div>
        </div>
    )
}

export default Cart