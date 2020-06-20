/*
  Wrapper around axios to include Rails CSRF token
 */

import axios from 'axios'

const token = document.querySelector('[name="csrf-token"]') || {content: 'no-csrf-token'}
const ax = axios.create({
  headers: {
    common: {
      'X-CSRF-Token': token.content,
      'X-Requested-With': 'XMLHttpRequest',
    }
  }
})

export default ax;
