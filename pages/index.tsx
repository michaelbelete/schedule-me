import React from "react"
import CardLayout from "../layouts/card";
import Layout from "../layouts/Landing";
import LandingHeader from "../components/landing_header";

const Landing: React.FC = () => {
  return (
    <Layout>
      <LandingHeader />
      <CardLayout>
        <h1>Hello, world</h1>
      </CardLayout>
    </Layout>
  )
}

export default Landing;
// import { GetStaticProps } from "next"
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


