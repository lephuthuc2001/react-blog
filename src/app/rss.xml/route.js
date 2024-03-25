import { BLOG_TITLE } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";

import RSS from "rss";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request) {
  const path = new URL(request.url);
  const feed = new RSS({
    title: BLOG_TITLE,
    description: "just something",
    feed_url: path.hostname,
    site_url: path.toString(),
  });

  const blogs = await getBlogPostList();

  blogs.forEach(({ slug, title, abstract, publishedOn }) => {
    feed.item({
      title,
      description: abstract,
      date: publishedOn,
      url: `${path.host}/${slug}`,
    });
  });

  const xml = feed.xml();

  return new Response(xml, {
    headers: {
      "content-type": "application/xml",
    },
  });
}
