import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { login, logout } from "./slice/authSlice";
import fetchClient from "./fetchClient";

const customBaseQuery = async (
	{ body, variables }: { body?: string | FormData | object, variables?: any },
	api: BaseQueryApi
) => {
	try {

		let token: string = (api.getState() as RootState).auth.token;
		if (!token) {
			let localToken: string | null = localStorage.getItem('token');
			if (localToken && localToken !== null) {
				token = localToken;
				api.dispatch(login({ token: localToken }));
			}
		}
		let headers = {
			"Authorization": `Bearer ${token}`
		}

		if (variables.url.includes("/files")) {
			variables.params.path = variables.params.path ? variables.params.path : '/'
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
				window.location.reload();
			}
		}
		return { data: result };
	} catch (error: any | Error) {
		console.log("Error occurred while getting api response:", error);
		return { error: { status: error.response.status, data: error } };
	}
}

export default customBaseQuery;
