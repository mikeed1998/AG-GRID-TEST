import { createContainer, asClass } from 'awilix';
import { DataService } from '../services/data.service';
import { DatabaseService } from '../services/database.service';

export const configureContainer = () => {
  const container = createContainer();

  container.register({
    dataService: asClass(DataService).singleton(),
    databaseService: asClass(DatabaseService).singleton()
  });

  return container;
};