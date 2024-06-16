import { FetchArgs } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants";

const fetchClient = async (args: FetchArgs): Promise<Response> => {
	let response: Response = new Response();
	try {
		let url = new URL(BASE_URL);
		let passedHeaders = args.headers;
		let headers: Headers | any = {
			...passedHeaders
		}
		let options: RequestInit = {
			method: args.method ? args.method : "GET",
			headers: headers as Headers
		}

		if (args.params) {
			let params = new URLSearchParams(args.params);
			url = new URL(`${args.url}?${params.toString()}`, url);
		}

		if (args.body instanceof FormData) {
			options.body = args.body;
		} else {
			options.body = JSON.stringify(args.body);
			headers['Content-Type'] = "application/json";
		}
		response = await fetch(url, options);
	} catch (error) {
		console.error("Error in http call:", error);
	}
	return response;
}

export default fetchClient;
