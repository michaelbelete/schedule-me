import React from "react"
// import { GetStaticProps } from "next"
import Layout from "../layouts/Landing";
// import Post, { PostProps } from "../components/Post"

// export const getStaticProps: GetStaticProps = async () => {
//   const feed = [
//     {
//       id: 1,
//       title: "Prisma is the perfect ORM for Next.js",
//       content: "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
//       published: false,
//       author: {
//         name: "Nikolas Burk",
//         email: "burk@prisma.io",
//       },
//     },
//   ]
//   return { props: { feed } }
// }

const Blog: React.FC = () => {
  return (
    <Layout>
      <h1>Hello, world</h1>
    </Layout>
  )
}

export default Blog
