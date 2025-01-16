import prisma from "../../../prisma/prisma";
import { AppError } from "../../services/Error.service";
import { TTrainee, TTraineeCreateDto, TTraineeFilter } from "./trainee.type";

const TRAINEE_SMALL_SELECT = {
  id: true,
  trainer: {
    select: {
      id: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
    },
  },
  user: {
    select: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  },
  metrics: true,
};

const TRAINEE_FULL_SELECT = {
  id: true,
  programs: {},
  trainings: true,
  trainer: {
    select: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  },
  metrics: true,
  user: {
    select: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  },
};
async function create(traineeDto: TTraineeCreateDto): Promise<string> {
  const { userDto, metricsDto, trainerId } = traineeDto;
  try {
    const { id } = await prisma.user.create({
      data: {
        ...userDto,
        trainee: {
          create: {
            trainerId,
            metrics: {
              create: {
                ...metricsDto,
              },
            },
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (!id) {
      throw AppError.create("Error creating user in DB", 500);
    }

    return id;
  } catch (error) {
    throw error;
  }
}
async function list(filter: TTraineeFilter): Promise<TTrainee[]> {
  const { firstName, lastName, email, skip, take } = filter;
  const trainees = await prisma.trainee.findMany({
    where: {
      user: {
        firstName: {
          contains: firstName,
        },
        lastName: {
          contains: lastName,
        },
        email: {
          contains: email,
        },
      },
    },
    select: { ...TRAINEE_SMALL_SELECT },
    skip: skip || 0,
    take: take || 10,
  });

  return trainees;
}
async function get(id: string): Promise<TTrainee> {
  const trainee = await prisma.trainee.findUniqueOrThrow({
    where: {
      id: id,
    },
    select: { ...TRAINEE_FULL_SELECT },
  });

  return trainee as unknown as TTrainee;
}

export const traineeService = {
  create,
  list,
  get,
};
