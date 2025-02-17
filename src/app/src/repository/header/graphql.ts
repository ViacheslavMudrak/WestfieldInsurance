import { repositoryConstants } from '../constants';

export const getHeaderGQL = `
query GetHeader($headerItemId: String!, $lang: String!) {
  header: item(path: $headerItemId, language: $lang) {
    name
   ... on Header {
      image {
        jsonValue
      }
      utilityLinks {
        targetItem {
          hasChildren
          links: children(includeTemplateIDs: ["${repositoryConstants.header.utilityLinkTemplateId}"]) {
            results {
              ... on UtilityLink {
                isLogin {
                  jsonValue
                }
                link {
                  jsonValue
                }
              }
            }
          }
        }
      }
    }
    mainNavigationItems: children(includeTemplateIDs: ["${repositoryConstants.header.mainNavigationTemplateId}"]) {
      results {
        ... on MainNavigation {
          id
          title: field(name: "Title") {
            value
          }
          link {
            jsonValue
          }
          featuredHeaderCard {
            targetItem {
              ... on FeaturedHeaderCard {
                title: field(name: "Title") {
                  jsonValue
                }
                image {
                  jsonValue
                }
                copy {
                  jsonValue
                }
                link {
                  jsonValue
                }
              }
            }
          }
        }
        subNavs: children(includeTemplateIDs: ["${repositoryConstants.header.subNavigationTemplateId}"]) {
          results {
            ... on SubNavigation {
              id
              title: field(name: "Title") {
                value
              }
              link: field(name: "Link") { 
                jsonValue 
              }
              stack: field(name: "Stack") {
                value
              }
            }
            links: children(first: 20, includeTemplateIDs: ["${repositoryConstants.header.linkTemplateId}"]) {
              results {
                ... on Link_e24e0789a05848bfabb6c69c0e60b6b7 {
                  id
                  link {
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
}
`;
