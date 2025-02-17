export const interiorHeroBannerGql = `
query GetInteriorHeroBanner($lang: String!, $findAnAgentFormId: String!) {
    findAnAgentForm: item(path: $findAnAgentFormId, language: $lang) {
        ... on FindAnAgent {
          id
          title: field(name: "Title") {
            jsonValue
          }
          link {
            jsonValue
          }
          insuranceTypes {
            targetItem {
              children {
                results {
                   ... on InsuranceType {
                    insuranceType {
                      jsonValue
                    }
                    insuranceValue {
                      jsonValue
                    }
                  }
                }
              }                 
            }
          }
        }
    }
}
`;
