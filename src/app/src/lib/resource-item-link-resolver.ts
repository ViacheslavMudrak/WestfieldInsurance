import { ItemResolverTypes, resourceItemResolver } from './resource-item-resolver';

// Build links for Resource Items;
export class resourceItemLinkResolver extends resourceItemResolver {
  //Expected value for [path] is a URL path, not a full canonical
  getResourcePath(path: string, lang = 'en'): string {
    const itemType = super.getItemTypeFromPath(path, lang);
    const stripLanguageFromPath = super.shouldStripLanguageFromPath(lang);

    switch (itemType) {
      case ItemResolverTypes.news: {
        const pageName = path.split('/').pop();
        return (stripLanguageFromPath ? '' : '/' + lang) + '/about-us/press-room/news/' + pageName;
      }
      case ItemResolverTypes.article: {
        const pageName = path.split('/').pop();
        return (stripLanguageFromPath ? '' : '/' + lang) + '/about-us/articles/' + pageName;
      }
      case ItemResolverTypes.pressRelease: {
        const pageName = path.split('/').pop();
        return (
          (stripLanguageFromPath ? '' : '/' + lang) +
          '/about-us/press-room/press-releases/' +
          pageName
        );
      }
      case ItemResolverTypes.unknown:
      default: {
        return '';
      }
    }
  }

  getPathApplyingLanguageRules(pathName: string, lang: string): string {
    if (super.shouldStripLanguageFromPath(lang)) {
      return super.stripLanguageFromPath(pathName, lang);
    } else {
      return pathName;
    }
  }
}
