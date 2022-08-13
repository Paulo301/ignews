import styles from './styles.module.scss';

interface SubscribeButtonProps {}

export function SubscribeButton({}: SubscribeButtonProps) {
  return (
    <button
      type='button'
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  );
}