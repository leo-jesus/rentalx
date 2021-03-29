import { container } from "tsyringe";

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
