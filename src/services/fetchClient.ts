import { FetchArgs } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants";

/**
 * Custom fetch client to handle all requests
 * @param args fetch args with request details
 * @returns response of fetch from API
 */
const fetchClient = async (args: FetchArgs): Promise<Response> => {
	let response: Response = new Response();
	try {
		let url = new URL(args.url, BASE_URL);
		let passedHeaders = args.headers;

		//setting headers
		let headers: Headers | any = {
			...passedHeaders
		}

		//setting request options
		let options: RequestInit = {
			method: args.method ? args.method : "GET",
			headers: headers as Headers
		}

		//handling request with params
		if (args.params) {
			let params = new URLSearchParams(args.params);
			url = new URL(`?${params.toString()}`, url);
		}

		//handling request body by type
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
