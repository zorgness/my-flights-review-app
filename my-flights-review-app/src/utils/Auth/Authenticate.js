import axios from 'axios'

const Authenticate = async () => {
  let auth = { isAuth: false, email: '' }
  await axios.get('http://127.0.0.1:3000/api/v1/auth/me', { withCredentials: false })
  .then( resp => {
    auth = { isAuth: resp.data.logged_in, email: resp.data.email }
    console.log(auth)
    return auth
  })
  .catch( err => console.log(err) )

  return auth
}

export default Authenticate