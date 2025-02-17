const MediaPDFTemplate = '0603F166-35B8-469F-8123-E8D87BEDC171';
export const getCustomSiteMapPDFGraphQL = /* GraphQL */ `
  query GetPDFSiteMap($pdfFolderItemId: String!, $pageSize: Int = 20, $after: String) {
    search(
      where: {
        AND: [
          { name: "_templates", value: "${MediaPDFTemplate}", operator: CONTAINS }
          { name: "_path", value: $pdfFolderItemId, operator: CONTAINS }
        ]
      }
      first: $pageSize
      after: $after
    ) {
      pageInfo {
        endCursor
        hasNext
      }
      results {
        ... on Item {
          title: field(name: "Title") {
            value
          }
          keywords: field(name: "Keywords") {
            value
          }
          description: field(name: "Description") {
            value
          }
          url {
            url
          }
        }
      }
    }
  }
`;
