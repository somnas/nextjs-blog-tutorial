import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
//import { getSortedPostsData } from '../lib/posts';
import { getPosts } from '../services';

/* export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
} */

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
				<p>
					(This is a sample website - you’ll be building a site like this on{' '}
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
				</p>
			</section>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{/* {allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							{title}
							<br />
							{id}
							<br />
							{date}
						</li>
					))} */}
					{posts.map((post, index) => (
						<li className={utilStyles.listItem} key={index}>
							{post.node.title}
							<br />
							{post.node.excerpt}
							<br />
							{post.node.createdAt}
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}