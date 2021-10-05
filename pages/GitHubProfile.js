import Link from 'next/link'
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Github(/*{json}*/) {

    const API_USER = "elgabo82" //process.env.GH_API_USER
    const API_URL = `https://api.github.com`+`/users/${API_USER}` //process.env.GH_API_URL+`/users/${API_USER}`
    
    const { data, error } = useSWR(
        API_URL,
        fetcher
    )

    if (error) return "Ha ocurrido un error."
    if (!data) return "Cargando..."

    return (
        <>
            <Link href='/'>
                <a className='btn'>Regresar</a>
            </Link>
            {/* <div className='card-page'> */}
                <div className='card'>
                    <img className='image-cropper' src={data.avatar_url} alt='' />
                    <h3>Nombre del perfil: {data.name}</h3>
                    <p>Ubicación: {data.location}</p>
                    <p>Bio: {data.bio}</p>            
                </div>
            <div className='post-date'> Fecha de Ingreso a GitHub: {data.created_at}</div>
            <Link href={`${data.html_url}`}>
                <a className='btn'>Enlace</a>
            </Link>        
      </>
    )
}

//export async function getStaticProps() {
// export async function getServerSideProps(){

//     const API_USER = process.env.GH_API_USER
//     const API_URL = process.env.GH_API_URL+`/users/${API_USER}`;
//     //const API_ENDPOINT = `${API_URL}/repos`

//     //const perfil = await fetch(`${API_ENDPOINT}`)
//     const perfil = await fetch(`${API_URL}`)
//     const json = await perfil.json()    

//     return {
//         props: {
//           json
//         },
//       }
// }

