import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Socials from 'components/Footer/Socials'
import Button from 'components/common/Button'
import Logo from 'components/Header/Logo'
import styles from './styles.module.sass'
import { WalletContext } from 'context/walletContext'
import { NavLink } from 'react-router-dom'

const Footer = () => {

  const { state: ContextState, login, logout } = useContext(WalletContext)
  const {
    isLoginPending,
    isLoggedIn,
    loginError,
  } = ContextState

  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <div className={styles.topFooter}>
          <div className={styles.topFooterLinksWrapper}>
            <Logo />
            <div className={styles.topFooterLinks}>
              <p className={styles.heading}>DAO Builder</p>

              {isLoggedIn ? (
                  <NavLink
                    to={'/create-dao'}
                    className={({ isActive }) =>
                      isActive ? styles.active : styles.navLink
                    }
                  >
                    Create new DAO
                  </NavLink>
                ) : (
                  <p className={styles.navLink}> Create new DAO</p>
                )
              }
              {isLoggedIn ? (
                  <NavLink
                    to={'/'}
                    className={({ isActive }) =>
                      isActive ? styles.active : styles.navLink
                    }
                  >
                    My DAOs
                  </NavLink>
                ) : (
                  <p className={styles.navLink}> My DAOs</p>
                )
              }       
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
            <a style={{color: 'transparent'}} target="_blank" href='https://everwallet.net/'>
              <Button style={'primaryBtn'} text={'Install EVER Wallet'} />
            </a>
            <a style={{color: 'transparent'}} target="_blank" href='https://github.com/nemanjasimikic/DAOFactory'>
              <Button style={'secondaryBtn'} text={'Source code on Github'} />
            </a>
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
