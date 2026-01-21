import { faker } from "@faker-js/faker";
import { IConsultant } from "../../data/Model/Consultant";
import { ConsultantService } from "../../data/Enums/consultant-service.enum";
import { UserRole } from "../../data/Enums/user-role.enum";

interface IMockConsultant extends IConsultant {
  email: string;
}

const mockConsultant1: IMockConsultant = {
  givenName: faker.person.firstName(),
  familyName: faker.person.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  shortDescription: faker.lorem.sentence(),
  about: faker.lorem.paragraph(),
  services: [ConsultantService.FundingStrategy, ConsultantService.GrantWritingAndApp],
  profileImageUrl: "https://picsum.photos/100/100",
};

const mockConsultant2: IMockConsultant = {
  givenName: faker.person.firstName(),
  familyName: faker.person.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  shortDescription: faker.lorem.sentence(),
  about: faker.lorem.paragraph(),
  services: [ConsultantService.PostAwardManagement, ConsultantService.GrantReadinessAssessment],
  profileImageUrl: "https://picsum.photos/100/100",
};

export const mockConsultants: IMockConsultant[] = [mockConsultant1, mockConsultant2];
export const mockConsultantRole = UserRole.contributor;