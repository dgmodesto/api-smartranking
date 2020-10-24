import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';
import { JogadoresService } from './services/jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {



  /**
  * 
  */
  constructor(private readonly jogadoresService: JogadoresService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarJogador(criarJogadorDto);
  }


  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async AtualizarJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string): Promise<void> {
    await this.jogadoresService.atualizarJogador(_id, criarJogadorDto);
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPeloId(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
  ): Promise<Jogador> {
    return await this.jogadoresService.consultarJogadorPeloId(_id);
  }

  @Delete('/:_id')
  async deletarJogador(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string
  ): Promise<void> {
    return await this.jogadoresService.deletarJogador(_id);
  }

}
