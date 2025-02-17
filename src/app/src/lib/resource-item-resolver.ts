/*
Responsible for taking a URL path and calculating a Resource Item Type and it's rewrite URL
*/
export class resourceItemResolver {
  /*
Using the URL path, return the Resource Item type
  */
  getItemTypeFromPath(path: string, lang = 'en'): ItemResolverTypes {
    const testPath = this.stripLanguageFromPath(path, lang).toLowerCase();
    if (testPath.startsWith('/about-us/articles/')) {
      return ItemResolverTypes.article;
    }

    if (testPath.startsWith('/about-us/press-room/news/')) {
      return ItemResolverTypes.news;
    }

    if (testPath.startsWith('/about-us/press-room/press-releases/')) {
      return ItemResolverTypes.pressRelease;
    }

    return ItemResolverTypes.unknown;
  }

  stripLanguageFromPath(path: string, lang: string): string {
    if (path.toLowerCase().startsWith('/' + lang)) {
      return path.slice(('/' + lang).length);
    }
    return path;
  }

  /*
Check to see if a given URL path is a Resource Item type
  */
  isResourceItem(path: string): boolean {
    return !(this.getItemTypeFromPath(path) === ItemResolverTypes.unknown);
  }

  /*
Get the rewrite URL from the path, based on its Resource Item Type
  */
  getResourcePath(path: string, lang = 'en'): string {
    const itemType = this.getItemTypeFromPath(path, lang);
    const stripLanguageFromPath = this.shouldStripLanguageFromPath(lang);

    switch (itemType) {
      case ItemResolverTypes.news: {
        const pageName = path.split('/').pop();
        const folderName = pageName?.charAt(0);
        return (
          (stripLanguageFromPath ? '' : '/' + lang) +
          '/about-us/press-room/news/' +
          folderName +
          '/' +
          pageName
        );
      }
      case ItemResolverTypes.article: {
        const pageName = path.split('/').pop();
        const folderName = pageName?.charAt(0);
        return (
          (stripLanguageFromPath ? '' : '/' + lang) +
          '/about-us/articles/' +
          folderName +
          '/' +
          pageName
        );
      }
      case ItemResolverTypes.pressRelease: {
        const pageName = path.split('/').pop();
        const folderName = pageName?.charAt(0);
        return (
          (stripLanguageFromPath ? '' : '/' + lang) +
          '/about-us/press-room/press-releases/' +
          folderName +
          '/' +
          pageName
        );
      }
      case ItemResolverTypes.unknown:
      default: {
        return '';
      }
    }
  }
  // follow the "default" rule of Sitecore to only include lang in URL if lang is not default lang
  shouldStripLanguageFromPath(lang: string): boolean {
    return lang === 'en';
  }
}

/*
Resource Item Types
*/
export enum ItemResolverTypes {
  article,
  news,
  pressRelease,
  unknown,
}
