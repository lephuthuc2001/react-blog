import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { getBlogPostList, loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import CodeSnippet from "@/components/CodeSnippet";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";
import CircularColorsDemo from "@/components/CircularColorsDemo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  try {
    const { frontmatter } = await loadBlogPost(params.postSlug);

    return {
      title: frontmatter.title,
      description: frontmatter.abstract,
    };
  } catch (error) {
    return {
      title: "Not Found",
      description: "Not Found Page",
    };
  }
}

export async function generateStaticParams() {
  const blogs = await getBlogPostList();

  return blogs.map((blog) => ({
    postSlug: blog.slug,
  }));
}

async function BlogPost({ params }) {
  let content;
  try {
    const blog = await loadBlogPost(params.postSlug);
    content = blog.content;
  } catch (error) {
    return notFound();
  }

  return (
    <article className={styles.wrapper}>
      <BlogHero title="Example post!" publishedOn={new Date()} />
      <div className={styles.page}>
        {/* <p>This is where the blog post will go!</p>
        <p>
          You will need to use <em>MDX</em> to render all of the elements
          created from the blog post in this spot.
        </p> */}
        <MDXRemote
          source={content}
          components={{ CodeSnippet, DivisionGroupsDemo, CircularColorsDemo }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
