import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './project'
import { activityType } from './activity'
import { categoryType } from './category'
import { devLogType } from './devLogs'
import { articleType } from './article'
import experience from './experience'
import education from './education'
import skill from './skill'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, activityType, categoryType, devLogType, articleType, experience, education, skill],
}
