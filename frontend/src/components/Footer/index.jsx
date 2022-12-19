import { Link } from 'react-router-dom'
import Socials from 'components/Footer/Socials'
import Button from 'components/common/Button'
import Logo from 'components/Header/Logo'
import styles from './styles.module.sass'

const Footer = () => {
  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <div className={styles.topFooter}>
          <div className={styles.topFooterLinksWrapper}>
            <Logo />
            <div className={styles.topFooterLinks}>
              <p className={styles.heading}>Product</p>

              <a href={'#'} className={styles.footerLink}>
                Swap
              </a>
              <a href={'#'} className={styles.footerLink}>
                Pools
              </a>
              <a href={'#'} className={styles.footerLink}>
                Tokens
              </a>
              <a href={'#'} className={styles.footerLink}>
                Pairs
              </a>
              <a href={'#'} className={styles.footerLink}>
                Farming
              </a>
              <a href={'#'} className={styles.footerLink}>
                Builder
              </a>
            </div>
            <div className={styles.topFooterLinks}>
              <p className={styles.heading}>DeFi Products</p>
              <a href={'#'} className={styles.footerLink}>
                TON Bridge
              </a>
              <a href={'#'} className={styles.footerLink}>
                TON Token
              </a>
              <a href={'#'} className={styles.footerLink}>
                TON Explorer
              </a>
              <a href={'#'} className={styles.footerLink}>
                WTON
              </a>
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <Link>
              <Button style={'primaryBtn'} text={'Install Crystal Wallet'} />
            </Link>
            <Link>
              <Button style={'secondaryBtn'} text={'Source code on Github'} />
            </Link>
          </div>
        </div>
        <div className={styles.bottomFooter}>
          <div className={styles.links}>
            <p className={styles.copy}>&copy; Broxus, 2021</p>
            <a href={'#'} className={styles.footerLink}>
              Terms of use
            </a>
            <a href={'#'} className={styles.footerLink}>
              Privacy policy
            </a>
            <a href={'#'} className={styles.footerLink}>
              Cookies
            </a>
          </div>
          <Socials />
        </div>
      </footer>
    </div>
  )
}

export default Footer
