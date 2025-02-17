export const getFooterGQL = `
  query GetFooterData($footerItemId: String!, $lang: String!, $findAnAgentFormId: String!) {
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
    item(path: $footerItemId, language: $lang) {
      id
      name
      ... on Footer {
        ... on _Image {
          image {
            jsonValue
          }
        }
        phoneNo {
          href: url
          text
          target
          anchor
          queryString
          linkType
          className
        }
        email {
          href: url
          text
          target
          anchor
          queryString
          linkType
          className
        }
        legalDisclaimer {
          jsonValue
        }
        footerNavigationGroups {
          targetItems {
            id
            name
            children {
              results {
                id
                name
                ... on Link {
                  linkField: link {
                    href: url
                    text
                    target
                    anchor
                    queryString
                    linkType
                    className
                    # Other fields can be added if they exist in your GraphQL schema
                  }
                }
              }
            }
          }
        }
        footerRelevantLinks {
          targetItems {
            id
            name
            ... on Link {
              linkField: link {
                href: url
                text
                target
                anchor
                queryString
                linkType
                className
                # Other fields can be added if they exist in your GraphQL schema
              }
            }
          }
        }
        footerSocialMediaLinks {
          targetItems {
            id
            name
            ... on _Image {
              image {
                jsonValue
              }
            }
            ... on _Link {
              link {
                href: url
                text
                target
                anchor
                queryString
                linkType
                className
                # Other fields can be added if they exist in your GraphQL schema
              }
            }
          }
        }
        footerRelevantTexts {
          targetItems {
            id
            name
            ... on FooterRelevantText {
              title: field(name: "Title") {
                value
              }
            }
          }
        }
        addresses {
          targetItems {
            id
            name
            ... on _Address {
              addressTitle {
                value
              }
              addressLine1 {
                value
              }
              addressLine2 {
                value
              }
              city {
                value
              }
              stateOrProvince {
                value
              }
              country {
                value
              }
              postalCode {
                value
              }
              mapsLink {
                url
                text
                target
                anchor
                queryString
                linkType
                className
                # Other fields can be added if they exist in your GraphQL schema
              }
            }
          }
        }
      }
    }
  }
`;
