import { getPosts } from "../apis/notion-client/getPosts"
import { CONFIG } from "site.config"
import { getServerSideSitemap, ISitemapField } from "next-sitemap"
import { filterPosts } from "src/libs/utils/notion"

export const getServerSideProps = async (ctx: any) => {
  const posts = filterPosts(await getPosts())
  const dynamicPaths = posts.map((post) => `${CONFIG.link}/${post.slug}`)

  // Create an array of fields, each with a loc and lastmod
  // const fields: ISitemapField[] = []

  const fields: ISitemapField[] = dynamicPaths.map((path) => ({
    loc: path,
    lastmod: new Date().toISOString(),
    priority: 0.7,
    changefreq: "daily",
  }))

  // Include the site root separately
  fields.unshift({
    loc: CONFIG.link,
    lastmod: new Date().toISOString(),
    priority: 1.0,
    changefreq: "daily",
  })

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default () => {}
