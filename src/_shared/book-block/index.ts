interface BookBlockOptions {
  // page to start on
  startPage: number;
  // vertical or horizontal flip
  orientation: string;
  // ltr (left to right) or rtl (right to left)
  direction: string;
  // speed for the flip transition in ms
  speed: number;
  // easing for the flip transition
  easing: string;
  // if set to true, both the flipping page and the sides will have an overlay to simulate shadows
  shadows: boolean;
  // opacity value for the "shadow" on both sides (when the flipping page is over it)
  // value : 0.1 - 1
  shadowSides: number;
  // opacity value for the "shadow" on the flipping page (while it is flipping)
  // value : 0.1 - 1
  shadowFlip: number;
  // if we should show the first item after reaching the end
  circular: boolean;
  // if we want to specify a selector that triggers the next() function. example: ´#bb-nav-next´
  nextElement: string;
  // if we want to specify a selector that triggers the prev() function
  prevElement: string;
  // autoplay. If true it overwrites the circular option to true
  autoplay: boolean;
  // time (ms) between page switch, if autoplay is true
  interval: number;
  // 3d perspective
  perspective: number;
  // callback after the flip transition
  // old is the index of the previous item
  // page is the current item´s index
  // isLimit is true if the current page is the last one (or the first one)
  onEndFlip: (old: number, page: number, isLimit: boolean) => void;
  // callback before the flip transition
  // page is the current item´s index
  onBeforeFlip: (page: number) => void;
}

export class BookBlock {
  element: HTMLElement;
  options: BookBlockOptions = BookBlock.defaultOptions();
  items: Array<HTMLElement> = [];
  currentIndex = 0;
  current: HTMLElement | null = null;
  nextItem: HTMLElement | null = null;
  previous = -1;
  elementWidth = 0;
  itemsCount = 0;
  transitionEndEventName = '';
  support = true;
  isAnimating = false;
  end = false;
  slideshow: any;
  resizeTimeout: any;

  constructor(element: HTMLElement, options?: Record<string, any>) {
    this.element = element;
    this.options = Object.assign({}, this.options, options);
    this.onInit();
  }

  onInit() {
    // orientation class
    this.element.classList.add('react-bb-' + this.options.orientation);
    this.element.style.perspective = this.options.perspective + 'px';
    // items
    this.items = Array.prototype.slice.call(
      this.element.querySelectorAll('.react-bb-item')
    );
    //console.log(
    //   'oaisjdiofisdf',
    //   this.element.querySelectorAll('.react-bb-item')
    // );
    // total items
    this.itemsCount = this.items.length;
    // current item´s index
    if (
      this.options.startPage > 0 &&
      this.options.startPage <= this.itemsCount
    ) {
      this.currentIndex = this.options.startPage - 1;
    } else {
      this.currentIndex = 0;
    }
    // previous item´s index
    this.previous = -1;
    // show first item
    this.current = this.items[this.currentIndex];
    if (this.current?.style) this.current.style.display = 'block';
    // get width of this.el
    // this will be necessary to create the flipping layout
    this.elementWidth = this.element.offsetWidth;
    this.transitionEndEventName = 'transitionend';

    // initialize/bind some events
    this.initEvents();
    // start slideshow
    if (this.options.autoplay) {
      this.options.circular = true;
      this.startSlideshow();
    }
  }

  initEvents() {
    if (this.options.nextElement !== '') {
      const nextElement = document.querySelector(this.options.nextElement);
      if (nextElement) {
        nextElement.addEventListener('click', () => {
          this.actions('next');
          return false;
        });

        nextElement.addEventListener('touchstart', () => {
          this.actions('next');
          return false;
        });
      }
    }

    if (this.options.prevElement !== '') {
      const prevElement = document.querySelector(this.options.prevElement);
      if (prevElement) {
        prevElement.addEventListener('click', () => {
          this.actions('prev');
          return false;
        });
        prevElement.addEventListener('touchstart', () => {
          this.actions('prev');
          return false;
        });
      }
    }

    window.addEventListener('resize', () => {
      this.resizeHandler();
    });
  }

  actions(dir: string, page?: number) {
    this.stopSlideshow();

    // console.info(this.currentIndex, this.current);
    this.navigate(dir, page);
  }

  navigate(dir: string, page?: number) {
    if (this.isAnimating) {
      return false;
    }

    // callback trigger
    this.options.onBeforeFlip(this.currentIndex);

    this.isAnimating = true;
    // update current value
    this.current = this.items[this.currentIndex];

    // //console.log('One', page, dir);
    // //console.log('Two', dir === 'next' && this.options.direction === 'ltr');
    if (page !== undefined) {
      this.currentIndex = page;
    } else if (
      (dir === 'next' && this.options.direction === 'ltr') ||
      (dir === 'prev' && this.options.direction === 'rtl')
    ) {
      // //console.log('Level 1', this.itemsCount);
      if (!this.options.circular && this.currentIndex === this.itemsCount - 1) {
        this.end = true;
      } else {
        // //console.log('Level 2', this.itemsCount);
        this.previous = this.currentIndex;
        this.currentIndex =
          this.currentIndex < this.itemsCount - 1 ? this.currentIndex + 1 : 0;
      }
    } else if (
      (dir === 'prev' && this.options.direction === 'ltr') ||
      (dir === 'next' && this.options.direction === 'rtl')
    ) {
      // //console.log('Outer 2', this.itemsCount);
      if (!this.options.circular && this.currentIndex === 0) {
        this.end = true;
      } else {
        this.previous = this.currentIndex;
        this.currentIndex =
          this.currentIndex > 0 ? this.currentIndex - 1 : this.itemsCount - 1;
      }
    }

    this.nextItem =
      !this.options.circular && this.end
        ? this.current
        : this.items[this.currentIndex];

    this.items.forEach(function (element) {
      element.style.display = 'none';
    });
    // if (!this.support) {
    //   this.layoutNoSupport(dir);
    // } else {

    this.layout(dir);
    // }
  }

  layoutNoSupport(dir: string) {
    if (this.nextItem) {
      this.nextItem.style.display = 'block';
    }
    this.end = false;
    this.isAnimating = false;
    const isLimit =
      (dir === 'next' && this.currentIndex === this.itemsCount - 1) ||
      (dir === 'prev' && this.currentIndex === 0);
    // callback trigger
    this.options.onEndFlip(this.previous, this.currentIndex, isLimit);
  }

  layout(dir: string) {
    const sLeft = this.addSide('left', dir),
      // 1 element for the flipping/middle page
      sMiddle = this.addSide('middle', dir),
      // 1 element for the right side
      sRight = this.addSide('right', dir),
      // overlays
      overlayLeft = sLeft.querySelector('div.react-bb-overlay'),
      overlayMiddleFront = sMiddle
        ?.querySelector('div.react-bb-front')
        ?.querySelector('div.react-bb-flipoverlay'),
      overlayMiddleBack = sMiddle
        ?.querySelector('div.react-bb-back')
        ?.querySelector('div.react-bb-flipoverlay'),
      overlayRight = sRight.querySelector('div.react-bb-overlay'),
      speed = this.end ? 400 : this.options.speed;

    const fChild = this.items[0];
    this.element.insertBefore(sLeft, fChild);
    this.element.insertBefore(sMiddle, fChild);
    this.element.insertBefore(sRight, fChild);

    if (sLeft) {
      sLeft.style.zIndex = '102';
    }
    if (sMiddle) {
      sMiddle.style.zIndex = '103';
    }
    if (sRight) {
      sRight.style.zIndex = '101';
    }

    sMiddle.style.transitionDuration = speed + 'ms';
    sMiddle.style.transitionTimingFunction = this.options.easing;

    sMiddle.addEventListener(this.transitionEndEventName, (event) => {
      if ((event.target as HTMLElement).classList.contains('react-bb-page')) {
        Array.from(this.element.querySelectorAll('.react-bb-page')).forEach(
          (element) => {
            // //console.log('Here transitionEndEventName', event.target, element);
            this.element.removeChild(element);
          }
        );
        if (this.nextItem) {
          this.nextItem.style.display = 'block';
        }
        this.end = false;
        this.isAnimating = false;
        const isLimit =
          (dir === 'next' && this.currentIndex === this.itemsCount - 1) ||
          (dir === 'prev' && this.currentIndex === 0);
        // callback trigger
        this.options.onEndFlip(this.previous, this.currentIndex, isLimit);
      }
    });

    if (dir === 'prev') {
      sMiddle.classList.add('react-bb-flip-initial');
    }

    // overlays
    if (this.options.shadows && !this.end) {
      if (dir === 'next') {
        if (overlayMiddleFront) {
          (overlayMiddleFront as HTMLElement).style.transition =
            'opacity ' + this.options.speed / 2 + 'ms ' + 'linear';
        }

        if (overlayMiddleBack) {
          (overlayMiddleBack as HTMLElement).style.transition =
            'opacity ' +
            this.options.speed / 2 +
            'ms ' +
            'linear' +
            ' ' +
            this.options.speed / 2 +
            'ms';

          (
            overlayMiddleBack as HTMLElement
          ).style.opacity = `${this.options.shadowFlip}`;
        }

        if (overlayLeft) {
          (overlayLeft as HTMLElement).style.transition =
            'opacity ' +
            this.options.speed / 2 +
            'ms ' +
            'linear' +
            ' ' +
            this.options.speed / 2 +
            'ms';
        }

        if (overlayRight) {
          (overlayRight as HTMLElement).style.transition =
            'opacity ' + this.options.speed / 2 + 'ms ' + 'linear';
          (
            overlayRight as HTMLElement
          ).style.opacity = `${this.options.shadowSides}`;
        }
      } else if (dir === 'prev') {
        if (overlayMiddleFront) {
          (overlayMiddleFront as HTMLElement).style.transition =
            'opacity ' +
            this.options.speed / 2 +
            'ms ' +
            'linear' +
            ' ' +
            this.options.speed / 2 +
            'ms';
          (
            overlayMiddleFront as HTMLElement
          ).style.opacity = `${this.options.shadowFlip}`;
        }
        if (overlayMiddleBack) {
          (overlayMiddleBack as HTMLElement).style.transition =
            'opacity ' + this.options.speed / 2 + 'ms ' + 'linear';
        }
        if (overlayLeft) {
          (overlayLeft as HTMLElement).style.transition =
            'opacity ' + this.options.speed / 2 + 'ms ' + 'linear';
          (
            overlayLeft as HTMLElement
          ).style.opacity = `${this.options.shadowSides}`;
        }
        if (overlayRight) {
          (overlayRight as HTMLElement).style.transition =
            'opacity ' +
            this.options.speed / 2 +
            'ms ' +
            'linear' +
            ' ' +
            this.options.speed / 2 +
            'ms';
        }
      }
    }

    setTimeout(() => {
      // first && last pages lift slightly up when we can't go further
      if (this.end) {
        sMiddle.classList.add('react-bb-flip-' + dir + '-end');
      } else {
        sMiddle.classList.add('react-bb-flip-' + dir);
      }
      // overlays
      if (this.options.shadows && !this.end) {
        if (overlayRight) {
          (overlayRight as HTMLElement).style.opacity =
            dir === 'next' ? '0' : `${this.options.shadowSides}`;
        }
        if (overlayMiddleFront) {
          (overlayMiddleFront as HTMLElement).style.opacity =
            dir === 'next' ? `${this.options.shadowFlip}` : '0';
        }
        if (overlayMiddleBack) {
          (overlayMiddleBack as HTMLElement).style.opacity =
            dir === 'next' ? '0' : `${this.options.shadowFlip}`;
        }
        if (overlayLeft) {
          (overlayLeft as HTMLElement).style.opacity =
            dir === 'next' ? `${this.options.shadowSides}` : '0';
        }
      }
    }, 25);
  }

  addSide(side: string, dir: string) {
    const sideElement = document.createElement('div');
    sideElement.className = 'react-bb-page';

    switch (side) {
      case 'left': {
        /*
        <div class="react-bb-page" style="z-index:102;">
            <div class="react-bb-back">
                <div class="react-bb-outer">
                    <div class="react-bb-content">
                        <div class="react-bb-inner">
                            dir==='next' ? [content of current page] : [content of next page]
                        </div>
                    </div>
                    <div class="react-bb-overlay"></div>
                </div>
            </div>
        </div>
        */
        const inner =
          dir === 'next' && this.current
            ? this.current.innerHTML
            : this.nextItem
            ? this.nextItem.innerHTML
            : '';
        sideElement.innerHTML =
          '<div class="react-bb-back"><div class="react-bb-outer"><div class="react-bb-content"><div class="react-bb-inner">' +
          inner +
          '</div></div><div class="react-bb-overlay"></div></div></div>';
        break;
      }
      case 'middle': {
        /*
        <div class="react-bb-page" style="z-index:103;">
            <div class="react-bb-front">
                <div class="react-bb-outer">
                    <div class="react-bb-content">
                        <div class="react-bb-inner">
                            dir==='next' ? [content of current page] : [content of next page]
                        </div>
                    </div>
                    <div class="react-bb-flipoverlay"></div>
                </div>
            </div>
            <div class="react-bb-back">
                <div class="react-bb-outer">
                    <div class="react-bb-content">
                        <div class="react-bb-inner">
                            dir==='next' ? [content of next page] : [content of current page]
                        </div>
                    </div>
                    <div class="react-bb-flipoverlay"></div>
                </div>
            </div>
        </div>
        */
        const frontInner =
          dir === 'next' && this.current
            ? this.current.innerHTML
            : this.nextItem
            ? this.nextItem.innerHTML
            : '';
        const backInner =
          dir === 'next' && this.nextItem
            ? this.nextItem.innerHTML
            : this.current
            ? this.current.innerHTML
            : '';
        sideElement.innerHTML =
          '<div class="react-bb-front"><div class="react-bb-outer"><div class="react-bb-content"><div class="react-bb-inner">' +
          frontInner +
          '</div></div><div class="react-bb-flipoverlay"></div></div></div><div class="react-bb-back"><div class="react-bb-outer"><div class="react-bb-content" style="width:' +
          this.elementWidth +
          'px"><div class="react-bb-inner">' +
          backInner +
          '</div></div><div class="react-bb-flipoverlay"></div></div></div>';
        break;
      }
      case 'right':
        /*
        <div class="react-bb-page" style="z-index:101;">
            <div class="react-bb-front">
                <div class="react-bb-outer">
                    <div class="react-bb-content">
                        <div class="react-bb-inner">
                            dir==='next' ? [content of next page] : [content of current page]
                        </div>
                    </div>
                    <div class="react-bb-overlay"></div>
                </div>
            </div>
        </div>
        */
        const inner =
          dir === 'next' && this.nextItem
            ? this.nextItem.innerHTML
            : this.current
            ? this.current.innerHTML
            : '';
        //console.log('innerHTML', inner);
        sideElement.innerHTML =
          '<div class="react-bb-front"><div class="react-bb-outer"><div class="react-bb-content"><div class="react-bb-inner">' +
          inner +
          '</div></div><div class="react-bb-overlay"></div></div></div>';
        break;
    }

    return sideElement;
  }

  startSlideshow() {
    this.slideshow = setTimeout(() => {
      this.navigate('next');
      if (this.options.autoplay) {
        this.startSlideshow();
      }
    }, this.options.interval);
  }

  stopSlideshow() {
    if (this.options.autoplay) {
      clearTimeout(this.slideshow);
      this.options.autoplay = false;
    }
  }

  next() {
    this.actions(this.options.direction === 'ltr' ? 'next' : 'prev');
  }

  prev() {
    this.actions(this.options.direction === 'ltr' ? 'prev' : 'next');
  }

  jump(page: number) {
    page -= 1;

    if (page === this.currentIndex || page >= this.itemsCount || page < 0) {
      return false;
    }
    let dir;
    if (this.options.direction === 'ltr') {
      dir = page > this.currentIndex ? 'next' : 'prev';
    } else {
      dir = page > this.currentIndex ? 'prev' : 'next';
    }
    this.actions(dir, page);
  }

  last() {
    this.jump(this.itemsCount);
  }

  first() {
    this.jump(1);
  }

  resizeHandler() {
    const delayed = () => {
      this.resize();
      this.resizeTimeout = null;
    };
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(delayed, 50);
  }

  resize() {
    // update width value
    this.elementWidth = this.element.offsetWidth;
  }

  isActive() {
    return this.isAnimating;
  }

  update() {
    const currentItem = this.items[this.currentIndex];
    this.items = Array.prototype.slice.call(
      this.element.querySelectorAll('.react-bb-item')
    );
    this.itemsCount = this.items.length;
    this.currentIndex = this.items.indexOf(currentItem);
  }

  destroy() {
    if (this.options.autoplay) {
      this.stopSlideshow();
    }
  }

  static defaultOptions(): BookBlockOptions {
    return {
      // page to start on
      startPage: 1,
      // vertical or horizontal flip
      orientation: 'horizontal',
      // ltr (left to right) or rtl (right to left)
      direction: 'ltr',
      // speed for the flip transition in ms
      speed: 1000,
      // easing for the flip transition
      easing: 'ease-in-out',
      // if set to true, both the flipping page and the sides will have an overlay to simulate shadows
      shadows: true,
      // opacity value for the "shadow" on both sides (when the flipping page is over it)
      // value : 0.1 - 1
      shadowSides: 0.2,
      // opacity value for the "shadow" on the flipping page (while it is flipping)
      // value : 0.1 - 1
      shadowFlip: 0.1,
      // if we should show the first item after reaching the end
      circular: false,
      // if we want to specify a selector that triggers the next() function. example: ´#bb-nav-next´
      nextElement: '',
      // if we want to specify a selector that triggers the prev() function
      prevElement: '',
      // autoplay. If true it overwrites the circular option to true
      autoplay: false,
      // time (ms) between page switch, if autoplay is true
      interval: 3000,
      // 3d perspective
      perspective: 1200,
      // callback after the flip transition
      // old is the index of the previous item
      // page is the current item´s index
      // isLimit is true if the current page is the last one (or the first one)
      onEndFlip: () => null,
      // callback before the flip transition
      // page is the current item´s index
      onBeforeFlip: () => null,
    };
  }
}
