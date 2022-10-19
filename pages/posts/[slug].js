import Layout from '../../components/layout';
import { getSlugs } from '../../services';

export async function getStaticPaths() {
    const data = getSlugs();

    const paths = data.map(post => {
        return {
            params: { slug: post.slug }
        }
    })

    return {
        paths,
        fallback: false,
    };
}

export default function Post() {
    return <Layout>...</Layout>;
}