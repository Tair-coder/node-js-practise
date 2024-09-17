const PORT = process.env.PORT || 4000;
const Application = require('./framework/Application')
const userRouter = require('./src/user-route')
const jsonParse = require('./framework/parseJson')
const app = new Application()
const parseUrl = require('./framework/parseUrl')

app.use(jsonParse)
app.use(parseUrl('http://localhost:5000'))
app.addRouter(userRouter)
app.listen(PORT,()=>console.log('Server started on'))