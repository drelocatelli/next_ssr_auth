import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { GetServerSideProps } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { GetUserLoggedIn } from '../services/auth'
import Dash from '../components/dash'
import { useRouter } from 'next/router'

const navigation = ['Dashboard', 'Team', 'Projects', 'Calendar', 'Reports']
const profile = ['Your Profile', 'Settings']

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {

  const { user, setUser } = useContext(AuthContext);
  const useRoute = useRouter();

  const registerUser = e => {
    e.preventDefault();
    let data = e.target;

    console.log(data.name.value)
  }

  return (
    <Dash>
      <div className="max-w-sm w-full space-y-8">
        <form onSubmit={registerUser}>
          <label htmlFor="name">Name</label><br />
          <input type="text" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" autoComplete="name" required /><br />
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
        </form>
      </div>
    </Dash>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { ['nextauth.token']: token } = parseCookies(ctx);

  //! retrieve token
  let retrieveUser = await GetUserLoggedIn(token);

  if (retrieveUser.status >= 200 && retrieveUser.status <= 226)
    return {
      props: {}
    }

  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }

}