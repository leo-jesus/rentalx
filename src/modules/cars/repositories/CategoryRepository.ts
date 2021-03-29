import { getRepository, Repository } from "typeorm";

import { Category } from "../entities/Category";
import {
    ICategoryRepository,
    ICreateCategoryDTO,
} from "./implementations/ICategoryRepository";

class CategoriesRepository implements ICategoryRepository {
    private categories: Category[];
    private repository: Repository<Category>;

    private static INSTANCE: CategoriesRepository;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });
        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;
    }
}

export { CategoriesRepository };
