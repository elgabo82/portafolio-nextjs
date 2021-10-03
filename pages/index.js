import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Post from '../componentes/Post'
import {sortByDate} from '../utils'
// import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home({posts}) {

  const [ session ] = useSession();
  console.log(session)
  // console.log(posts)
  // console.log(json)

  return (
    <div>
      <Head>
        <title>Portafolio - MD & API</title>
        <meta name="description" content="Generada usando create-next-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='card-page'>
        <div className='card'>
          <img className='image-cropper' src='images/Octocat.jpg' alt=''/>
          <p>Gabriel Morejón.
            Usuario activo Open Source/Servidores/Escritorio, Ingeniero de Software.
            Reingresando en el desarrollo de Software, HTML/JS/React/Next
          </p>
          
          
        </div>
      </div>

      <div className='posts'>        
        {posts.map((post, index) => (          
          <Post key={index} post={post}/>
        ))}
      </div>
            
      {/* <Github json={json}/> */}
    </div>
  )
}


export async function getStaticProps() {

  // Obtiene los archivos del directorio posts
  const archivos = fs.readdirSync(path.join('posts'))
  

  const posts = archivos.map(archivo => {
  const slug = archivo.replace('.md', '')

  // Obtiene el stream
  const markdownDatos = fs.readFileSync(path.join('posts', archivo), 'utf-8')

  const { data: frontmatter } = matter(markdownDatos)
  //console.log(markdownDatos)

  return {
      slug, 
      frontmatter,
    }
  })  

  return {
    props: {
      posts: posts.sort(sortByDate),      
    },
  }
}