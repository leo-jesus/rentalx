import { ICategoryRepository } from "../../repositories/implementations/ICategoryRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoryRepository) {}

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
