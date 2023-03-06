import { cleanup, render } from '@testing-library/react';
import { CharacterAdd } from './index';

describe('CharacterAdd', function () {
  afterEach(cleanup);

  const setup = (
    extraProps: Record<string, any> = { handleCreateScene: () => {} }
  ) => {
    const utils = render(
      <CharacterAdd onCreateCharacter={() => {}} {...extraProps} />
    );
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

  it('should test that the card is rendered', function () {
    const { container } = setup();
    expect(container).toBeDefined();
  });

  it('should test the test "Add new scene" to be in the document', function () {
    const { getByTestId } = setup();
    expect(getByTestId('add')).toBeInTheDocument();
    expect(getByTestId('add').textContent).toBe('Add new character');
  });
});
