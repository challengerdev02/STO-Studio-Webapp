import { Container } from '../marketplace/marketplace-view/index.styled';
import { Image } from '@/components/layout/header/index.styled';
import { useRouter } from 'next/router';
import { Button, Space } from 'antd';

interface LaunchProps {}
export const Launch = (_: LaunchProps) => {
  const router = useRouter();

  return (
    <Container>
      {/* <section className={'marketPlaceBanner'}>
        <a onClick={() => router.push('/competition/63823de17f5842757b00ed0a')}>
          <Image src={'/images/enrollment-banner.png'} />
        </a>
      </section> */}
      <h1 className={'title'}>MetaComic Launchpad</h1>
      <section className="mid">
        <div>
          <div style={{ textAlign: 'center' }}>
            <Space size={20} direction={'vertical'}>
              <h3>
                Crowdfund your next series and reward your backers with special{' '}
                <br />
                collectible editions, bonus arts, hard copies and/or share
                royalties for life
              </h3>
              <Button
                type={'primary'}
                target={'_blank'}
                shape={'round'}
                href={'https://forms.gle/UUDFsmCZyrmKzJ4L6'}
              >
                Apply Now!
              </Button>
            </Space>
          </div>
        </div>
      </section>
    </Container>
  );
};
