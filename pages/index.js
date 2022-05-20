import prisma from "@/lib/prisma";
import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export async function getStaticProps() {
  const feed = await prisma.post.findMany({
    where: { postStatus: "DRAFT" },
    include: {
      author: {
        select: { name: true }
      }
    }
  });
  return { props: { feed } };
}

export default function Home({ feed }) {
  const { data: session, status } = useSession();
  console.log(feed);

  return (
    <div>
      <div>
        {!session && (
          <>
            Not signed in <br />
            <button onClick={signIn}>Sign In</button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user}
            <br />
            <div>Hidden content</div>
            <button onClick={signOut}>Sign Out</button>
          </>
        )}
      </div>
      {feed.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>Author: {post.author.name}</p>
          <span>{post.content}</span>
        </div>
      ))}
    </div>
  );
}
