import { Auth } from '../components/index.js'
import { useLocation } from 'react-router-dom'

const AuthPage = () => {

  const { state } = useLocation()

  return (
    <div>
      <Auth authState={state}/>
    </div>
  )
}

export default AuthPage