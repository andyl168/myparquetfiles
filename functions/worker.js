export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Forward the request to your Pages site
    const targetUrl = `https://822e8717.myparquetfiles.pages.dev${url.pathname}${url.search}`;
    const response = await fetch(targetUrl, request);

    // Clone headers
    const newHeaders = new Headers(response.headers);

    // Expose ETag (and optionally other headers)
    newHeaders.set(
      "access-control-expose-headers",
      "etag, content-length, content-type, last-modified"
    );

    // Return the modified response
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
