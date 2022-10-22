import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

/* GET ALL POSTS */
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

/* GET ALL SLUGS */
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

	return result.posts.map(post => {
		return {
			params: { slug: post.slug }
		}
	})
};

/* GET SINGLE POST */
export const getPost = async ({ slug }) => {
	
	const query = gql`
		query GetPost($slug: String) {
			post(where: {slug: $slug}) {
				id
				slug
				title
				excerpt
				createdAt
			}
		}
  `;

	const result = await request(graphqlAPI, query, {slug: slug});

	return result.post;
};