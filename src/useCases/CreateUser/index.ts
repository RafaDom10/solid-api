import { MailtrapMailProvider } from '../../providers/implementations/MailtrapMailProvider';
import { PostgresUsersRepository } from '../../repositories/implementations/PostgresUsersRepository';
import { CreateUserControler } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const mailtrapMailProvider = new MailtrapMailProvider();
const postgresUsersRepository = new PostgresUsersRepository();

const createUserUseCase = new CreateUserUseCase(
  postgresUsersRepository,
  mailtrapMailProvider,
);

const createUserController = new CreateUserControler(createUserUseCase);

export { createUserUseCase, createUserController };
