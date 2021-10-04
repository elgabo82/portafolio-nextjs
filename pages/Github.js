import Link from 'next/link'
import Githubprojects from '../components/Githubprojects'

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
//export async function getServerSideProps(){
    const API_USER = process.env.GH_API_USER
    const API_URL = process.env.GH_API_URL+`/users/${API_USER}`
    const API_ENDPOINT = `${API_URL}/repos`

    const repos = await fetch(`${API_ENDPOINT}`)
    const json = await repos.json()

    return {        
        props: {
            json,
        },
      }
}
