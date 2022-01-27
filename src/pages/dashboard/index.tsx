import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Dash from '../../components/dash'
import { useRouter } from 'next/router'
import { getServerSideProps } from '../../contexts/PrivateRoutes'
import Link from 'next/link';
import { BearCounter, DecreaseBears, IncreaseBears } from '../../states/bearsState'
import Spacing from '../../components/spacing'

const navigation = ['Dashboard', 'Team', 'Projects', 'Calendar', 'Reports']
const profile = ['Your Profile', 'Settings']

export default function Dashboard() {

  const { user, setUser } = useContext(AuthContext);
  const useRoute = useRouter();


  return (
    <Dash>
      {BearCounter()} bears around the world...
      <br /><br />
      {IncreaseBears()} <Spacing /> {DecreaseBears()}
    </Dash>
  )
}

export {getServerSideProps}