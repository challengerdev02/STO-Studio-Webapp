import { AppObject } from '@/shared/namespaces';
import { SeriesNamespace } from '@/shared/namespaces/series';

namespace CompetitionNamespace {
  export interface Competition extends AppObject {
    views: number;

    entries: number;

    winners: [];

    resultDate: string;

    endDate: string;

    startDate: string;

    enrollmentEndDate: string;

    enrollmentStartDate: string;

    banner: string;

    thumbnail: string;

    prizes: string[];

    winningCriteria: string[];

    howToJoin: string[];

    description: string;

    title: string;

    publicId: string;
  }

  export interface CompetitionEntry extends AppObject {
    competition: string;
    user: string;
    likes: number;
    subscriptions: number;
    walletAddress: number;
    series: SeriesNamespace.Series;
  }
}
