/* global localStorage */

import axios from 'axios'

// const API_URL = process.env.API_URL || 'http://api.egc.fi'
function token () {
  if (localStorage.token) {
    return 'Bearer ' + localStorage.token
  }
  return ''
}
export default axios.create({
  baseURL: 'http://api.egc.fi', //http://api.egc.fi
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token()
  }
})
