import { CreateUserDTO } from "@app/useCases/CreateUser/CreateUserDTO";
import { User } from "@domain/entities/User";

export interface IUserRepository {
    findByEmail(email: string): Promise<User>;
    save(user: CreateUserDTO): Promise<void>;
}