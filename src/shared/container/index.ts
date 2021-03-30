import { container } from "tsyringe";

import { UsersRepository } from "../../modules/accounts/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/CategoryRepository";
import { ICategoryRepository } from "../../modules/cars/repositories/implementations/ICategoryRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/implementations/ISpecificationsRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/SpecificationsRepository";

container.registerSingleton<ICategoryRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
);
