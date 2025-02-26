import { faker } from "@faker-js/faker";
import { User } from "../models/user.js";

const createUser = async (numUser) => {
  try {
    const usersPromise = [];

    for (let i = 0; i < numUser; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.person.lastName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });

      console.log("Users Created", numUser);
      usersPromise.push(tempUser);
      process.exit(1);
    }
    await Promise.all(usersPromise);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export {
  createUser
};

