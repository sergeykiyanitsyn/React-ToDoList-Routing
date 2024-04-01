import { NavLink } from 'react-router-dom'
import styles from './Page404.module.css'

export const Page404 = () => (
  <div>
    <div className={styles.lampWrap}>
      <div className={styles.lamp}>
        <div className={styles.cable}></div>
        <div className={styles.cover}></div>
        <div className={styles.inCover}>
          <div className={styles.bulb}></div>
        </div>
        <div className={styles.light}></div>
      </div>
    </div>
    <section className={styles.error}>
      <div className={styles.errorContent}>
        <div className={styles.errorMessage}>
          <h1 className={styles.messageTitle}>Page 404</h1>
        </div>
        <div className={styles.errorNavENav}>
          <NavLink to={'/'} target="_blanck" className={styles.eNavLink}></NavLink>
        </div>
      </div>
    </section>
  </div>
)
