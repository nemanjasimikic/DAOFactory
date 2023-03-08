import styles from '../styles.module.sass'
import footerLogo from '../../../static/svg/footerLogo.svg'
import { Link } from 'react-router-dom'
import Button from '../../common/Button'
import Socials from '../Socials'

const MobileFooter = () => {
  return (
    <div className={styles.container}>
      <footer className={styles.mobileFooter}>
        <div className={styles.topFooter}>
          <div className={styles.logoButtonsWrapper}>
            <img
              className={styles.footerLogo}
              src={footerLogo}
              alt={'footer-logo'}
            />
            <div className={styles.buttonWrapper}>
              <Link>
                <Button
                  style={'primaryBtn'}
                  text={'Install Crystal Wallet'}
                  width={'184px'}
                  marginLeft={'12px'}
                />
              </Link>
              <Link>
                <Button
                  style={'secondaryBtn'}
                  text={'Source code on Github'}
                  width={'184px'}
                  marginLeft={'12px'}
                />
              </Link>
            </div>
          </div>
          <div className={styles.topFooterLinksWrapper}>
            <div className={styles.topFooterLinks}>
              <p className={styles.heading}>Product</p>
              <Link to={'/swap'} className={styles.footerLink}>
                Swap
              </Link>
              <Link to={'/pools'} className={styles.footerLink}>
                Pools
              </Link>
              <Link to={'/tokens'} className={styles.footerLink}>
                Tokens
              </Link>
              <Link to={'/pairs'} className={styles.footerLink}>
                Pairs
              </Link>
              <Link to={'/farming'} className={styles.footerLink}>
                Farming
              </Link>
              <Link to={'/builder'} className={styles.footerLink}>
                Builder
              </Link>
            </div>
            <div className={styles.topFooterLinks}>
              <p className={styles.heading}>DeFi Products</p>
              <Link to={'/ton-bridge'} className={styles.footerLink}>
                TON Bridge
              </Link>
              <Link to={'/ton-token'} className={styles.footerLink}>
                TON Token
              </Link>
              <Link to={'/ton-explore'} className={styles.footerLink}>
                TON Explorer
              </Link>
              <Link to={'/wton'} className={styles.footerLink}>
                WTON
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.bottomFooter}>
          <p className={styles.copy}>&copy; Broxus, 2023</p>
          <div className={styles.links}>
            <Link to="/terms-of-use" className={styles.footerLink}>
              Terms of use
            </Link>
            <Link to="/privacy-policy" className={styles.footerLink}>
              Privacy policy
            </Link>
            <Link to="/cookies" className={styles.footerLink}>
              Cookies
            </Link>
          </div>
          <Socials />
        </div>
      </footer>
    </div>
  )
}

export default MobileFooter
