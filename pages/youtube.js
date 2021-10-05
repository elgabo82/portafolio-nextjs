const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
const YOUTUBE_API_KEY = "AIzaSyCgKplaR6UMij80_PVPHWneMAciHpwGRpA" //process.env.YOUTUBE_KEY

import styles from '../styles/Home.module.css'
import Link from 'next/link'
import useSWR from "swr"

// export async function getServerSideProps() {
// //export async function getStaticProps() {
//     const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLFsfg2xP7cbLuAglQob6zjS4nVbyAfSVV&key=${YOUTUBE_API_KEY}`)
//     const data = await res.json();
    
//     return {
//         props: {
//             data
//         }
//     }
// }

const YOUTUBE_URL = `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLFsfg2xP7cbLuAglQob6zjS4nVbyAfSVV&key=${YOUTUBE_API_KEY}`


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Youtube(/*{data}*/) {
    
    const { data, error } = useSWR(
      YOUTUBE_URL,
      fetcher
    );
  
    //console.log(data)

    if (error) return "Ha ocurrido un error.";
    if (!data) return "Cargando...";
    console.log(data)

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
