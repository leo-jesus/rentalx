import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "ABC-1234",
            fine_amount: 40,
            brand: "car_brand",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "ABC-1234",
            fine_amount: 40,
            brand: "car_brand_test",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "car_brand_test",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DEF-1235",
            fine_amount: 40,
            brand: "car_brand_test",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "name",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car4",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DEF-1235",
            fine_amount: 40,
            brand: "car_brand_test",
            category_id: "12345",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "12345",
        });

        expect(cars).toEqual([car]);
    });
});
