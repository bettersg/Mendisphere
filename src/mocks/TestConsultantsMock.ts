import { faker } from "@faker-js/faker";
import { IConsultant } from "../data/Model/Consultant";
import { ConsultantService } from "../data/Enums/consultant-service.enum";


const testConsultant1: IConsultant = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  shortDescription: faker.lorem.sentence(),
  about: faker.lorem.paragraph(),
  services: [ConsultantService.FundingStrategy, ConsultantService.GrantWritingAndApp],
  profileImageUrl: "https://picsum.photos/100/100",
}

const testConsultant2: IConsultant = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    shortDescription: faker.lorem.sentence(),
    about: faker.lorem.paragraph(),
    services: [ConsultantService.PostAwardManagement, ConsultantService.GrantReadinessAssessment],
    profileImageUrl: "https://picsum.photos/100/100",
  }

export const testConsultants : IConsultant[] = [testConsultant1, testConsultant2];