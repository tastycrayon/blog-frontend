import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	Time: any;
};

export type Category = {
	__typename?: 'Category';
	ID: Scalars['Int'];
	category_slug: Scalars['String'];
	category_title: Scalars['String'];
	created_at: Scalars['Time'];
	description?: Maybe<Scalars['String']>;
	updated_at: Scalars['Time'];
};

export type Image = {
	__typename?: 'Image';
	ID: Scalars['Int'];
	created_at: Scalars['Time'];
	height: Scalars['Int'];
	image_title: Scalars['String'];
	image_url: Scalars['String'];
	thumbnail_url?: Maybe<Scalars['String']>;
	updated_at: Scalars['Time'];
	width: Scalars['Int'];
};

export type LoginResponse = {
	__typename?: 'LoginResponse';
	access_token?: Maybe<Scalars['String']>;
	exp?: Maybe<Scalars['String']>;
};

export type Mutation = {
	__typename?: 'Mutation';
	addImage: MutationResponse;
	addPost: MutationResponse;
};

export type Mutation_AddImageArgs = {
	height: Scalars['Int'];
	image_title?: InputMaybe<Scalars['String']>;
	image_url: Scalars['String'];
	thumbnail_url?: InputMaybe<Scalars['String']>;
	width: Scalars['Int'];
};

export type Mutation_AddPostArgs = {
	authorid: Scalars['ID'];
	imageId: Scalars['ID'];
	post_content?: InputMaybe<Scalars['String']>;
	post_slug?: InputMaybe<Scalars['String']>;
	post_title: Scalars['String'];
};

export type MutationResponse = {
	__typename?: 'MutationResponse';
	code: Scalars['Int'];
	/** Human-readable message for the UI */
	message: Scalars['String'];
	/** Newly updated result after a successful mutation */
	result: Scalars['ID'];
	/** Indicates whether the mutation was successful */
	success: Scalars['Boolean'];
};

export type Post = {
	__typename?: 'Post';
	ID: Scalars['Int'];
	created_at: Scalars['Time'];
	post_author: User;
	post_content: Scalars['String'];
	post_image?: Maybe<Image>;
	post_slug: Scalars['String'];
	post_title: Scalars['String'];
	updated_at: Scalars['Time'];
};

export type PostCat = {
	__typename?: 'PostCat';
	categories?: Maybe<Array<Category>>;
	post: Post;
};

export type Query = {
	__typename?: 'Query';
	getCategories?: Maybe<Array<Category>>;
	getImage?: Maybe<Image>;
	getPost?: Maybe<Post>;
	getPostBySlug?: Maybe<Post>;
	getPostCount: Scalars['Int'];
	getPostWithCatBySlug?: Maybe<PostCat>;
	getPosts: Array<Post>;
	getPostsByCategory: Array<Post>;
	getPostsWithCategory: Array<PostCat>;
	getUser?: Maybe<User>;
	getUsers?: Maybe<Array<Maybe<User>>>;
	login?: Maybe<LoginResponse>;
	logout?: Maybe<Scalars['Boolean']>;
};

export type Query_GetImageArgs = {
	id: Scalars['ID'];
};

export type Query_GetPostArgs = {
	id: Scalars['ID'];
};

export type Query_GetPostBySlugArgs = {
	slug: Scalars['String'];
};

export type Query_GetPostCountArgs = {
	cat?: InputMaybe<Scalars['String']>;
};

export type Query_GetPostWithCatBySlugArgs = {
	slug: Scalars['String'];
};

export type Query_GetPostsArgs = {
	limit: Scalars['Int'];
	offset: Scalars['Int'];
	orderBy?: InputMaybe<Scalars['String']>;
};

export type Query_GetPostsByCategoryArgs = {
	cat: Scalars['String'];
	limit: Scalars['Int'];
	offset: Scalars['Int'];
	orderBy?: InputMaybe<Scalars['String']>;
};

export type Query_GetPostsWithCategoryArgs = {
	limit: Scalars['Int'];
	offset: Scalars['Int'];
	orderBy?: InputMaybe<Scalars['String']>;
};

export type Query_GetUserArgs = {
	id: Scalars['ID'];
};

export type Query_LoginArgs = {
	emailOrUsername: Scalars['String'];
	password: Scalars['String'];
};

export type Query_LogoutArgs = {
	emailOrUsername: Scalars['String'];
	password: Scalars['String'];
};

export type User = {
	__typename?: 'User';
	ID: Scalars['Int'];
	created_at: Scalars['Time'];
	display_name?: Maybe<Scalars['String']>;
	updated_at: Scalars['Time'];
	user_email: Scalars['String'];
	user_image?: Maybe<Image>;
	user_name: Scalars['String'];
};

export type AuthorImage = {
	__typename?: 'User';
	user_image?: {
		__typename?: 'Image';
		ID: number;
		image_title: string;
		image_url: string;
		thumbnail_url?: string | null;
		height: number;
		width: number;
		created_at: any;
		updated_at: any;
	} | null;
};

export type AuthorImageVariables = Exact<{ [key: string]: never }>;

export type PostImage = {
	__typename?: 'Post';
	post_image?: {
		__typename?: 'Image';
		ID: number;
		image_title: string;
		image_url: string;
		thumbnail_url?: string | null;
		height: number;
		width: number;
	} | null;
};

export type PostImageVariables = Exact<{ [key: string]: never }>;

export type AuthorPart = {
	__typename?: 'Post';
	post_author: {
		__typename?: 'User';
		ID: number;
		display_name?: string | null;
		user_image?: {
			__typename?: 'Image';
			ID: number;
			image_title: string;
			image_url: string;
			thumbnail_url?: string | null;
			height: number;
			width: number;
			created_at: any;
			updated_at: any;
		} | null;
	};
};

export type AuthorPartVariables = Exact<{ [key: string]: never }>;

export type GetPostsVariables = Exact<{
	limit: Scalars['Int'];
	offset: Scalars['Int'];
	orderBy?: InputMaybe<Scalars['String']>;
}>;

export type GetPosts = {
	__typename?: 'Query';
	getPostCount: number;
	getPosts: Array<{
		__typename?: 'Post';
		ID: number;
		post_title: string;
		post_slug: string;
		post_content: string;
		updated_at: any;
		created_at: any;
		post_author: {
			__typename?: 'User';
			ID: number;
			display_name?: string | null;
			user_image?: {
				__typename?: 'Image';
				ID: number;
				image_title: string;
				image_url: string;
				thumbnail_url?: string | null;
				height: number;
				width: number;
				created_at: any;
				updated_at: any;
			} | null;
		};
		post_image?: {
			__typename?: 'Image';
			ID: number;
			image_title: string;
			image_url: string;
			thumbnail_url?: string | null;
			height: number;
			width: number;
		} | null;
	}>;
};

export type GetPostsByCategoryVariables = Exact<{
	limit: Scalars['Int'];
	offset: Scalars['Int'];
	orderBy?: InputMaybe<Scalars['String']>;
	cat: Scalars['String'];
}>;

export type GetPostsByCategory = {
	__typename?: 'Query';
	getPostCount: number;
	getPostsByCategory: Array<{
		__typename?: 'Post';
		ID: number;
		post_title: string;
		post_slug: string;
		post_content: string;
		updated_at: any;
		created_at: any;
		post_author: {
			__typename?: 'User';
			ID: number;
			display_name?: string | null;
			user_image?: {
				__typename?: 'Image';
				ID: number;
				image_title: string;
				image_url: string;
				thumbnail_url?: string | null;
				height: number;
				width: number;
				created_at: any;
				updated_at: any;
			} | null;
		};
		post_image?: {
			__typename?: 'Image';
			ID: number;
			image_title: string;
			image_url: string;
			thumbnail_url?: string | null;
			height: number;
			width: number;
		} | null;
	}>;
};

export type GetPostsWithCategoryVariables = Exact<{
	limit: Scalars['Int'];
	offset: Scalars['Int'];
	orderBy?: InputMaybe<Scalars['String']>;
}>;

export type GetPostsWithCategory = {
	__typename?: 'Query';
	getPostCount: number;
	getPostsWithCategory: Array<{
		__typename?: 'PostCat';
		post: {
			__typename?: 'Post';
			ID: number;
			post_title: string;
			post_slug: string;
			post_content: string;
			updated_at: any;
			created_at: any;
			post_author: {
				__typename?: 'User';
				ID: number;
				display_name?: string | null;
				user_image?: {
					__typename?: 'Image';
					ID: number;
					image_title: string;
					image_url: string;
					thumbnail_url?: string | null;
					height: number;
					width: number;
					created_at: any;
					updated_at: any;
				} | null;
			};
			post_image?: {
				__typename?: 'Image';
				ID: number;
				image_title: string;
				image_url: string;
				thumbnail_url?: string | null;
				height: number;
				width: number;
			} | null;
		};
		categories?: Array<{
			__typename?: 'Category';
			ID: number;
			category_title: string;
			category_slug: string;
			description?: string | null;
		}> | null;
	}>;
};

export type GetPostVariables = Exact<{
	id: Scalars['ID'];
}>;

export type GetPost = {
	__typename?: 'Query';
	getPost?: {
		__typename?: 'Post';
		ID: number;
		post_title: string;
		post_slug: string;
		post_content: string;
		updated_at: any;
		created_at: any;
		post_author: {
			__typename?: 'User';
			ID: number;
			display_name?: string | null;
			user_image?: {
				__typename?: 'Image';
				ID: number;
				image_title: string;
				image_url: string;
				thumbnail_url?: string | null;
				height: number;
				width: number;
				created_at: any;
				updated_at: any;
			} | null;
		};
		post_image?: {
			__typename?: 'Image';
			ID: number;
			image_title: string;
			image_url: string;
			thumbnail_url?: string | null;
			height: number;
			width: number;
		} | null;
	} | null;
};

export type GetPostBySlugVariables = Exact<{
	slug: Scalars['String'];
}>;

export type GetPostBySlug = {
	__typename?: 'Query';
	getPostBySlug?: {
		__typename?: 'Post';
		ID: number;
		post_title: string;
		post_slug: string;
		post_content: string;
		updated_at: any;
		created_at: any;
		post_author: {
			__typename?: 'User';
			ID: number;
			display_name?: string | null;
			user_image?: {
				__typename?: 'Image';
				ID: number;
				image_title: string;
				image_url: string;
				thumbnail_url?: string | null;
				height: number;
				width: number;
				created_at: any;
				updated_at: any;
			} | null;
		};
		post_image?: {
			__typename?: 'Image';
			ID: number;
			image_title: string;
			image_url: string;
			thumbnail_url?: string | null;
			height: number;
			width: number;
		} | null;
	} | null;
};

export type GetPostWithCatBySlugVariables = Exact<{
	slug: Scalars['String'];
}>;

export type GetPostWithCatBySlug = {
	__typename?: 'Query';
	getPostWithCatBySlug?: {
		__typename?: 'PostCat';
		post: {
			__typename?: 'Post';
			ID: number;
			post_title: string;
			post_slug: string;
			post_content: string;
			updated_at: any;
			created_at: any;
			post_author: {
				__typename?: 'User';
				ID: number;
				display_name?: string | null;
				user_image?: {
					__typename?: 'Image';
					ID: number;
					image_title: string;
					image_url: string;
					thumbnail_url?: string | null;
					height: number;
					width: number;
					created_at: any;
					updated_at: any;
				} | null;
			};
			post_image?: {
				__typename?: 'Image';
				ID: number;
				image_title: string;
				image_url: string;
				thumbnail_url?: string | null;
				height: number;
				width: number;
			} | null;
		};
		categories?: Array<{
			__typename?: 'Category';
			ID: number;
			category_title: string;
			category_slug: string;
			description?: string | null;
		}> | null;
	} | null;
};

export type LoginUserVariables = Exact<{
	emailOrUsername: Scalars['String'];
	password: Scalars['String'];
}>;

export type LoginUser = {
	__typename?: 'Query';
	login?: {
		__typename?: 'LoginResponse';
		access_token?: string | null;
		exp?: string | null;
	} | null;
};

export type GetCategoriesVariables = Exact<{ [key: string]: never }>;

export type GetCategories = {
	__typename?: 'Query';
	getCategories?: Array<{
		__typename?: 'Category';
		ID: number;
		category_title: string;
		category_slug: string;
		description?: string | null;
		created_at: any;
		updated_at: any;
	}> | null;
};

export const PostImage = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'PostImage' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Post' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'post_image' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'ID' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'image_title' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'image_url' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'thumbnail_url' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'height' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'width' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<PostImage, PostImageVariables>;
export const AuthorImage = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'AuthorImage' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'User' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'user_image' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'ID' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'image_title' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'image_url' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'thumbnail_url' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'height' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'width' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'updated_at' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<AuthorImage, AuthorImageVariables>;
export const AuthorPart = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'AuthorPart' },
			typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Post' } },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'post_author' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'ID' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'display_name' } },
								{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AuthorImage' } }
							]
						}
					}
				]
			}
		},
		...AuthorImage.definitions
	]
} as unknown as DocumentNode<AuthorPart, AuthorPartVariables>;
export const GetPostsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GetPosts' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'orderBy' } },
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'getPosts' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'limit' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'offset' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'orderBy' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'orderBy' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'ID' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'post_title' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'post_slug' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'post_content' } },
								{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AuthorPart' } },
								{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PostImage' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'created_at' } }
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'getPostCount' } }
				]
			}
		},
		...AuthorPart.definitions,
		...PostImage.definitions
	]
} as unknown as DocumentNode<GetPosts, GetPostsVariables>;
export const GetPostsByCategoryDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GetPostsByCategory' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'orderBy' } },
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'cat' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'getPostsByCategory' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'limit' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'offset' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'orderBy' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'orderBy' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'cat' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'cat' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'ID' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'post_title' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'post_slug' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'post_content' } },
								{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AuthorPart' } },
								{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PostImage' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'created_at' } }
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'getPostCount' } }
				]
			}
		},
		...AuthorPart.definitions,
		...PostImage.definitions
	]
} as unknown as DocumentNode<GetPostsByCategory, GetPostsByCategoryVariables>;
export const GetPostsWithCategoryDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GetPostsWithCategory' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'orderBy' } },
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'getPostsWithCategory' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'limit' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'offset' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'offset' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'orderBy' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'orderBy' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'post' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'ID' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'post_title' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'post_slug' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'post_content' } },
											{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AuthorPart' } },
											{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PostImage' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'created_at' } }
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'categories' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'ID' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'category_title' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'category_slug' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'description' } }
										]
									}
								}
							]
						}
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'getPostCount' } }
				]
			}
		},
		...AuthorPart.definitions,
		...PostImage.definitions
	]
} as unknown as DocumentNode<GetPostsWithCategory, GetPostsWithCategoryVariables>;
export const GetPostDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GetPost' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'getPost' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'id' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'ID' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'post_title' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'post_slug' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'post_content' } },
								{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AuthorPart' } },
								{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PostImage' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'created_at' } }
							]
						}
					}
				]
			}
		},
		...AuthorPart.definitions,
		...PostImage.definitions
	]
} as unknown as DocumentNode<GetPost, GetPostVariables>;
export const GetPostBySlugDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GetPostBySlug' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'getPostBySlug' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'slug' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'ID' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'post_title' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'post_slug' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'post_content' } },
								{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AuthorPart' } },
								{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PostImage' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'created_at' } }
							]
						}
					}
				]
			}
		},
		...AuthorPart.definitions,
		...PostImage.definitions
	]
} as unknown as DocumentNode<GetPostBySlug, GetPostBySlugVariables>;
export const GetPostWithCatBySlugDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GetPostWithCatBySlug' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'getPostWithCatBySlug' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'slug' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'post' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'ID' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'post_title' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'post_slug' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'post_content' } },
											{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'AuthorPart' } },
											{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'PostImage' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'updated_at' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'created_at' } }
										]
									}
								},
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'categories' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'ID' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'category_title' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'category_slug' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'description' } }
										]
									}
								}
							]
						}
					}
				]
			}
		},
		...AuthorPart.definitions,
		...PostImage.definitions
	]
} as unknown as DocumentNode<GetPostWithCatBySlug, GetPostWithCatBySlugVariables>;
export const LoginUserDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'LoginUser' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'emailOrUsername' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'password' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } }
					}
				}
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'login' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'emailOrUsername' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'emailOrUsername' } }
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'password' },
								value: { kind: 'Variable', name: { kind: 'Name', value: 'password' } }
							}
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'access_token' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'exp' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<LoginUser, LoginUserVariables>;
export const GetCategoriesDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GetCategories' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'getCategories' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'ID' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'category_title' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'category_slug' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'created_at' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'updated_at' } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetCategories, GetCategoriesVariables>;
