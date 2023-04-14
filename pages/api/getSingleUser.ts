// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
type Data = {
  text: string;
};
type ListOfUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: [Object];
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id: number = Number(req.query.id);
  if (isNaN(id)) {
    throw new Error("id값이 number가 아닙니다.");
  }

  const listOfUsers = (
    await axios.get("https://jsonplaceholder.typicode.com/users")
  ).data;
  const singleUser = listOfUsers.filter((item: ListOfUser) => item.id == id);

  // return res.json(singleUser[0]);
  return res.send({text: 'ok'});
}
