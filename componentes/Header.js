import Link from 'next/link'

export default function Header() {
    return (
        <header>
            <div className="content">
                <div>
                    <Link href="/">
                        <h2>Portafolio</h2>
                    </Link>                    
                </div>
            </div>            
        </header>
    )
}
