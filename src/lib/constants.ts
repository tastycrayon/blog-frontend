export const COOKIE_OPTIONS = { httpOnly: false, secure: import.meta.env.PROD };

export const LOGOUT_PATH = '/logout';
export const BLOG_ROOT_URL = '/blog';
export const PROJECTS_ROOT_URL = '/projects';
export const CATEGORY_ROOT_URL = '/category';
export const internalLinks = [
	{
		component: 'HOME',
		url: '/',
		img: ''
	},
	{
		component: 'ABOUT',
		url: '/about',
		img: ''
	},
	{
		component: 'PROJECTS',
		url: '/projects',
		img: ''
	},
	{
		component: 'BLOG',
		url: '/blog',
		img: ''
	}
];

export const MenuButton = {
	component: 'RESUME',
	url: '/resume.pdf',
	img: ''
};

export const PAGINATION_KEY = 'page';
export const BLOG_POST_COUNT = 9;

type Icon = {
	name: any;
	url: string;
	component: string;
};
export const ICONS_LINKS: Icon[] = [
	// {
	// 	name: 'upwork',
	// 	url: 'https://www.upwork.com/freelancers/~01816d245683177af1',
	// 	component: 'upwork.com/freelancers/~01816d245683177af1'
	// },
	{
		name: 'envelope',
		url: 'mailto:mosiurdev@gmail.com',
		component: 'mosiurdev@gmail.com'
	},
	{
		name: 'github',
		url: 'https://github.com/tastycrayon',
		component: 'github.com/tastycrayon'
	},
	{
		name: 'linkedin',
		url: 'https://www.linkedin.com/in/mosiur404',
		component: 'linkedin.com/in/mosiur404'
	}
];
