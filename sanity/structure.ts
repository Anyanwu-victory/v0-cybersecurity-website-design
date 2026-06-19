import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('speaker').title('Speakers'),
      S.documentTypeListItem('teamMember').title('Team Members'),
      S.documentTypeListItem('event').title('Events'),
      S.documentTypeListItem('contact').title('Contact Info'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['category', 'speaker', 'teamMember', 'event', 'contact'].includes(item.getId()!),
      ),
    ])
