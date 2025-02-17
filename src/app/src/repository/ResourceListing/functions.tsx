import { ResourceListingResult } from './resourceListingService';
import { ResourceListingCard } from 'src/ui/ResourceListing/ResourceListing';

export function MapResourceListing(data: ResourceListingResult[]): ResourceListingCard[] {
  const itemLinks: ResourceListingCard[] = [];
  if (!data) return itemLinks;

  data.forEach((listing) => {
    itemLinks.push({
      title: listing.title,
      url: listing.url,
    });
  });

  return itemLinks;
}
