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
              <p className={styles.heading}>DAO Builder</p>

              <a href={'#'} className={styles.footerLink}>
                Create new DAO
              </a>
              <a href={'#'} className={styles.footerLink}>
                My DAOs
              </a>              
            </div>
            <div className={styles.topFooterLinks}>
              <p className={styles.heading}>DeFi Products</p>
              <a target="_blank" href={'https://octusbridge.io/'} className={styles.footerLink}>
                Octus Bridge
              </a>
              <a target="_blank" href={'https://flatqube.io/'} className={styles.footerLink}>
                FlatQube
              </a>
              <a target="_blank" href={'https://everscan.io/'} className={styles.footerLink}>
                EverScan
              </a>
              <a target="_blank" href={'https://wrappedever.io/'} className={styles.footerLink}>
                Wrapped EVER
              </a>
              <a target="_blank" href={'https://everwallet.net/'} className={styles.footerLink}>
                EVER Wallet
              </a>
              <a target="_blank" href={'https://everpools.io/'} className={styles.footerLink}>
                EVER Pools
              </a>
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <Link>
              <Button style={'primaryBtn'} text={'Install EVER Wallet'} />
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
