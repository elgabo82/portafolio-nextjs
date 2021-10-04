import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Post from '../components/Post'
import {sortByDate} from '../utils'
import { useState } from 'react'
// import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import { signIn, signOut, useSession, getSession } from 'next-auth/client'

export default function Home({posts}) { 
  
  return (
    <div>
      <Head>
        <title>Portafolio - MD & API</title>
        <meta name="description" content="Generada usando create-next-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='card-page'>
        <div className='card'>
          <img className='logo-64 image-cropper' src='images/Gabriel.jpg' alt=''/>
          <p className='texto-titulo'>Gabriel Morejón.</p>
          <p className='parrafo'>
            Usuario activo Open Source/Servidores/Escritorio, Ingeniero de Software.
            Retomando el desarrollo de Software, HTML/JS/ReactJS/NextJS.
          </p>
        </div>
      </div>

        

      <div className='posts'>        
        {posts.map((post, index) => (          
          <Post key={index} post={post}/>
        ))}
      </div>
            
      {/* <Github json={json}/> */}
      <footer>
        <p>Desarrollado por: Gabriel Morejón, apoyado en el aporte de varios programadores.</p>        
        Contactos: <a href="mailto:gabrielmorejon@gmail.com">gabrielmorejon@gmail.com</a>
        <p>Un portafolio sencillo.</p>        
      </footer>
    </div>
  )
}


export async function getStaticProps(context) {
//export async function getServerSideProps(context) {
  const session = await getSession(context);

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
      session     
    },
  }
}