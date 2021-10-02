import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import marked from 'marked'
import Link from 'next/link'

export default function PostPage({fronmatter: {title, date, cover_image}, slug, content}) {
    return (
    <>
        <Link href='/'>
        <a className='btn btn-back'>Regresar</a>
        </Link>
        <div className='card card-page'>
            <h1 className='post-title'>{title}</h1>
            <div className='post-date'>Posteada en {date}</div>
            <img src={cover_image} alt='Descripción de imagen'/>
            <div className="post-body">
                <div dangerouslySetInnerHTML={{__html: marked(content)}}></div>
            </div>
        </div>

    </>)
}


export async function getStaticPaths(){
    const archivos = fs.readdirSync(path.join('posts'))

    const paths = archivos.map(archivo => ({
        params: {
            slug: archivo.replace('.md', '')
        }
    }))

    //console.log(paths)

    return {
        paths,
        fallback: false //: [{ params: { slug: '1' }}]
    }
}

export async function getStaticProps({params: {slug}}){
    const markdownMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')

    const {data: fronmatter, content} = matter(markdownMeta)

    return {
        props: {
            fronmatter,
            slug,
            content
        },
    }
}