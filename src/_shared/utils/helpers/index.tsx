import { Action } from '../../../redux/types';
import { get, last, toLower } from 'lodash';
import { COLOR_LIST_ALPHA } from '../../constants';
import { notification, Tag } from 'antd';
import ISBN from 'isbn-verify';
import { RcFile } from 'antd/es/upload';
import slugify from 'slugify';
import { createHash } from 'crypto';

export const classname = (classes: Record<string, boolean>) => {
  return Object.keys(classes)
    .filter((clsKey) => classes[clsKey])
    .join(' ');
};

export const sha256 = (data: any) =>
  createHash('sha256').update(data).digest('hex');

export function getNewLoadingState(
  currentState: Record<string, any> = {},
  action: Action,
  value: any
) {
  const { key } = action;
  return Object.assign({}, currentState, {
    uiLoaders: { ...currentState.uiLoaders, [key]: value },
  });
}

export const arrayToById = (array: any[] = [], key = '_id') => {
  if (!Array.isArray(array)) return array;
  return array.reduce((accumulator, currentObject) => {
    accumulator[get(currentObject, key)] = currentObject;
    return accumulator;
  }, {});
};

export const getRandomColorByString = (name: string) => {
  name = name?.toUpperCase();
  return get(COLOR_LIST_ALPHA, name?.charAt(0) ?? 'A') ?? '#7b68ed';
};

export const onCheckImageDimension = (
  file: RcFile,
  maxDimensions: [number, number] = [0, 0],
  minDimensions: [number, number] = [0, 0]
): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', (event) => {
      const _loadedImageUrl = event.target?.result;
      const image = document.createElement('img');
      image.src = _loadedImageUrl as string;

      const fixedSize =
        maxDimensions[0] == minDimensions[0] &&
        maxDimensions[1] == minDimensions[1];
      image.addEventListener('load', () => {
        const { width, height } = image;

        if (
          (maxDimensions[0] > 0 && width > maxDimensions[0]) ||
          (maxDimensions[1] && height > maxDimensions[1])
        ) {
          notification.error({
            message: `Image dimensions must be ${fixedSize ? '' : '<='} ${
              maxDimensions[0]
            }x${maxDimensions[1]}px`,
            placement: 'bottomLeft',
            duration: 4,
          });

          resolve(false);
          return;
        }

        if (width < minDimensions[0] || height < minDimensions[1]) {
          notification.error({
            message: `Image dimensions must be ${fixedSize ? '' : 'at least'} ${
              minDimensions[0]
            }x${minDimensions[1]}px`,
            placement: 'bottomLeft',
            duration: 4,
          });
          resolve(false);
          return;
        }

        resolve(true);
      });
    });
  });
};

export const formatFileSize = (size: number) => {
  if (size <= 0) return '0 B';
  const suffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / Math.pow(1024, i)).toFixed(1)} ${suffixes[i]}`;
};

export const determineFileType = (fileURL?: string) => {
  if (!fileURL) return;
  const extension = last(fileURL.split(/[#?]/)[0].split('.'))?.trim();
  const imageExtensions = ['jpeg', 'jpg', 'svg', 'png', 'webp', 'gif'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'webm', 'wmv', 'mkv', 'flv'];
  if (imageExtensions.includes(toLower(extension))) {
    return 'image';
  }
  if (videoExtensions.includes(toLower(extension))) {
    return 'video';
  }
  return null;
};

export const verifyFileSize = (file: any, size = 2000) => {
  const isLessThanSize = file.size / 1024 < Number(size.toFixed(0));

  if (!isLessThanSize) {
    notification.error({
      message: `File must smaller than ${formatFileSize(size)}!`,
      placement: 'bottomLeft',
      duration: 4,
    });
  }

  return isLessThanSize;
};
export const onBeforeImageUpload = (file: any, size = 2000) => {
  const imageTypes = [
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/jpg',
    'model/gltf-binary',
    'model/gltf+json',
  ];
  const isImageType = imageTypes.includes(file.type);
  if (!isImageType) {
    notification.error({
      message: 'Only images are allowed',
      placement: 'bottomLeft',
      duration: 4,
    });
    return isImageType;
  }

  // const isLessThanSize = file.size / 1024 < Number(size.toFixed(0));
  // const isLessThanSize = file.size / 1024 / 1024 < Number(size.toFixed(0));
  //console.log(file.size / 1024, Number(size.toFixed(0)));
  const isLessThanSize = file.size / 1024 < Number(size.toFixed(0));

  if (!isLessThanSize) {
    notification.error({
      message: `File must smaller than ${formatFileSize(size)}!`,
      placement: 'bottomLeft',
      duration: 4,
    });
    return isLessThanSize;
  }
  return true;
};

export const tagRender = (props: any) => {
  const { label, closable, onClose } = props;
  const onPreventMouseDown = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3, display: 'flex' }}
    >
      {label}
    </Tag>
  );
};

export const isISBN = (value: string) => ISBN.verify(value);

export const normalizeFileUpload = (e: any) => {
  // //console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }

  return e && get(e.file, 'response.data.file.url');
};

export const copyToClipboard = (text: string) => {
  if (
    navigator.clipboard &&
    navigator?.permissions &&
    navigator?.permissions?.query
  ) {
    navigator.permissions
      .query({ name: 'clipboard-write' } as unknown as PermissionDescriptor)
      .then((result) => {
        if (result.state == 'granted' || result.state == 'prompt') {
          navigator.clipboard.writeText(text).then(
            function () {
              notification.success({
                message: 'Copied to clipboard',
                placement: 'bottomLeft',
                duration: 4,
              });
            },
            function () {
              //console.log('Failed to set clipboard');
            }
          );
        }
      })
      .catch((error) => {
        //Quick fix for Firefox copy/paste not working
        navigator.clipboard.writeText(text).then(
          function () {
            notification.success({
              message: 'Copied to clipboard',
              placement: 'bottomLeft',
              duration: 4,
            });
          },
          function () {
            console.log('Failed to set clipboard', error);
          }
        );
      });
    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(
      function () {
        notification.success({
          message: 'Copied to clipboard',
          placement: 'bottomLeft',
          duration: 4,
        });
      },
      function () {
        //console.log('Failed to set clipboard');
      }
    );
    return;
  }

  // Fallback if no clipboard support
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  notification.success({
    message: 'Copied to clipboard',
    placement: 'bottomLeft',
    duration: 4,
  });
  document.body.removeChild(textArea);
};

/**
 * Popup Container for ant design modals and popovers
 */
export const getPopupContainer = () => {
  const element = document.createElement('div');
  element.style.position = 'fixed';
  element.style.top = '0';
  element.style.zIndex = '999';
  document.body.appendChild(element);
  return element;
};

// export const dynCryptoIconImport = (name: string) => {
//   try {
//     const Component = dynamic<HTMLAttributes<SVGElement>>(
//       () =>
//         import(
//           `node_modules/cryptocurrency-icons/svg/white/${toLower(name)}.svg`
//         ),
//       { ssr: true }
//     );
//
//     return (
//       <div className={'h-100 meta-flex meta-align-center meta-flex-j-c'}>
//         <Component height={20} width={20} viewBox={'0 0 32 32'} />
//       </div>
//     );
//   } catch (e) {
//     return null;
//   }
// };

/**
 * Cleans up text input to remove all non-numeric characters
 * @param value
 */
export function cleanInput(value: string) {
  return (
    String(value)
      ?.replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1') || ''
  );
}

export const debugLog = (name = 'Debug Log', type = 'log') => {
  return function (...args: any[]) {
    const color = type === 'log' ? '#3ec570' : '#f44336';
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `%c${name}`,
        `font-size: 16px; color: ${color}; font-weight: bold;`,
        ...args
      );
    }
  };
};

export const isURI = (value: string) => {
  try {
    new URL(value);
    return true;
  } catch (e) {
    return false;
  }
};

export const isISO8601 = (value: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
  return regex.test(value);
};

export const generateAvatar = (walletAddress?: string) => {
  return `https://robohash.org/${
    walletAddress || 'metacomic'
  }.png?set=set4&bgset=&size=400x400`;
};

export const timestamp = () => Math.floor(Date.now() / 1000);

export function mapSeriesToCard(allSeries: any[], router: any) {
  return (allSeries ?? []).map((data) => {
    const href = `/assets/series/${slugify(data.title)}-${get(data, '_id')}`;
    return {
      ...data,
      cardType: 'series',
      coverInfo: {
        coverImg: data.image,
        menuItems: [],
      },
      cardData: {
        inWishlist: false,
        count: data?.views ?? '0',
        iconURL: data.user?.avatar ?? generateAvatar(data?.user?.walletAddress),
        ...data,
        cardType: 'series',
      },
      href,
      handleViewCreatedAsset: () => {
        router.push(href);
      },
    };
  });
}

export function getAuthMessage(info: {
  walletAddress: string;
  environment: string;
  nonce?: any;
}) {
  return `Welcome to SatoshiStudio! Click to sign in and 
  accept the Satoshi Studio Terms of Service: 
  ${
    process.env.NEXT_PUBLIC_TERMS_OF_SERVICE ??
    'https://satoshistudio.tawk.help/article/terms-of-service'
  }

  This request will not trigger a blockchain transaction 
  or cost any gas fees.

  Your authentication status will reset after 24 hours.

  Environment: ${info.environment}

  Address: 
  ${info.walletAddress}

  Nonce: ${info.nonce ?? Date.now()}`;
}

export function parseUrl(url: string) {
  if (String(url).startsWith('ipfs')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return url;
}
