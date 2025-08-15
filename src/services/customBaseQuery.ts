import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { login, logout } from "./slice/authSlice";
import fetchClient from "./fetchClient";

/**
 * Custom base query for all API endpoints
 * @param param0 request body and variables
 * @param api base query API object
 * @returns API response from fetch client
 */
const customBaseQuery = async (
	{ body, variables }: { body?: string | FormData | object, variables?: any },
	api: BaseQueryApi
) => {
	try {
		let headers = {}
		if(!variables?.noAuth) {
			//getting auth token from global state or local storage
			let token: string = (api.getState() as RootState).auth.token;
			if (!token) {
				let localToken: string | null = localStorage.getItem('token');
				if (localToken && localToken !== null) {
					token = localToken;
					api.dispatch(login({ token: localToken }));
				}
			}

			//setting authorization header
			headers = {
				"Authorization": `Bearer ${token}`
			}
		}

		let args: FetchArgs = {
			url: variables.url,
			body: body,
			method: variables.method,
			params: variables.params,
			headers: {
				...headers
			},
			credentials: "include"
		}

		let result;
		let response = await fetchClient(args);
		if (response.ok) {
			result = response.json();
		} else {
			if (response.status === 401 || response.status === 403) {
				api.dispatch(logout());
				//done in a dirty way till we figure out a better way to redirect to login
				if(!variables.noAuth) window.location.reload();
			}
		}
		return { data: result };
	} catch (error: any | Error) {
		console.error("Error occurred while getting api response:", error);
		return { error: { status: error.response.status, data: error } };
	}
}

export default customBaseQuery;
