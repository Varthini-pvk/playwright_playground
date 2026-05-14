import { faker } from '@faker-js/faker';
import {User} from "../../models/users.js"
class BaseDataBuilder{

 // -------------------------
    // Granular Helper Methods
    // -------------------------

    static generateName() {

        return faker.person.fullName();
    }

    static generateEmail() {

        const unique =
         `${Date.now()}_${
            faker.string.alphanumeric(5)
         }`;

        return `user_${unique}@mail.com`;
    }

    static generatePassword() {

        return faker.internet.password({
            length: 10
        });
    }

    static generateSkills() {

        return faker.helpers.arrayElements(
            [
                'Playwright',
                'TypeScript',
                'API Testing',
                'Docker',
                'CI/CD',
                'NodeJS'
            ],
            3
        );
    }

    static generateExperience() {

        return faker.number.int({
            min: 0,
            max: 20
        });
    }

    static generateJob() {

        return faker.person.jobTitle();
    }
  }

export function buildUser():User {
  
        return {

            first_name:
             BaseDataBuilder.generateName(),

            email:
             BaseDataBuilder.generateEmail(),

            password:
             BaseDataBuilder.generatePassword(),

            skills:
             BaseDataBuilder.generateSkills(),

            details: {

                experience:
                 BaseDataBuilder.generateExperience(),

                job:
                 BaseDataBuilder.generateJob()
            },

            role: "viewer",

            active: true,

            country: "India"
        };
}