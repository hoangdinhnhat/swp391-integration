import Header from '~/layouts/components/Header'
import about from '~/assets/images/about.jpg'
import classNames from "classnames/bind";
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from '~/layouts/components/Footer/';
import styles from "./About.module.scss";
const cx = classNames.bind(styles);
function About() {
    return (
        <>
            <Header />
            <div className={cx('about-wrapper')}>
                <div className={cx('about-container')}>
                    <div className={cx('about-descriptions', 'col-lg-6')}>
                        <div className={cx('about-description')}>
                            <p>Welcome to our trade site for birds!</p>
                            <p>We are a group of ardent bird lovers who specialize in matching bird enthusiasts with the ideal feathery companions.
                            We are a bird store that specializes in all your pet bird needs!  <br/>
                            Our marketplace offers a wide range of birds for sale, including common species as well as uncommon and exotic varieties, 
                            specialty feeds, and accessories. We ship Vietnam-wide!</p>
                        </div>
                        <div className={cx('about-info')}>
                            <div className={cx('about-details')}>
                                <h3>10K</h3>
                                <h5>Listed Products</h5>
                                <p>Dynamically morph team driven partnerships after vertical.</p>
                            </div>
                            <div className={cx('about-details')}>
                                <h3>8K</h3>
                                <h5>Lovely Customer</h5>
                                <p>Competently productive virtual models without performance.</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('about-image', 'col-lg-5')}>
                        <img src={about} alt='About-us' />
                    </div>
                </div>
            </div>
            <Footer/>
        </>

    );
}
export default (About); 