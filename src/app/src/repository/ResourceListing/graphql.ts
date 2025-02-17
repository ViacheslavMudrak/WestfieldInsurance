const ResourceDetailTemplate = '867610EA-18EF-4564-8CF8-37FE4A186A50';
export const getResourceDetailListingGraphQL = /* GraphQL */ `
  query GetResourceListing($siteRootId: String!, $pageSize: Int = 20, $after: String) {
    search(
      where: {
        AND: [
          { name: "_templates", value: "${ResourceDetailTemplate}", operator: CONTAINS }
          { name: "_path", value: $siteRootId, operator: CONTAINS }
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
        ... on ResourceDetailPage {
          title: field(name: "Title") {
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
