const config={
    production :{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI,
        
    },
    default : {
        SECRET: 'root',
        DATABASE: 'mongodb+srv://root:root@cluster0.rdjo3.mongodb.net/myapp?retryWrites=true&w=majority',
        
    }
}


exports.get = function get(env){
    return config[env] || config.default
}