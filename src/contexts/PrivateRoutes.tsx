import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { GetUserLoggedIn } from "../services/auth";

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