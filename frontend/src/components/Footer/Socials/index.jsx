import styles from './styles.module.sass'

import facebook from 'static/svg/facebook.svg'
import twitter from 'static/svg/twitter.svg'
import github from 'static/svg/github.svg'
import reddit from 'static/svg/reddit.svg'
import medium from 'static/svg/medium.svg'

const Socials = () => {
  return (
    <div className={styles.socials}>
      <img src={facebook} alt={'facebook'} />
      <img src={twitter} alt={'twitter'} />
      <img src={github} alt={'github'} />
      <img src={reddit} alt={'reddit'} />
      <img src={medium} alt={'medium'} />
    </div>
  )
}

export default Socials
