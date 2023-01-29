// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type User = {
  id: number;
  name: string;
  dirthDate: string;
  email: string;
};

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    dirthDate: "1990-01-01",
    email: "johndoe@example.com",
  },
  {
    id: 2,
    name: "Sally Doe",
    dirthDate: "1991-01-01",
    email: "sallydoe@sample.com",
  },
  {
    id: 3,
    name: "Doe Mary",
    dirthDate: "1992-01-01",
    email: "doejohn@sample.com",
  },
  {
    id: 4,
    name: "Sam Park",
    dirthDate: "1993-01-01",
    email: "sam@sample.com",
  },
  {
    id: 5,
    name: "Scott Lee",
    dirthDate: "1994-01-01",
    email: "scottlee@sample.com",
  },
];

function findUserById(id: number) {
  return users.find((user) => user.id === id);
}

function findUserByEmail(email: string) {
  return users.find((user) => user.email === email);
}

function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function findUserByName(name: string) {
  return users.filter((user) => user.name.includes(name));
}

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
