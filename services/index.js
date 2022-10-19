import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
	const query = gql`
    	query MyQuery {
			postsConnection {
				edges {
					node {
						author {
							bio
							name
							id
							photo {
								url
							}
						}
						createdAt
						slug
						title
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`;

	const result = await request(graphqlAPI, query);

	return result.postsConnection.edges;
};

export const getSlugs = async () => {
	const query = gql`
		query GetSlugs {
			posts {
                id
                slug
            }
		}
  `;

	const result = await request(graphqlAPI, query);

	return result.map(post => {
        return {
            params: { slug: post.slug.toString() }
        }
    })
};

export const getPost = async () => {
	const query = gql`
		query GetPost {
			posts(where: {slug: "react-testing"}) {
				id
				slug
				title
				excerpt
				createdAt
			}
		}
  `;

	const result = await request(graphqlAPI, query);

	return result.posts;
};