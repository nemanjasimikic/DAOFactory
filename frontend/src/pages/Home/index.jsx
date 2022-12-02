import IsLoggedOut from 'pages/Home/IsLoggedOut'
// import IsLoggedIn from 'pages/Home/IsLoggedIn'

import styles from './style.module.sass'

const Home = () => {
  return (
    <div className={styles.container}>
      <IsLoggedOut />
      {/*<IsLoggedIn />*/}
    </div>
  )
}

export default Home
