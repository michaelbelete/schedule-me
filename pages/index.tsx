import React, { useRef, useState } from "react"
import CardLayout from "../layouts/card";
import Layout from "../layouts/Landing";
import LandingHeader from "../components/landing_header";

import DataTable from 'react-data-table-component';

const Landing: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState('Copy');
  const [link, setLink] = useState('https://localhost:8000/a');

  const textAreaRef = useRef(null);

  const columns = [
    {
      name: "title",
      selector: row => row.title
    },
    {
      name: "location",
      selector: row => row.location
    },
    {
      name: "start time",
      selector: row => row.startTime
    },
    {
      name: "end time",
      selector: row => row.endTime
    },
    {
      name: "Attende",
      selector: row => row.attende.name
    }
  ]

  const data = [
    {
      title: "test",
      startTime: "tonight",
      endTime: "tomorrow",
      attende: {
        name: "mike belete"
      }
    }
  ]
  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
  };
  return (
    <Layout>
      {/* <LandingHeader /> */}
      <div className="flex flex-col justify-center items-center px-36 mt-10 mb-5">
        <h1 className="text-5xl font-bold text-white">Welcome, Michael Belete</h1>
        <p className="mt-5 text-white">Create a new event and share your link to start using
          schedule me</p>

        <div className="mt-10">
          <div className="flex flex-row justify-center px-2 py-2 bg-white rounded-xl item-center">
            <input
              ref={textAreaRef}
              value={link}
              autoFocus
              disabled
              onChange={(e) => setLink(e.target.value)}
              type="text"
            />
            {
              <div>
                <button onClick={copyToClipboard}> {copySuccess}</button>

              </div>
            }
          </div>
        </div>
      </div>
      <CardLayout>
        <div className="px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-700">Events</h1>
          {/* <DataTable columns={columns} data={data}></DataTable> */}
        </div>
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


