import {
  AuctionCardContent,
  AuctionCardContentRow,
  AuctionCardImage,
  Cell,
  Detail,
  Details,
  ImageContainer,
  RowHeader,
  Wrapper,
} from './index.styled';

interface LiveAuctionCardProps {
  GENRE_OPTIONS: string;
  language: string;
  ageRating: string;
  characters: Array<string>;
  imageSrc: any;
}

export const LiveAuctionCard = (props: LiveAuctionCardProps) => {
  const { GENRE_OPTIONS, language, ageRating, characters, imageSrc } = props;
  return (
    <Wrapper data-testid="live-auction-card">
      <ImageContainer>
        <AuctionCardImage alt="" src={imageSrc} data-testid="display-image" />
      </ImageContainer>
      <AuctionCardContent>
        <AuctionCardContentRow>
          <RowHeader data-testid="attribute-header">Attributes</RowHeader>
          <Details>
            <Detail>
              <Cell>GENRE_OPTIONS</Cell>
              <Cell data-testid="GENRE_OPTIONS">{GENRE_OPTIONS}</Cell>
            </Detail>
            <Detail>
              <Cell>Language</Cell>
              <Cell data-testid="language-type">{language}</Cell>
            </Detail>

            <Detail>
              <Cell>Age Rating:</Cell>
              <Cell data-testid="age-rating">{ageRating}</Cell>
            </Detail>
          </Details>
        </AuctionCardContentRow>
        <AuctionCardContentRow>
          <RowHeader data-testid="characters-header">Characters</RowHeader>
          <Details>
            {characters?.map((character, index) => (
              <Detail key={index}>
                <Cell data-testid="characters">{character}</Cell>
              </Detail>
            ))}
          </Details>
        </AuctionCardContentRow>
      </AuctionCardContent>
    </Wrapper>
  );
};
