import Layout from '../../components/layout';
import { getPost, getSlugs } from '../../services';

export async function getStaticPaths() {
    const paths = getSlugs();
    //console.log(paths);
    return {
        paths: [
            {
                params: {slug: 'react-testing'}
            }
        ],
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const postData = (await getPost(params.slug)) || [];
    
    return {
        props: {
            postData,
        }
    };
}

export default function Post({ postData }) {
    console.log(postData);
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