import { ISpecificationsRepository } from "../../repositories/implementations/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private SpecificationsRepository: ISpecificationsRepository) {}

    execute({ name, description }: IRequest): void {
        const specificationAreadyExists = this.SpecificationsRepository.findByName(
            name
        );
        if (specificationAreadyExists) {
            throw new Error("Specification Already Exists!");
        }
        this.SpecificationsRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };
