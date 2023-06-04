import { User } from '~/server/models';
import { faker } from '@faker-js/faker';
import { IUser } from '~/types/user';
import { paginate } from '~/server/utils/pagination';
import { Op } from 'sequelize';

export default defineEventHandler(async (event) => {
  // const users: IUser[] = [...Array(5)].map(() => ({
  //   fullname: faker.name.firstName(),
  //   birthdate: faker.date.past(),
  //   email: faker.internet.email(),
  //   password: "password"
  // }))
  // await User.bulkCreate(users, { individualHooks: true });
  // return users;
  const query = getQuery(event);
  const { q, page, limit, order_by, order_direction } = query;
  let search: any = {};
  let order: any = [];
  if (q) {
    search = {
      where: {
        [Op.or]: [
          // { first_name: { [Op.like]: `%${q}%` } },
          // { second_name: { [Op.like]: `%${q}%` } },
          // { third_name: { [Op.like]: `%${q}%` } },
          // { fourth_name: { [Op.like]: `%${q}%` } },
          // { first_lastname: { [Op.like]: `%${q}%` } },
          // { second_lastname: { [Op.like]: `%${q}%` } },
          // { third_lastname: { [Op.like]: `%${q}%` } },
          // { fourth_lastname: { [Op.like]: `%${q}%` } },
          { email: { [Op.like]: `%${q}%` } },
          // { driverlicense: { [Op.like]: `%${q}%` } },
          // { affiliationstate: { [Op.like]: `%${q}%` } },
          // { affiliationtype: { [Op.like]: `%${q}%` } },
        ]
      }
    }
  }

  if (order_by && order_direction) {
    order = [[order_by, order_direction]];
  }

  const transform = (users: { dataValues: IUser[] }[]) => {
    return users.map((user) => {
      console.log(user);
      return {
        ...user.dataValues,
      }
    })
  }

  const attrributes = {
    // exclude: [],
    include: [
      'fullname',
      'birthdate',
      'email',
    ]
  }
  search.attributes = attrributes;

  const users = await paginate(User, page, limit, search, order, transform)
  return { ...users }

});