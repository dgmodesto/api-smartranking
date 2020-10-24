import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarJogadorDto } from '../dtos/criar-jogador.dto';
import { Jogador } from '../interfaces/jogador.interface';

@Injectable()
export class JogadoresService {

  private readonly logger = new Logger(JogadoresService.name);
  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {


  }

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    this.logger.log(`criaJogadorDto: ${JSON.stringify(criarJogadorDto)}`);

    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(`Jogador com email ${email} já tem um cadastro no sistema`);
    }

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }


  async atualizarJogador(_id: string, criarJogadorDto: CriarJogadorDto): Promise<Jogador> {

    // const jogadorEncontrado = await this.jogadores.find(x => x.email === email);
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (jogadorEncontrado) {
      return await this.jogadorModel.findOneAndUpdate(
        { _id },
        { $set: criarJogadorDto })
        .exec();
    }
  }


  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPeloId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }

    return jogadorEncontrado;
  }

  public async deletarJogador(_id: string): Promise<any> {

    return await this.jogadorModel.deleteOne({ _id }).exec();
  }
}
