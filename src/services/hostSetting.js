
var url ="";
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = 'http://44.207.226.125:5000/'
    // url = 'http://camrin.in:8801/'
  } else {
    url = 'http://44.207.226.125:5000/'
    // url = 'http://camrin.in:8801/'
  } 

export const BACKEND_URL = url 
