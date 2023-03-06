import { cleanup, fireEvent, render } from '@testing-library/react';
import { CreateBook } from './index';
import React from 'react';
import { Form } from 'antd';
import { act } from '@testing-library/react-hooks';

describe('CreateBook', function () {
  afterEach(cleanup);

  const Container = (props: Record<string, any>) => {
    const [form] = Form?.useForm();

    return (
      <CreateBook
        goBack={jest.fn()}
        title={'title'}
        assetDomain={''}
        onSubmit={() => {}}
        ageOptions={[]}
        attributes={[]}
        form={form}
        GENRE_OPTIONSOptions={[]}
        onAttributeModalVisibilityChange={() => {}}
        onGENRE_OPTIONSChange={() => {}}
        seriesDropdownComponent={() => <div data-testid="series-ddc" />}
        seriesOptions={[]}
        loading={false}
        allArtists={[]}
        draggerProps={{}}
        initialValues={{}}
        uploadedFile={{}}
        {...props}
      />
    );
  };

  const setup = (props: Record<string, any> = {}) => {
    const utils = render(<Container {...props} />);
    return {
      ...utils,
    };
  };

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should match with snapshot', () => {
    // @ts-ignore
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('should test the wrapper and component properly', function () {
    const { getByTestId } = setup({ coverImage: 'cover-img' });
    const wrapper = getByTestId('wrapper');
    const goBack_btn = getByTestId('goBack_btn');
    expect(wrapper).toHaveClass('meta-form-container');
    expect(goBack_btn).toBeInTheDocument();
    expect(getByTestId('title')).toHaveTextContent('title');
  });

  it('should test click events properly', function () {
    const mockFn = jest.fn();
    const { getByTestId } = setup({ goBack: mockFn });
    const goBack_btn = getByTestId('goBack_btn');
    const btn2 = getByTestId('btn2');
    expect(mockFn).toHaveBeenCalledTimes(0);

    if (goBack_btn) {
      fireEvent.click(goBack_btn);
    }

    if (btn2) {
      fireEvent.click(goBack_btn);
    }

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('should test input fields', function () {
    const { getByTestId } = setup();
    const InputVal = getByTestId('inputVal');
    const textArea = getByTestId('textArea');

    expect(InputVal).toBeInTheDocument();
    expect(textArea).toBeInTheDocument();
    expect(InputVal).toHaveValue('');
    expect(textArea).toHaveValue('');

    act(() => {
      fireEvent.change(InputVal, { target: { value: 'input value changed' } });
      fireEvent.change(textArea, { target: { value: 'text area changed' } });
    });
    expect(InputVal).toHaveValue('input value changed');
    expect(textArea).toHaveValue('text area changed');
    expect(InputVal).toHaveAttribute(
      'placeholder',
      'e. g. "Redeemable One Comic”'
    );
  });

  it('should test select', function () {
    const { getByTestId } = setup();

    const selectSeries = getByTestId('selectSeries');

    expect(selectSeries).toBeInTheDocument();
  });
});
