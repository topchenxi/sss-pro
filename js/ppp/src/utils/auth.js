import getCache from '@/utils/getCache'

class Auth {
  loggedIn() {
    const currentUser = getCache({
      key: 'currentUser'
    })
    if (currentUser) {
      return true
    } else {
      return false
    }
  }
}
export default new Auth()
