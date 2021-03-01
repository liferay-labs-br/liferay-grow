import { Resolver } from 'type-graphql';

import { Office } from '../../entity/Office';
import { createBaseResolver } from '../../utils/createBaseResolver';
import {
  CreateOfficeInput,
  FilterOfficeInput,
  UpdateOfficeInput,
} from './Inputs';

const Inputs = {
  create: CreateOfficeInput,
  filter: FilterOfficeInput,
  update: UpdateOfficeInput,
};

const BaseResolver = createBaseResolver('Office', Office, Office, Inputs, [
  'teams',
]);

@Resolver(Office)
export class OfficeResolver extends BaseResolver {}
