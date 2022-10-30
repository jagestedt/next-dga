import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { DiscProps } from "../../components/Disc"
import prisma from "../../lib/prisma"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const disc = await prisma.disc.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      owner: {
        select: { name: true },
      },
    },
  })
  return {
    props: disc,
  }
}

const Disc: React.FC<DiscProps> = props => {
  return (
    <Layout>
      <div>
        <h2>{props.name}</h2>
        <p>By {props?.owner?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.manufacturer} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Disc
