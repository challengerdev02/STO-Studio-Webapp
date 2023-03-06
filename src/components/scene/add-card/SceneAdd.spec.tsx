import {
  cleanup,
  fireEvent,
  queryByTestId,
  render,
} from '@testing-library/react';
import { SceneAdd } from './index';

describe('SceneAdd', function () {
  afterEach(cleanup);

  let props = {
    onCreateScene: jest.fn(),
  };

  const setup = (extraProps: Record<string, any> = {}) => {
    const utils = render(<SceneAdd {...props} {...extraProps} />);
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
    expect(getByTestId('add').textContent).toBe('Add new scene');
  });

  it('should test that the onClick event on the card fires when clicked ', async () => {
    // @ts-ignore
    const {} = setup();
    const add_scene_card = queryByTestId(document.body, 'add-scene-card');
    expect(add_scene_card).toBeInTheDocument();

    if (add_scene_card) {
      fireEvent.click(add_scene_card);
      expect(props.onCreateScene).toHaveBeenCalled();
    }
  });
});
