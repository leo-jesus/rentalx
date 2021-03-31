import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        // usuario existe?
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect!");
        }
        // senha está correta?
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }

        // gerar webtokem
        const token = sign({}, "629154f7128dbc61abbdf5264038e57d", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };
        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
