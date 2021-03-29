import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "../../repositories/implementations/ICategoryRepository";

interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoryRepository
    ) {}

    async execute({ description, name }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(
            name
        );

        if (categoryAlreadyExists) {
            throw new Error("Category Already Exists!");
        }
        this.categoriesRepository.create({ name, description });
    }
}
export { CreateCategoryUseCase };
