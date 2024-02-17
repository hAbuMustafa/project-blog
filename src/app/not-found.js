import Link from 'next/link';
import { headers } from 'next/headers';
import { BLOG_TITLE } from '@/constants';
import styles from './not-found.module.css';

export const metadata = {
  title: `404 Page Not Found • ${BLOG_TITLE}`,
  status: 404,
};
async function NotFound() {
  const headersList = headers();

  return (
    <div className={styles.error_wrapper}>
      <h1>404 Page Not Found</h1>
      <p>
        Back <Link href={'/'}>Home</Link>
      </p>
    </div>
  );
}

export default NotFound;
