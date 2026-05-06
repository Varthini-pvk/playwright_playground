import { faker } from '@faker-js/faker';

export function buildUser() {
  const unique = `${Date.now()}_${faker.string.alphanumeric(5)}`;

  return {
    name: faker.person.fullName(),
    email: `user_${unique}@mail.com`,
    password: faker.internet.password({ length: 10 })
  };
}