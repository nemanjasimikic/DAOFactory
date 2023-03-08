import styles from './styles.module.sass'
import telegram from 'static/svg/telegram.svg'
import facebook from 'static/svg/facebook.svg'
import twitter from 'static/svg/twitter.svg'
import github from 'static/svg/github.svg'
import reddit from 'static/svg/reddit.svg'
import medium from 'static/svg/medium.svg'

const Socials = () => {
  return (
    <div className={styles.socials}>
      <a href={'https://t.me/broxus_chat'} target={'_blank'}>
        <img src={telegram} alt={'telegram'} />
      </a>
      <a href={'https://www.facebook.com/BroxusOfficial/'} target={'_blank'}>
        <img src={facebook} alt={'facebook'} />
      </a>
      <a href={'https://twitter.com/Broxus'} target={'_blank'}>
        <img src={twitter} alt={'twitter'} />
      </a>
      <a href={'https://github.com/broxus'} target={'_blank'}>
        <img src={github} alt={'github'} />
      </a>
      <a href={'https://www.reddit.com/r/crypto_is_easy'} target={'_blank'}>
        <img src={reddit} alt={'reddit'} />
      </a>
      <a href={'https://medium.com/broxus'} target={'_blank'}>
        <img src={medium} alt={'medium'} />
      </a>
    </div>
  )
}

export default Socials
