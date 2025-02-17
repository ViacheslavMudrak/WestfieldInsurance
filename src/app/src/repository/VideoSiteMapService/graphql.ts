const MediaVideoTemplate = '577C3909-F573-4414-AA1B-0000F734F2C6';
export const getCustomSiteMapVideoGraphQL = /* GraphQL */ `
  query GetVideoSiteMap($siteRootId: String!, $pageSize: Int = 20, $after: String) {
    search(
      where: {
        AND: [
          { name: "_templates", value: "${MediaVideoTemplate}", operator: CONTAINS }
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
        ... on EmbeddedVideo {
          title: field(name: "Title") {
            value
          }
          videoCaption: field(name: "VideoCaption") {
            value
          }
          link: field(name: "Link") {
            jsonValue
          }
          richTextCopy: field(name: "RichTextCopy") {
            value
          }
          sxaTags: field(name: "SxaTags") {
            jsonValue
          }
          videoThumbnail: field(name: "ThumbnailImage" ){
             ...on ImageField{src} 
             }
          videoDescription: field(name: "VideoDescription" ) {
             value
            }
          transcriptLink: field(name: "TranscriptLink") {
              jsonValue
          }
          excludeFromSearch: field(name: "ExcludeFromSearch") {
            ...on CheckboxField {boolValue}
            }
        }
      }
    }
  }
`;
