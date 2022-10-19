import Layout from '../../components/layout';
import Head from 'next/head';
import { getPost, getSlugs } from '../../services';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticPaths() {
    const paths = await getSlugs();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = (await getPost({ slug: params.slug })) || [];

    return {
        props: {
            postData,
        }
    };
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <br />
                <p>
                    {postData.excerpt}
                </p>
                <br />
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.createdAt} />
                </div>
            </article>
        </Layout>
    );
}