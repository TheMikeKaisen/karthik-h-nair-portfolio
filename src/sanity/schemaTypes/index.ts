import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './project'
import { activityType } from './activity'
import { categoryType } from './category'
import { devLogType } from './devLogs'
import { articleType } from './article'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, activityType, categoryType, devLogType, articleType],
}
