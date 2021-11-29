import ResponsiveContainer from '~/components/responsive-container'
import Hero from '~/components/hero'
import BlogPostCard from '~/components/blog-post-card'
import {H2} from '~/components/typography'
import Link from '~/components/link'
import {getAllPosts, Post} from '~/utils/posts.server'
import {useLoaderData} from 'remix'

export async function loader() {
  const posts = await getAllPosts()
  return posts.sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 3)
}

const gradients = [
  'from-[#D8B4FE] to-[#818CF8]',
  'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
  'from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]',
]
export default function IndexRoute() {
  let posts = useLoaderData()

  return (
    <ResponsiveContainer>
      <Hero />
      <H2 className="tracking-tight mb-6">Latest Posts</H2>
      <div className="flex gap-6 flex-col">
        {posts.map((post: Post, index: number) => (
          <BlogPostCard
            key={post.slug}
            title={post.title}
            description={post.description}
            slug={post.slug}
            views={0}
            gradient={gradients[index]}
          />
        ))}
      </div>
      <Link
        to="/blog"
        className="flex mt-8 leading-7 rounded-lg transition-all h-6"
      >
        Read all posts
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 ml-1"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
          />
        </svg>
      </Link>
    </ResponsiveContainer>
  )
}
