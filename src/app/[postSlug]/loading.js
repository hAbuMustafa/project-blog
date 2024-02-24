import styles from './postSlug.module.css';
import BlogHero from '@/components/BlogHero';
import { MDXRemote } from 'next-mdx-remote/rsc';

function Blog() {
  return (
    <>
      <BlogHero title="Loading..." publishedOn={new Date()} />
      <div className={styles.page}>
        <MDXRemote source={`# Loading Post`} />
      </div>
    </>
  );
}

function Page() {
  return (
    <article className={styles.wrapper}>
      <Blog />
    </article>
  );
}

export default Page;
