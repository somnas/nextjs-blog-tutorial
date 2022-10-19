import Layout from '../../components/layout';
import { getPost, getSlugs } from '../../services';

export async function getStaticPaths() {
    const paths = getSlugs();

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = (await getPost()) || [];
    return {
        props: { postData },
    };
}

export default function Post({ postData }) {
    return (
        <Layout>
            {postData.title}
            <br />
            {postData.excerpt}
            <br />
            {postData.createdAt}
        </Layout>
    );
}