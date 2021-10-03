import Link from 'next/link'
import { signIn, signOut, useSession, getSession } from "next-auth/client"
//import styles from '../styles/Home.module.css'

export default function twitter({session}) {
    //const [ session ] = useSession();
    //console.log(session)
    
    return (
        <>
            <Link href='/'>
                <a className='btn'>Regresar</a>
            </Link>
        <div className='card-page'>
            <div className='card'>
                <div className='posts'>
                    <h3 className='post-title'>{ session ? `Bienvenido ${session.user.name} a tu perfil.` : 'Twitter.'}</h3>
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
            </div>

        </div>
        </>
    )
}

export async function getServerSideProps(context) {    
    const session = await getSession(context);
    
    return {
        props: {
            session,
        }
    }
}