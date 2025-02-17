import { GetStaticComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';
import { LeadershipListingProps } from 'src/ui/Leadership/LeadershipBio';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { useI18n } from 'next-localization';
import {
  fetchLeadershipListing$,
  leadershipListingKey,
} from 'src/repository/LeadershipListing/fetch';
import LeadershipListing from 'src/ui/Leadership/LeadershipListing';
import { MapLeadershipListing } from 'src/repository/LeadershipListing/functions';
import { GetItemId, GetSiteName } from 'components/Helpers/ContentUtil';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000,
    },
  },
});

const LeadershipListingMarkup = (): JSX.Element => {
  const { locale } = useI18n();
  const lang = locale();
  const siteRootItemId = GetItemId(GetSiteName(), 'SiteRootItemId');

  const leadershipListingData = useQuery({
    queryKey: [leadershipListingKey, siteRootItemId, lang],
    queryFn: fetchLeadershipListing$,
    enabled: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (leadershipListingData.data?.search) {
    const LeadershipListingProps: LeadershipListingProps = {
      persons: MapLeadershipListing(leadershipListingData.data.search.results),
    };
    return <LeadershipListing {...LeadershipListingProps} />;
  }

  return <></>;
};

// underscore layoutdata so linter unused vars is disabled
export const getStaticProps: GetStaticComponentProps = async (_rendering, _layoutData, context) => {
  const siteRootItemId = GetItemId(_layoutData.sitecore.context.site?.name, 'SiteRootItemId');
  await queryClient.fetchQuery(
    [leadershipListingKey, siteRootItemId, context.locale],
    fetchLeadershipListing$,
    { cacheTime: 1000 }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default LeadershipListingMarkup;
