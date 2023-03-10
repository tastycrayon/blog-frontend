export const SERVER_URL =
	import.meta.env.VITE_APP_GRAPHQL_URL == null
		? import.meta.env.VITE_APP_GRAPHQL_URL
		: 'http://localhost:8080';
