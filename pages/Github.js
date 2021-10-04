import Link from 'next/link'
import Githubprojects from '../componentes/Githubprojects'

export default function Github({json}) {
    return (
        <>
            <Link href='/'>
                <a className='btn'>Regresar</a>
            </Link>
            <div className='posts'>                
            {
                json.map((repo, index)=> (
                    <Githubprojects key={index} repo={repo}/>
                ))
            }
            </div>
      </>
    )
}


export async function getStaticProps() {
    const API_USER = 'elgabo82'
    const API_URL = `https://api.github.com/users/${API_USER}`;
    const API_ENDPOINT = `${API_URL}/repos`

    const repos = await fetch(`${API_ENDPOINT}`)
    const json = await repos.json()

    return {
        props: {
          json,
        },
      }
}
