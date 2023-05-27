import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        
        <nav>
          <ActiveLink 
            href='/' 
            activeClassName={styles.active} 
            text='Home' 
          />
          <ActiveLink 
            href='/posts' 
            activeClassName={styles.active} 
            text='Posts' 
          />
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}