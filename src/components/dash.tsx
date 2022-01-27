import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import Link from "next/link";
import Spacing from "./spacing";

export default function Dash({ children }) {

    const { user, setUser } = useContext(AuthContext);
    const router = useRouter();

    function signOut() {
        console.log('sign out')
        setUser(null);
        destroyCookie(null, 'nextauth.token');
        router.reload();
    }

    return (
        <div>

            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900" style={{ float: 'left' }}>Dashboard</h1>
                    <div style={{ float: 'right' }}>
                        <a href='javascript:void(0);' className='bg-yellow-300' onClick={() => signOut()}>Logout</a>
                    </div>

                    <div style={{ clear: 'both' }}></div>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Replace with your content */}
                    <div className="px-4 py-6 sm:px-0">
                        <Link href='/dashboard'><a href="" onClick={(e) => e.stopPropagation()}>Dashboard</a></Link>
                        <Spacing />
                        <Link href='/dashboard/forms'><a href="" onClick={(e) => e.stopPropagation()}>Forms</a></Link>
                        <br /><br />
                        <hr />
                        <br /><br />
                        {children}
                    </div>
                    {/* /End replace */}
                </div>
            </main>
        </div>
    );
}