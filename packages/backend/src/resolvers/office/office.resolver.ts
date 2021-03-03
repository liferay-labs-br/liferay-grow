import { Resolver } from 'type-graphql';

import { Office } from '../../entity/Office';
import { createBaseResolver } from '../../utils/createBaseResolver';
import Inputs from './Inputs';

const BaseResolver = createBaseResolver('Office', Office, Inputs, ['teams']);

@Resolver(Office)
export class OfficeResolver extends BaseResolver {}
