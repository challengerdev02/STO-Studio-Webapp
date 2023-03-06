import React from 'react';
import { Wrapper, InnerWrapper, Row, Header } from './index.styled';
import { BookCard } from '../book-card';

interface MyBooksWrapperProps {
  title: string;
  author: string;
  description: string;
  imageUrl: any;
}

export const MyBooksWrapper = (props: MyBooksWrapperProps) => {
  const { title, author, description, imageUrl } = props;
  return (
    <Wrapper data-testid="my-books-wrapper">
      <Header data-testid="component-header">My Books</Header>
      <InnerWrapper>
        <Row>
          <BookCard
            title={title}
            author={author}
            description={description}
            imageUrl={imageUrl}
          />
        </Row>
        <Row>
          <BookCard
            title={title}
            author={author}
            description={description}
            imageUrl={imageUrl}
          />
        </Row>
        <Row>
          <BookCard
            title={title}
            author={author}
            description={description}
            imageUrl={imageUrl}
          />
        </Row>
        <Row>
          <BookCard
            title={title}
            author={author}
            description={description}
            imageUrl={imageUrl}
          />
        </Row>
      </InnerWrapper>
    </Wrapper>
  );
};
