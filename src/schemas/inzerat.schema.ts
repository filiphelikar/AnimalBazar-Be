// src/inzerat/schemas/inzerat.schema.ts
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Druhy} from 'src/druhy';

export type InzeratDocument = Inzerat & Document;

@Schema()
export class Inzerat {
  @Prop({required: true})
  nazev: string;

  @Prop({required: true})
  prodejce: string;

  @Prop({required: true})
  telefon: string;

  @Prop({required: true})
  email: string;

  @Prop()
  popis: string;

  @Prop({required: true})
  cena: string | 'Za odvoz';

  @Prop({required: true})
  druh: Druhy;

  @Prop([String])
  images: string[];

  @Prop({required: true})
  lokalita: string;

  @Prop({required: true})
  psc: string;

  @Prop({required: true})
  heslo: string;
}

export const InzeratSchema = SchemaFactory.createForClass(Inzerat);
