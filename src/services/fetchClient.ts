import { FetchArgs } from "@reduxjs/toolkit/query/react";

// const BASE_URL = "http://localhost:4000";
const BASE_URL = "http://bullseye.local:4000";

const fetchClient = async (args: FetchArgs): Promise<Response> => {
	let response: Response = new Response();
	try {
		let passedHeaders = args.headers;
		let headers: Headers | any = {
			...passedHeaders
		}
		let options: RequestInit = {
			method: args.method ? args.method : "GET",
			headers: headers as Headers,
			body: JSON.stringify(args.body),
		}

		if (args.params) {
			console.log("setting params:", args.params)
			args.url = args.url + "?path=" + args.params.path
		}

		if (args.body instanceof FormData) {
			options["body"] = args.body
		} else {
			headers['Content-Type'] = "application/json";
		}
		response = await fetch(BASE_URL + args.url, options);
	} catch (error) {
		console.error("Error in http call:", error);
	}
	return response;
}

export default fetchClient;
