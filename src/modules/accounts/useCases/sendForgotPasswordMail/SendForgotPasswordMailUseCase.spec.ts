import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/provider/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/provider/DateProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Frogot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("Should be able to send a forgot passowrd mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "670716",
            email: "puv@votujewo.sb",
            name: "Jennie Stanley",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("puv@votujewo.sb");
        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email is user doesn't exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("lesvar@pulej.ms")
        ).rejects.toEqual(new AppError("User doesn't exists!"));
    });
    it("should be able to create an users token", async () => {
        const generateTokenMail = spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );

        usersRepositoryInMemory.create({
            driver_license: "909582",
            email: "raab@wodis.km",
            name: "George Fowler",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("raab@wodis.km");
        expect(generateTokenMail).toBeCalled();
    });
});
