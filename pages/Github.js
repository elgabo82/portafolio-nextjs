import Link from 'next/link'
import Githubprojects from '../components/Githubprojects'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Github(/*{json}*/) {
    const API_USER = "elgabo82" //process.env.GH_API_USER
    const API_URL = `https://api.github.com`+`/users/${API_USER}` //process.env.GH_API_URL+`/users/${API_USER}`
    const API_ENDPOINT = `${API_URL}/repos`

    const { data, error } = useSWR(
        API_ENDPOINT,
        fetcher
    );

    if (error) return "Ha ocurrido un error."
    if (!data) return "Cargando..."

    return (
        <>
            <Link href='/'>
                <a className='btn'>Regresar</a>
            </Link>
            <div className='posts'>                
            {
                data.map((repo, index)=> (
                    <Githubprojects key={index} repo={repo}/>
                ))
            }
            </div>
      </>
    )
}


//export async function getStaticProps() {
// export async function getServerSideProps(){
//     const API_USER = process.env.GH_API_USER
//     const API_URL = process.env.GH_API_URL+`/users/${API_USER}`
//     const API_ENDPOINT = `${API_URL}/repos`

//     const repos = await fetch(`${API_ENDPOINT}`)
//     const json = await repos.json()

//     return {        
//         props: {
//             json
//         },
//       }
// }
