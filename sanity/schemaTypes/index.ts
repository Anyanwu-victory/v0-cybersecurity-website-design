import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {eventType} from './eventType'
import {speakerType} from './speakerType'
import {teamMemberType} from './teamMemberType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, eventType, speakerType, teamMemberType],
}
