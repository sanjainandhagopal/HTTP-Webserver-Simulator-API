const whitelist = [
    'https://www.google.com', 
    'http://127.0.0.1:5500', 
    'http://localhost:3500'
]
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Note allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}