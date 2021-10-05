import Link from 'next/link'

export default function Github({json}) {
    return (
        <>
            <Link href='/'>
                <a className='btn'>Regresar</a>
            </Link>
            {/* <div className='card-page'> */}
                <div className='card'>
                    <img className='image-cropper' src={json.avatar_url} alt='' />
                    <h3>Nombre del perfil: {json.name}</h3>
                    <p>Ubicación: {json.location}</p>
                    <p>Bio: {json.bio}</p>            
                </div>
            <div className='post-date'> Fecha de Ingreso a GitHub: {json.created_at}</div>
            <Link href={`${json.html_url}`}>
                <a className='btn'>Enlace</a>
            </Link>        
      </>
    )
}

export async function getStaticProps() {
//export async function getServerSideProps(){
    const API_USER = process.env.GH_API_USER
    const API_URL = process.env.GH_API_URL+`/users/${API_USER}`;
    //const API_ENDPOINT = `${API_URL}/repos`

    //const perfil = await fetch(`${API_ENDPOINT}`)
    const perfil = await fetch(`${API_URL}`)
    const json = await perfil.json()    

    return {
        props: {
          json
        },
      }
}

