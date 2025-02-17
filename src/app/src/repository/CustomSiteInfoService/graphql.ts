const headlessSiteGroupingTemplate = 'E46F3AF2-39FA-4866-A157-7017C4B2A40C';
const sitecoreContentRootItem = '0DE95AE4-41AB-4D01-9EB0-67441B7C2450';
export const getCustomSiteInfoGraphQL = /* GraphQL */ `
  query {
    search(
      where: {
        AND: [
          { name: "_templates", value: "${headlessSiteGroupingTemplate}", operator: CONTAINS }
          { name: "_path", value: "${sitecoreContentRootItem}", operator: CONTAINS }
        ]
      }
    ) {
      results {
        ... on Item {
          name: field(name: "SiteName") {
            value
          }
          otherProperties: field(name: "OtherProperties") {
            value
          }
        }
      }
    }
  }
`;
