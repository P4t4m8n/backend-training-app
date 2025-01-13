import dotenv from "dotenv";
import fs from "fs";
import { TUserCreateDto } from "../src/types/user.type";
import {
  TTraineeCreateDto,
  TTraineeMetricsDto,
} from "../src/api/trainee/trainee.type";
import { trainingService } from "../src/api/training/training.service";
import { traineeService } from "../src/api/trainee/trainee.service";
import { authService } from "../src/api/auth/auth.service";

dotenv.config();
async function seed() {
  const trainees = loadFromJson("trainees.json");
  await seedTrainees(trainees);
}

const FIRST_NAMES = [
  "John",
  "Doe",
  "Jane",
  "Smith",
  "Alice",
  "Wonderland",
  "Bob",
  "Marley",
  "Charlie",
  "Brown",
];

const LAST_NAMES = [
  "Johnson",
  "Doe",
  "Smith",
  "Wonderland",
  "Marley",
  "Brown",
  "White",
  "Black",
  "Green",
  "Blue",
];

const RANDOM_PHONE_NUM = [
  "1234567890",
  "0987654321",
  "1111111111",
  "2222222222",
  "3333333333",
  "4444444444",
  "5555555555",
  "6666666666",
  "7777777777",
  "8888888888",
];

const TRAINER_ID = "a9fa7ea2-824f-49f4-b75a-8bcd9e33795d";

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const saveToJson = (data: any, fileName: string) => {
  fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
};

const loadFromJson = (fileName: string) => {
  const data = fs.readFileSync(fileName, "utf-8");
  return JSON.parse(data);
};

const seedTrainees = async (trainees: TTraineeCreateDto[]) => {
  console.info("Seeding trainees");
  const urls = [];
  for (const trainee of trainees) {
    const id = await traineeService.create(trainee);
    const url = await authService.createMagicLink(id);
    urls.push(url);
  }

  saveToJson(urls, "trainee-urls.json");
  console.info("Trainees seeded");
};

const createTrainees = () => {
  const trainees = [];
  for (let i = 0; i < 10; i++) {
    const userDto = createUser(
      FIRST_NAMES[i],
      LAST_NAMES[i],
      RANDOM_PHONE_NUM[i]
    );
    const metricsDto = createMetrics();

    const traineeDto: TTraineeCreateDto = {
      userDto,
      metricsDto,
      trainerId: TRAINER_ID,
    };
    trainees.push(traineeDto);
  }
  return trainees;
};

const createUser = (
  firstName: string,
  lastName: string,
  phone: string
): TUserCreateDto => {
  const email = `${firstName}@${lastName}.com`.toLowerCase();

  return {
    email,
    firstName,
    lastName,
    phone,
  };
};

const createMetrics = (): TTraineeMetricsDto => {
  return {
    weight: getRandomNumber(50, 100),
    height: getRandomNumber(150, 200),
    age: getRandomNumber(18, 60),
    heartRate: getRandomNumber(60, 100),
    bloodPressureSystole: getRandomNumber(100, 140),
    bloodPressureDiastole: getRandomNumber(60, 90),
  };
};
seed().then(() => {
  console.info("Seed complete");
  process.exit(0);
});
