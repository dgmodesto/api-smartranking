import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasController } from './controllers/categorias.controller';
import { CategoriaSchema } from './interfaces/categoria.schema';
import { CategoriasService } from './services/categorias.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }])],
  controllers: [CategoriasController],
  providers: [CategoriasService]
})
export class CategoriasModule { }
