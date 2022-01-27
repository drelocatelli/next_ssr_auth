import { useState } from "react";
import Dash from "../../components/dash";
import { getServerSideProps } from "../../contexts/PrivateRoutes";

export default function Forms() {

    const [nome, setNome] = useState('');

    const registerUser = e => {
        e.preventDefault();
        setNome(e.target.name.value);
    }

    return (
        <Dash>
          {nome}
          <br />
          <div className="max-w-sm w-full space-y-8">
            <form onSubmit={registerUser}>
              <label htmlFor="name">Name</label><br />
              <input type="text" name='name' className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" autoComplete="name" required /><br />
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
            </form>
          </div>
        </Dash>
      )

}

export {getServerSideProps}