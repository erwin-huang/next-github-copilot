// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * User dummy data
 */
const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    birthDate: "1990-01-01",
    email: "johndoe@example.com",
  },
  {
    id: 2,
    name: "Sally Doe",
    birthDate: "1991-01-01",
    email: "sallydoe@sample.com",
  },
  {
    id: 3,
    name: "Doe Mary",
    birthDate: "1992-01-01",
    email: "doejohn@sample.com",
  },
  {
    id: 4,
    name: "Sam Park",
    birthDate: "1993-01-01",
    email: "sam@sample.com",
  },
  {
    id: 5,
    name: "Scott Lee",
    birthDate: "1994-01-01",
    email: "scottlee@sample.com",
  },
];

/**
 * Method to find user by id
 * @param id 
 * @returns 
 */
function findUserById(id: number) {
  return users.find((user) => user.id === id);
}

/**
 * Find user by email
 * @param email email address
 * @returns User
 */
function findUserByEmail(email: string) {
  return users.find((user) => user.email === email);
}

/**
 * Validate email address
 * @param email email address
 * @returns User
 */
function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Find users by name
 * @param name Name of the user
 * @returns Array of users
 */
function findUserByName(name: string) {
  return users.filter((user) => user.name.includes(name));
}

/**
 * Handler for users
 * @param req Request
 * @param res Response
 * @returns array of users or user by id or email or name
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (req.query.id) {
      const user = findUserById(Number(req.query.id));
      if (!user) {
        return res.status(404).end();
      }
      return res.status(200).json(user);
    }

    if (req.query.email) {
      if (validateEmail(req.query.email as string) === false) {
        return res.status(400).end();
      }
      const user = findUserByEmail(req.query.email as string);
      if (!user) {
        return res.status(404).end();
      }
      return res.status(200).json(user);
    }

    if (req.query.name) {
      const user = findUserByName(req.query.name as string);
      if (!user) {
        return res.status(404).end();
      }

      return res.status(200).json(user);
    }   

    return res.status(200).json(users);
  }
  return res.status(405).end();
}
