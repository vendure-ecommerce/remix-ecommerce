// import { loader } from "~/../images/route.server";
import { LoaderFunction } from 'remix';
import { fetch } from '@remix-run/node';

// export { loader };

let loader: LoaderFunction = async ({ request }) => {
    let url = new URL(request.url);
    return fetch(url.searchParams.get('src')!);
}

export { loader }
