import Link from 'next/link'
import { useState } from 'react';
import { signIn, signOut, getSession } from "next-auth/client"
//import styles from '../styles/Home.module.css'

export default function Twitter({session}) {
    //const [ session ] = useSession();
    //console.log(session)
    const [statuses, setSetstatuses] = useState();

    async function handleOnSearchSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('query');

        const results = await fetch('/api/twitter/search', {
            method: 'POST',
            body: JSON.stringify({
                query
            })
        }).then(res => res.json());

        setSetstatuses(results.data);
    }

    async function handleOnTweetSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const status = formData.get('status');

        const results = await fetch('/api/twitter/tweet', {
            method: 'POST',
            body: JSON.stringify({
                status
            })
        }).then(res => res.json());

        alert('Mensaje enviado.');
    }    
    

    return (
        <>
            <Link href='/'>
                <a className='btn'>Regresar</a>
            </Link>
        <div className='card-page'>
            <div className='card'>
                
                <div className='posts'>
                    {
                        session && <>
                        <img className='image-cropper' src={session.user.image} alt='Imagen del perfil' />
                        </>
                    }                    
                    <h3 className='post-title'>{ session ? `Bienvenido ${session.user.name} a tu perfil.` : 'Twitter.'}</h3><br/>
                    
                </div>
                <p className='post-title'>
                    {!session && <>
                        No ha iniciado sesión <br/>
                        <button className='btn' onClick={()=>signIn()}>Iniciar sesión</button>
                    </>}
                    {session && 
                    <>
                        Ha iniciado sesión como: {session.user.email} <br/>
                        <button className='btn' onClick={()=>signOut()}>Cerrar sesión</button>
                    </>}
                </p>
                <div>
                {session && <>
                    <form onSubmit={handleOnTweetSubmit}>
                    <h2>Enviar tweet:</h2>
                    <textarea name="status" />
                    <button>Enviar</button>
                    </form>
                </>}
                </div>

                {session && <>
                    <form onSubmit={handleOnSearchSubmit}>
                    <h2>Buscar tweets:</h2>
                    <input type="search" name="query" />
                    <button>Buscar</button>
                    </form>
                </>}

                {statuses && <>
                    <ul>
                        {statuses.map(({ id, text, user}) => {
                            return (
                                <li key={id}>
                                    <p>{ text }</p>
                                    <p>Por { user.name} ({user.screen_name})</p>
                                </li>
                            );
                        })}
                    </ul>
                )</>}                
            </div>
            
        </div>
        </>
    )
}

export async function getServerSideProps(context) {    
    const session = await getSession(context);
    
    return {
        props: {
            session
        }
    }
}