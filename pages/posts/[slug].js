import Layout from '../../components/layout';
import Head from 'next/head';
import { getPost, getSlugs } from '../../services';
import Date from '../../components/date';

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
            <h1>{postData.title}</h1>
            <br />
            {postData.excerpt}
            <br />
            <Date dateString={postData.createdAt} />
        </Layout>
    );
}