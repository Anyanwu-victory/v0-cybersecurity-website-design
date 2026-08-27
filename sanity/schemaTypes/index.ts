import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {eventType} from './eventType'
import {speakerType} from './speakerType'
import {teamMemberType} from './teamMemberType'
import {contactType} from './contactType'
import {serviceType} from './servicesType'
import {siteSettingType} from './siteSettingType' 
import {articleType} from './articleType'
  
export const schema: { types: SchemaTypeDefinition[] } = {
  // Register articles alongside the existing application document types.
  types: [blockContentType, eventType, speakerType, teamMemberType, contactType, serviceType, siteSettingType, articleType],
}

