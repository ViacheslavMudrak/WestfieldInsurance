import { SiteLink } from 'src/types/generic';
import { MainNavigationItem, UtilityLink } from './types';
import { Menu } from 'src/types/menu';
import { Category } from 'src/types/category';
import { LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { NavFeaturedCardProps } from 'src/ui/Navigation/NavFeaturedCard';
import { v4 } from 'uuid';
import NextImageExtended from 'components/Helpers/NextImageExtended';

export function MapUtilityNavigation(data: UtilityLink[], login: boolean): SiteLink[] {
  const Links: SiteLink[] = [];
  if (!data) return Links;

  data
    .filter((x) => x.isLogin.jsonValue.value == login)
    .forEach((utilitLink) => {
      const siteLink: SiteLink = {
        id: utilitLink.link.jsonValue.value.href + v4(), // external links do not have ids
        field: {
          value: {
            href: utilitLink.link.jsonValue.value.href,
            text: utilitLink.link.jsonValue.value.text,
          },
        },
      };

      Links.push(siteLink);
    });

  return Links;
}

export function MapMainNavigation(data: MainNavigationItem[]): Menu[] {
  const MenuItems: Menu[] = [];
  if (!data) return MenuItems;

  data.forEach((menuItem) => {
    const Categories: Category[] = [];

    menuItem.subNavs.results.forEach((subNavItem) => {
      const siteLinks: SiteLink[] = [];

      subNavItem.links.results.forEach((subNavItemLink) => {
        const siteLink: SiteLink = {
          id: subNavItemLink.id,
          field: {
            value: {
              href: subNavItemLink.link.jsonValue.value.href,
              text: subNavItemLink.link.jsonValue.value.text,
            },
          },
        };

        siteLinks.push(siteLink);
      });

      const category: Category = {
        id: subNavItem.id,
        title: subNavItem.title.value,
        stack: subNavItem.stack.value === '1' ? true : false,
        link: {
          id: subNavItem.id,
          field: {
            value: {
              href: subNavItem.link.jsonValue.value.href,
              text: subNavItem.link.jsonValue.value.text,
            },
          },
        },
        links: siteLinks,
      };

      Categories.push(category);
    });

    //main link for a menu item
    const menuLink: LinkField = {
      value: {
        href: menuItem.link.jsonValue.value.href,
        text: menuItem.link.jsonValue.value.text,
      },
    };

    const featuredMenuCard: NavFeaturedCardProps = {
      content: menuItem.featuredHeaderCard.targetItem?.copy?.jsonValue.value,
      image: <NextImageExtended field={menuItem.featuredHeaderCard.targetItem?.image?.jsonValue} />,
      title: menuItem.featuredHeaderCard.targetItem?.title?.jsonValue.value,
      link: menuItem.featuredHeaderCard.targetItem?.link.jsonValue,
    };

    const menu: Menu = {
      id: menuItem.id,
      name: menuItem.title.value,
      items: Categories,
      link: menuLink,
      card: featuredMenuCard.title ? featuredMenuCard : undefined,
    };

    MenuItems.push(menu);
  });

  return MenuItems;
}
