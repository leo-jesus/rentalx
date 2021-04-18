import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsUserUseCase } from "./ListRentalsUserUseCase";

class ListRentalsUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const listRentalUserUseCase = container.resolve(ListRentalsUserUseCase);
        const rentals = await listRentalUserUseCase.execute(id);

        return response.json(rentals);
    }
}

export { ListRentalsUserController };
