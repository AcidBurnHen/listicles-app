import prisma from "../lib/prisma";

export async function getStaticProps() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true }
      }
    }
  });
  return { props: { feed } };
}

export default function Home({ feed }) {
  console.log(feed);

  return (
    <div>
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
