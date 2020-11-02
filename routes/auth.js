import { Router } from 'express'

const authRouter = new Router()

/** For Testing Purposes: To be Removed */
authRouter.get('/users', (req, res) => {
  res.json({ user: 'John Doe' })
})

export default authRouter
