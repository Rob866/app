import Api from '@/services/Api'

export default {
  index (params) {
    console.log('send get request')
    return Api().get('user/songs')
  }
}
