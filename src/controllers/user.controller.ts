import { Request, Response } from 'express'

const GetAllUsers = (req: Request, res: Response): void => {
  let users = ['Goon', 'Tsuki', 'Joe']
  res.status(200).json(users)
}

export default GetAllUsers
