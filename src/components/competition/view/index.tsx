import {
  CompetitionBodySection,
  CompetitionHeaderSection,
  Container,
  ImageSection,
} from '@/components/competition/view/index.styled';
import { Button, Col, Row, Space } from 'antd';

import { format } from 'date-fns';
import { CompetitionNamespace } from '@/shared/namespaces/competition';
import { CheckCircleFilled, ClockCircleFilled } from '@ant-design/icons';
import { get, has, isEmpty, map } from 'lodash';
import { Gallery } from '@/components/account/profile/index.styled';
import { MarketplaceCard } from '@/components/marketplace';
import { useRouter } from 'next/router';
import { generateAvatar } from '@/shared/utils';
import { isMobile } from 'react-device-detect';
import { useTimer } from '@/hooks';
import React, { useState } from 'react';
import {
  TimeBlock,
  TimeLabel,
  TimeValue,
} from '@/components/sale/view/index.styled';
import CompetitionEntry = CompetitionNamespace.CompetitionEntry;

interface CompetitionView extends CompetitionNamespace.Competition {
  onViewEntriesVisibility?: (visibility: boolean) => void;
  onJoinVisibilityChange: (visibility: boolean) => void;
  enrollments: CompetitionEntry[];
  pagination: Record<string, any>;
  onGetEntries: (params: Record<string, any>) => void;
  loadingEntries: boolean;
}
export const CompetitionView = (props: CompetitionView) => {
  const router = useRouter();
  const {
    title,
    entries,
    description,
    prizes,
    winningCriteria,
    howToJoin,
    banner,
    thumbnail,
    enrollmentStartDate,
    startDate,
    enrollmentEndDate,
    resultDate,
    endDate,
    // onViewEntriesVisibility,
    onJoinVisibilityChange,
    enrollments,
    loadingEntries,
    onGetEntries,
    pagination,
  } = props;
  const [enrollmentStarted, setEnrollmentStarted] = useState<boolean>(false);

  const { seconds, minutes, hours, days } = useTimer(
    new Date(),
    enrollmentStartDate,
    () => setEnrollmentStarted(true)
  );
  const getIcon = (date: string) => {
    if (new Date() > new Date(date))
      return <CheckCircleFilled style={{ color: 'grey' }} />;
    else return <ClockCircleFilled style={{ color: 'orange' }} />;
  };
  const getTimelineContent = (date: string, text: string) => {
    if (new Date() > new Date(Date.parse(String(date))))
      return <h4 style={{ color: '#4d4d4d' }}>{text}</h4>;
    else return <h4>{text}</h4>;
  };
  const series = map(enrollments, (entry) => ({
    ...entry.series,
    cardType: 'series',
    coverInfo: {
      coverImg: entry.series.image,
      menuItems: [],
    },
    cardData: {
      inWishlist: false,
      count: entry.series?.subscribers ?? '0',
      iconURL:
        entry.series.user?.avatar ??
        generateAvatar(entry.series?.user?.walletAddress),
      ...entry.series,
      cardType: 'series',
    },
  }));
  return (
    <Container>
      <ImageSection>
        <img src={banner} alt="Competition Banner" className="comp-banner" />
        <div className="comp-banner-overlay"></div>
      </ImageSection>
      <CompetitionHeaderSection>
        <Row style={{ marginTop: -150 }} justify={'center'} align={'middle'}>
          <Col
          // lg={{ span: 10, offset: 7 }}
          >
            <div
              style={{
                justifyContent: 'center',
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              <img
                style={{ border: '3px solid #999999' }}
                src={thumbnail}
                alt="thumbnail"
                className="comp-thumbnail"
              />
            </div>
            <div
              style={{
                justifyContent: 'center',
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              <section
                style={{
                  justifyContent: 'center',
                  width: '100%',
                  textAlign: 'center',
                }}
                className="competition-title-section"
              >
                <h2 className="competition-title">{title}</h2>
                {entries > 10 && (
                  <h4 className="competition-title-info">
                    {entries} Artists enrolled
                  </h4>
                )}
                <Space
                  size={30}
                  direction={'vertical'}
                  style={{ justifyContent: 'center', textAlign: 'center' }}
                >
                  {new Date() <
                    new Date(Date.parse(String(enrollmentStartDate))) &&
                    !enrollmentStarted && (
                      <Space>
                        {parseInt(days) > 0 && (
                          <TimeBlock
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <TimeValue data-testid="days-timeblock">
                              {days ?? '00'}
                            </TimeValue>{' '}
                            <TimeLabel>Days</TimeLabel>{' '}
                          </TimeBlock>
                        )}
                        <TimeBlock
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <TimeValue data-testid="hours-timeblock">
                            {hours ?? '00'}
                          </TimeValue>{' '}
                          <TimeLabel>Hours</TimeLabel>{' '}
                        </TimeBlock>
                        <TimeBlock
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <TimeValue data-testid="minutes-timeblock">
                            {minutes ?? '00'}
                          </TimeValue>{' '}
                          <TimeLabel>Minutes</TimeLabel>{' '}
                        </TimeBlock>
                        <TimeBlock
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <TimeValue data-testid="seconds-timeblock">
                            {seconds ?? '00'}
                          </TimeValue>{' '}
                          <TimeLabel>Seconds</TimeLabel>{' '}
                        </TimeBlock>
                      </Space>
                    )}
                  <Space direction={isMobile ? 'vertical' : 'horizontal'}>
                    {new Date() < new Date(Date.parse(String(endDate))) && (
                      <Button
                        type={'primary'}
                        block={false}
                        shape={'round'}
                        disabled={
                          !enrollmentStarted &&
                          new Date() <
                            new Date(Date.parse(String(enrollmentStartDate)))
                        }
                        style={{
                          justifyContent: 'center',
                          margin: '1rem',
                          textAlign: 'center',
                        }}
                        onClick={() => onJoinVisibilityChange(true)}
                      >
                        Enroll In Competition
                      </Button>
                    )}
                    <Button
                      type={'ghost'}
                      block={false}
                      shape={'round'}
                      style={{
                        justifyContent: 'center',
                        margin: '1rem',
                        textAlign: 'center',
                      }}
                      onClick={() => router.push('/assets/create')}
                    >
                      Create A Series
                    </Button>
                  </Space>
                  {/*<Button*/}
                  {/*  type={'default'}*/}
                  {/*  block={false}*/}
                  {/*  shape={'round'}*/}
                  {/*  onClick={() => onViewEntriesVisibility(true)}*/}
                  {/*>*/}
                  {/*  View entries*/}
                  {/*</Button>*/}
                </Space>
              </section>
            </div>
          </Col>
        </Row>

        <CompetitionBodySection>
          <Row gutter={100}>
            <Col md={24} xl={16} xxl={16}>
              <p className="comp-intro">{description}</p>
              <div className={'comp-headlines'}>
                <h1 className={'comp-headlines-title'}>Winning Criteria</h1>
                <ol>
                  {winningCriteria.map((criteria, index) => {
                    return <li key={`@@${index}::${criteria}`}>{criteria}</li>;
                  })}
                </ol>
              </div>
              <div className={'comp-headlines'}>
                <h1 className={'comp-headlines-title'}>How to join</h1>
                <ol>
                  {howToJoin.map((how, index) => {
                    return <li key={`@@${index}::${how}`}>{how}</li>;
                  })}
                </ol>
              </div>
              {!isMobile && (
                <div className={'comp-headlines'}>
                  {!isEmpty(series) && (
                    <h1 className={'comp-headlines-title'}>Entries</h1>
                  )}

                  {!isEmpty(series) && (
                    <>
                      <Gallery data-testid="series-gallery">
                        {series?.map((series: any, index: any) => (
                          <MarketplaceCard
                            {...series}
                            key={`@@profile/series:${index}`}
                            coverInfo={series?.coverInfo}
                            cardData={series?.cardData}
                            handleViewCreatedAsset={() => {
                              router.push(
                                `/assets/series/${get(series, '_id')}`
                              );
                            }}
                            cardType={'series'}
                          />
                        ))}
                      </Gallery>

                      {/*<LoadMore>*/}
                      {has(pagination, 'next') ? (
                        <Button
                          data-testid="load-more"
                          shape="round"
                          size={'small'}
                          onClick={(_) =>
                            onGetEntries({ page: get(pagination, 'next') })
                          }
                        >
                          <span>Load more entries</span>{' '}
                          {loadingEntries ? (
                            <i className="mc-loading-line mc-lg" />
                          ) : (
                            ''
                          )}
                        </Button>
                      ) : (
                        ''
                      )}
                      {/*</LoadMore>*/}
                    </>
                  )}
                </div>
              )}
            </Col>
            <Col md={24} xl={8} xxl={8}>
              <div className={'comp-headlines'}>
                <div className={'comp-headlines'}>
                  <h1 className={'comp-headlines-title'}>Prizes</h1>
                  <Space
                    size={20}
                    direction={'vertical'}
                    className={'comp-headlines-body'}
                  >
                    {prizes.map((prize, index) => {
                      return (
                        <div key={`${index}::${title}`}>
                          <h4 style={{ marginBottom: '0' }}>
                            Winner {index + 1}
                          </h4>
                          <div>{prize}</div>
                        </div>
                      );
                    })}
                  </Space>
                </div>
                <h1 className={'comp-headlines-title'}>Timeline</h1>

                <div className={'com-timeline'}>
                  <Space align={'start'} direction={'horizontal'}>
                    {getIcon(enrollmentStartDate)}
                    <div>
                      Enrollment Begins
                      {getTimelineContent(
                        enrollmentStartDate,
                        format(
                          new Date(enrollmentStartDate),
                          'LLL do yyyy hh:mm aaa'
                        )
                      )}
                    </div>
                  </Space>
                </div>
                <div className={'com-timeline'}>
                  <Space align={'start'} direction={'horizontal'}>
                    {getIcon(startDate)}
                    <div>
                      Competition Starts
                      {getTimelineContent(
                        startDate,
                        format(new Date(startDate), 'LLL do yyyy hh:mm aaa')
                      )}
                    </div>
                  </Space>
                </div>
                <div className={'com-timeline'}>
                  <Space align={'start'} direction={'horizontal'}>
                    {getIcon(enrollmentEndDate)}
                    <div>
                      Enrollment Ends
                      {getTimelineContent(
                        enrollmentEndDate,
                        format(
                          new Date(enrollmentEndDate),
                          'LLL do yyyy hh:mm aaa'
                        )
                      )}
                    </div>
                  </Space>
                </div>
                <div className={'com-timeline'}>
                  <Space align={'start'} direction={'horizontal'}>
                    {getIcon(enrollmentEndDate)}
                    <div>
                      Competition Ends
                      {getTimelineContent(
                        enrollmentEndDate,
                        format(new Date(endDate), 'LLL do yyyy hh:mm aaa')
                      )}
                    </div>
                  </Space>
                </div>
                <div className={'com-timeline'}>
                  <Space align={'start'} direction={'horizontal'}>
                    {getIcon(resultDate)}
                    <div>
                      Results Announced
                      {getTimelineContent(
                        resultDate,
                        format(new Date(resultDate), 'LLL do yyyy hh:mm aaa')
                      )}
                    </div>
                  </Space>
                </div>
              </div>
            </Col>
            {isMobile && (
              <Col md={24} xl={16} xxl={16}>
                <div className={'comp-headlines'}>
                  {!isEmpty(series) && (
                    <h1 className={'comp-headlines-title'}>Entries</h1>
                  )}

                  {!isEmpty(series) && (
                    <>
                      <Gallery
                        data-testid="series-gallery"
                        className={'comp-headlines-series'}
                      >
                        {series?.map((series: any, index: any) => (
                          <MarketplaceCard
                            {...series}
                            key={`@@profile/series:${index}`}
                            coverInfo={series?.coverInfo}
                            cardData={series?.cardData}
                            handleViewCreatedAsset={() => {
                              router.push(
                                `/assets/series/${get(series, '_id')}`
                              );
                            }}
                            cardType={'series'}
                          />
                        ))}
                      </Gallery>

                      {has(pagination, 'next') ? (
                        <Button
                          data-testid="load-more"
                          shape="round"
                          size={'small'}
                          onClick={(_) =>
                            onGetEntries({ page: get(pagination, 'next') })
                          }
                        >
                          <span>Load more entries</span>{' '}
                          {loadingEntries ? (
                            <i className="mc-loading-line mc-lg" />
                          ) : (
                            ''
                          )}
                        </Button>
                      ) : (
                        ''
                      )}
                    </>
                  )}
                </div>
              </Col>
            )}
          </Row>
          {/*<div>*/}
          {/*  <Button type={'primary'} block={false} shape={'round'}>*/}
          {/*    Join Competition*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </CompetitionBodySection>
      </CompetitionHeaderSection>
    </Container>
  );
};
