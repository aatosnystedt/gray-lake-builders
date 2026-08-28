/* Home Page is a singleton: one document, id `homePage`, opened directly from
   the sidebar instead of through a list. Everything else falls through to the
   default list behaviour as more types get modelled. */

const SINGLETONS = ['homePage'];

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId())
      ),
    ]);
