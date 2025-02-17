export const getLeadershipListingGQL = `
query GetLeadershipListing($siteItemId: String!, $pageSize: Int = 20, $after: String, $lang: String!) {
  search(
    where: {
      AND: [
        { name: "_templates", value: "{87F7E155-87F0-4FF1-A78A-1DEA93BADA86}", operator: CONTAINS }
        { name: "_path", value: $siteItemId, operator: CONTAINS}
        { name: "_language", value: $lang, operator: EQ}
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
      sortorder: field(name: "__Sortorder") {
        value
      }
      ... on LeadershipBioPage {
        url {
          path
        }
        title: field(name: "Title") {
          jsonValue
        }
        image {
          jsonValue
        }
        label {
          jsonValue
        }
      }
    }
  }
}
`;
