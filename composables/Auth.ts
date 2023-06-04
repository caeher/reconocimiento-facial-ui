// import { ref } from 'vue'
import { loginUserInfo } from '../types/user'

type userAuth = Partial<{
  user?: loginUserInfo,
  isAuth: boolean,
  token?: string
}>

export const useAuth = () => {
  

  const user = useState<userAuth>('user', () => {
    return {
      user: undefined,
      isAuth: false,
      token: undefined
    }
  })

  function setUser(userData: loginUserInfo, token: string) {
    user.value.user = userData
    user.value.isAuth = true
    user.value.token = token
  }
  return { user, setUser}
}
