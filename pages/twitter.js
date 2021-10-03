import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/client"
//import styles from '../styles/Home.module.css'

export default function twitter() {
    const [ session ] = useSession();
    //console.log(session)
    
    return (
        <>
            <Link href='/'>
                <a className='btn'>Regresar</a>
            </Link>
        <div className='card-page'>
            <div className='card'>
                <div className='posts'>
                    <h3 className='post-title'>Bienvenido { session ? session.user.name + ' tu perfil' : ' al post de Twitter'}</h3>
                </div>
            <p>
                {!session && <>
                    No ha iniciado sesión <br/>
                    <button onClick={()=>signIn()}>Iniciar sesión</button>
                </>}
                {session && 
                <>
                    Ha iniciado sesión como {session.user.email} <br/>
                    <button onClick={()=>signOut()}>Cerrar sesión</button>
                </>}
            </p>
            </div>

        </div>
        </>
    )
}
