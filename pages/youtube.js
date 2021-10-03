export default function youtube() {
    return (
        <div>
            
        </div>
    )
}


export async function getStaticProps() {
    const API_USER = 'elgabo82'
    const API_URL = `https://api.github.com/users/${API_USER}`;
    const API_ENDPOINT = `${API_URL}/repos`
    //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

    //console.log(API_ENDPOINT)
    const repos = await fetch(`${API_ENDPOINT}`)
    const json = await repos.json()
    //const numRepos = Object.keys(json).length
    
    //console.log(json)
    // const numSeguidores = Object.keys(json).length
    // const seguidores = await fetch(`${API_URL}/followers`)
    // const json2 = seguidores.json()
    // const numProyectos = Object.keys(json2).length

    // var forksContador = 0
    // json2.forEach( f => {
    //     forksContador += f.forks_count
    // })  
    //console.log(json)

    return {
        props: {
          json,
        },
      }
}
