const app = require('./app')

// listening port
const PORT=process.env.PORT||8080;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});

module.exports = app;