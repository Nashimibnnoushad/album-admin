
var url ="";
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = 'http://ec2-44-207-226-125.compute-1.amazonaws.com:8008/'
    // url = 'http://camrin.in:8801/'
  } else {
    url = 'http://ec2-44-207-226-125.compute-1.amazonaws.com:8008/'
    // url = 'http://camrin.in:8801/'
  } 

export const BACKEND_URL = url 
