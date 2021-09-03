// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import '../css/app.scss'
import 'alpinejs'
import CodersrankSummary from '@codersrank/summary/esm/codersrank-summary'


// // register web component as <codersrank-summary> element
// window.customElements.define('codersrank-summary', CodersrankSummary)

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import 'phoenix_html'
import { Socket } from 'phoenix'
import NProgress from 'nprogress'
import { LiveSocket } from 'phoenix_live_view'


let Hooks = {}


Hooks.Carousel = {
  mounted() {
    new Splide('#portfolio_carousel', {
      drag: true,
      classes: {
        // Add classes for arrows.
        arrows: 'splide__arrows',
        arrow : 'splide__arrow',
        prev  : 'splide__arrow--prev -ml-2 sm:ml-0',
        next  : 'splide__arrow--next -mr-2 sm:mr-0',

        // Add classes for pagination.
        pagination: 'splide__pagination flex justify-end pr-2', // container
        // page      : 'splide__pagination__page', // each button
      }  
    }).mount();
  }
}

Hooks.InnerCarousel = {
  mounted() {
    var elementId = '#' + this.el.id

    new Splide(elementId, {
      direction: 'ttb',
      speed: 600,
      type: 'loop',

      heightRatio: 0.3,
      perPage: 1,
      drag: true,
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 5000,
      easing: 'ease',
      breakpoints: {
        640: {
          heightRatio: 0.5
        }
      }
    }).mount();

  }

}


Hooks.AnimateOnIntersect = {
  mounted() {
    const animateClasses = this.el.dataset.animateClasses

    if (!animateClasses) return

    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          const parsedAnimateClasses = animateClasses
            .split(', ')
            .concat('animate__animated')
            .reverse()

          this.el.classList.add(...parsedAnimateClasses)
        }
      },
      { threshold: [parseFloat(this.el.dataset.threshold)] }
    )

    this.observer.observe(this.el)
  },
  destroyed() {
    this.observer.disconnect()
  },
}

let csrfToken = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute('content')

let liveSocket = new LiveSocket('/live', Socket, {
  // This is needed to make alpinejs work within liveview
  hooks: Hooks,
  dom: {
    onBeforeElUpdated(from, to) {
      if (from.__x) {
        window.Alpine.clone(from.__x, to)
      }
    },
  },
  params: { _csrf_token: csrfToken },
})

// Show progress bar on live navigation and form submits
window.addEventListener('phx:page-loading-start', (_info) => NProgress.start())
window.addEventListener('phx:page-loading-stop', (_info) => NProgress.done())

// connect if there are any LiveViews on the page
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket
