import { UPLOAD_MEDIA, uploadMedia } from './index';

describe('Create Action', () => {
  it('should test Create returns the correct data with the actual payload', () => {
    const meta = { payload: {} };
    const expectedAction = {
      type: UPLOAD_MEDIA.START,
      meta,
    };
    expect(uploadMedia({})).toEqual(expectedAction);
  });
});
