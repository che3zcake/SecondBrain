import {Router} from 'express'
import userRouter from './user'
import contentRouter from "./content";
import shareRouter from "./share";
import metaRouter from "./meta_data";

const routes = Router()

routes.use('/user', userRouter)
routes.use('/content', contentRouter)
routes.use('/brain', shareRouter)
routes.use('/meta', metaRouter)

export default routes
