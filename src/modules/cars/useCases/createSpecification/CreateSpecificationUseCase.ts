import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/implementations/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private SpecificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAreadyExists = await this.SpecificationsRepository.findByName(
            name
        );
        if (specificationAreadyExists) {
            throw new Error("Specification Already Exists!");
        }
        await this.SpecificationsRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };
