import RSS from 'rss';
import { getBlogPostList } from '@/helpers/file-helpers';
import { BLOG_AUTHOR, BLOG_DESCRIPTION, BLOG_TITLE } from '@/constants';

export async function GET() {
  const blogPosts = await getBlogPostList();

  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    feed_url: 'https://www.example.com/rss.xml',
    site_url: 'https://www.example.com/',
    image_url: 'https://www.example.com/favicon.ico',
    managingEditor: 'hosam5553@gmail.com',
    language: 'en',
    categories: ['Technology'],
    pubDate: blogPosts[0].publishedOn,
  });

  blogPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      url: 'https://www.example.com/' + post.slug,
      author: post.author ?? BLOG_AUTHOR,
      date: post.publishedOn,
    });
  });

  return new Response(feed.xml(), {
    status: 200,
    headers: { 'Content-Type': 'application/xml' },
  });
}
