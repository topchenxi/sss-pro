import { getCache } from './tool'
export const auth = {
  loggedIn () {
    const currentUser = getCache({ key: 'currentUser' })
    if (currentUser) {
      return true
    } else {
      return false
    }
  },
  loggedOut () {
    console.log('out')
  }
}
