export interface ITag {
	id: string;
	title: string;
	slug: string;
	description: string;
	created_at: string;
	updated_at: string;
}

export interface IPost {
	id: string;
	collectionId: string;
	collectionName: string;
	created: string;
	updated: string;
	title: string;
	slug: string;
	content: string;
	excerpt: string;
	cover: string;
	thumb: string;
	author: string;
	tags?: ITag[] | string[] | null;
}
export interface IProject {
	id: string;
	collectionId: string;
	collectionName: string;
	created: string;
	updated: string;
	title: string;
	slug: string;
	content: string;
	excerpt: string;
	cover: string;
	thumb: string;
	author: string;
	is_side_project: boolean;
}
