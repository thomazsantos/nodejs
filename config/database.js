import mongoose from 'mongoose'

export default function () {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
  mongoose.connect('mongodb+srv://root:root@cluster0.rdjo3.mongodb.net/myapp?retryWrites=true&w=majority', options).then(
    () => { console.log('Database connected!') },
    error => { console.log('*** Error to connect on database *** ' + error) }
  )
}
