import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { User } from '../../entities/User';
import { IMailProvider } from '../../providers/IMailProvider';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlredyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlredyExists) {
      throw new Error('User already exists');
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'Equipe teste SOLID API',
        email: 'equipe@mail.com',
      },
      subject: 'Seja bem-vindo à plataforma',
      body: '<p>Você já pode fazer login em nossa plataforma</p>',
    });
  }
}
