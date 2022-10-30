import React from "react"
import Router from "next/router"
import ReactMarkdown from "react-markdown"

export type DiscProps = {
  id: string
  name: string
  category: string
  owner: { name: string; email: string } | null
  manufacturer: string
  ratings: {
    speed: number
    glide: number
    turn: number
    fade: number
  } | null
  inBag: boolean
}

const Disc: React.FC<{ disc: DiscProps }> = ({ disc }) => {
  const owner = disc.owner.name ? disc.owner.name : null

  return (
    <div onClick={() => Router.push("/d/[id]", `/d/${disc.id}`)}>
      <h2>{disc.name}</h2>
      <small>owned by: {owner}</small>
      <ReactMarkdown children={disc.manufacturer} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  )
}

export default Disc
