import { Layout as ANTDLayout, Flex } from 'antd';
import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <ANTDLayout.Footer className={styles.footer}>
            <Flex
                className={`container ${styles.footerContainer}`}
                justify='space-between'
                gap={20}
                wrap
            >
                <div className={styles.footerBrand}>
                    <h2>EventBook</h2>
                    <p>Your smart workspace booking solution.</p>
                </div>

                <div className={styles.footerContact}>
                    <p>Email: support@eventbook.com</p>
                    <p>Phone: +1 234 567 890</p>
                </div>
            </Flex>
            <div className={styles.footerBottom}>
                <p>&copy; 2025 EventBook. All rights reserved.</p>
            </div>
        </ANTDLayout.Footer>
    );
};
