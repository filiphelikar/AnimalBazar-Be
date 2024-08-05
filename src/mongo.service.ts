// src/mongo/abstract-mongo.service.ts
import {Injectable} from '@nestjs/common';
import mongoose, {Model, Connection, FilterQuery} from 'mongoose';

@Injectable()
export abstract class AbstractMongoService<T> {
  protected connection: Connection;
  protected model: Model<T>;

  constructor(
    private readonly collectionName: string,
    private readonly schema: mongoose.Schema,
  ) {
    this.initialize();
  }

  private async initialize() {
    await this.connect();
    this.model = this.connection.model<T>(this.collectionName, this.schema);
  }

  private async connect() {
    if (!this.connection) {
      try {
        this.connection = await mongoose.createConnection('mongodb://localhost:27017/bazosDB');
        console.log(this.connection);
      } catch (error) {
        console.error('Error connecting to MongoDB', error);
      }
    }
  }

  async createOne(document: Partial<T>): Promise<T> {
    const createdDocument = new this.model(document);
    return createdDocument.save() as any;
  }

  async findOne(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findByQuery(query: FilterQuery<T>): Promise<T[]> {
    return this.model.find(query).exec();
  }

  async deleteOne(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
