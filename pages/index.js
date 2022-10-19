import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';
import { getPosts } from '../services';

export async function getStaticProps() {
	const posts = (await getPosts()) || [];
	return {
		props: { posts },
	};
}

export default function Home({ allPostsData, posts }) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>I'm a tvättäkta Täbb.</p>
			</section>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{posts.map((post, index) => (
						<li className={utilStyles.listItem} key={index}>
							<Link href={`/posts/${post.node.slug}`}>
								<a>{post.node.title}</a>
							</Link>
							<br />
							{post.node.excerpt}
							<br />
							<small className={utilStyles.lightText}>
								<Date dateString={post.node.createdAt} />
							</small>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}