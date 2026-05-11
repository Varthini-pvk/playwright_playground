import { faker } from '@faker-js/faker';

export function buildUser() {
  const unique = `${Date.now()}_${faker.string.alphanumeric(5)}`;

  return {
    name: faker.person.fullName(),
    email: `user_${unique}@mail.com`,
    password: faker.internet.password({ length: 10 }),
    skills: faker.helpers.arrayElements(
        [
          'Playwright',
          'TypeScript',
          'API Testing',
          'Docker',
          'CI/CD',
          'NodeJS'
        ],
        3),
    details: {
    experience: faker.number.int({
        min: 0,
        max: 20
      }),  
      job:faker.person.jobTitle()
    }
  };
}