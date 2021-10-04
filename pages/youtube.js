const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
const YOUTUBE_API_KEY = process.env.YOUTUBE_KEY

import styles from '../styles/Home.module.css'
import Link from 'next/link'

export async function getServerSideProps() {
//export async function getStaticProps() {
    const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLFsfg2xP7cbLuAglQob6zjS4nVbyAfSVV&key=${YOUTUBE_API_KEY}`)
    const data = await res.json();
    
    return {
        props: {
            data,
        }
    }
}


export default function youtube({data}) {
    //console.log(data)
    return (
        <>
        <Link href='/'>
          <a className='btn' >Regresar</a>
        </Link>     
        <ul className={styles.grid}>
          {data.items.map(({ id, snippet = {} }) => {
            const { title, thumbnails = {}, resourceId = {} } = snippet;
            const { medium } = thumbnails;
            return (
              <li key={id} className={styles.card}>
                <a href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}>
                  <p>
                    <img width={medium.width} height={medium.height} src={medium.url} alt="" />
                  </p>
                  <h3>{ title }</h3>
                </a>
              </li>
            )
          })}
        </ul>
        </> 
    )
}
