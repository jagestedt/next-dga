import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Disc, { DiscProps } from "../components/Disc"
import prisma from "../lib/prisma"

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.disc.findMany({
    where: { inBag: true },
    include: {
      owner: {
        select: { name: true },
      },
    },
  })
  return {
    props: { feed },
    revalidate: 10,
  }
}

type Props = {
  feed: DiscProps[]
}

const Blog: React.FC<Props> = props => {
  console.log(props.feed)
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map(disc => (
            <div key={disc.id} className="disc">
              <Disc disc={disc} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .disc {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .disc:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .disc + .disc {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
