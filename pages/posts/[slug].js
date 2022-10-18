import Layout from '../../components/layout';
import { getSlugs } from '../../services';

export async function getStaticPaths() {
    const paths = getSlugs();
    return {
        paths,
        fallback: false,
    };
}

export default function Post() {
    return <Layout>...</Layout>;
}