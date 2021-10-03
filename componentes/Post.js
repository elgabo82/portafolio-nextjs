import Link from 'next/link'

export default function Post({post}) {
    return (
        <div className='card'>
            <img src={post.frontmatter.cover_image} alt='Imagen descriptiva'/>    

            <div className='post-date'>Posteada en {post.frontmatter.date}</div>
            <h3>{post.frontmatter.title}</h3>
            <p>{post.frontmatter.excerpt}</p>

            <Link href={`/blog/${post.slug}`}>
                <a className="btn">Leer más</a>
            </Link>
        </div>
    )
}
