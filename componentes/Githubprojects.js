import Link from 'next/link'

export default function Githubprojects({repo}) {

    return (        
        <div className='card'>
            {/* <img src={repo.frontmatter.cover_image} alt='' />     */}

            <div className='post-date'> Fecha de creación: {repo.created_at}</div>
            <h3>Repositorio: {repo.full_name}</h3>
            <p>{repo.html_url}</p>
            <p>{repo.git_url}</p>
            <Link href={`${repo.html_url}`}>
                <a className='btn'>Enlace</a>
            </Link>
            <p>Visibilidad: {repo.visibility}</p>
        </div>
    )
}




