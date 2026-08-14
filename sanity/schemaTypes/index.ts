import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {eventType} from './eventType'
import {speakerType} from './speakerType'
import {teamMemberType} from './teamMemberType'
import {contactType} from './contactType'
import {serviceType} from './servicesType'
import {siteSettingType} from './siteSettingType' 
  
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, eventType, speakerType, teamMemberType, contactType, serviceType, siteSettingType],
}

