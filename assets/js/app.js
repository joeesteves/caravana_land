// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import '../css/app.scss'
import 'alpinejs'
import CodersrankSummary from '@codersrank/summary'

// register web component as <codersrank-summary> element
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

//  Carousel JS logic
Hooks.Carousel = {
  mounted() {
    window.carouselHook = this
    var slideIndex = 2
    showSlides(slideIndex)

    // Next/previous controls
    function plusSlides(n) {
      showSlides((slideIndex += n))
    }

    // Thumbnail image controls
    function currentSlide(n) {
      showSlides((slideIndex = n))
    }

    function showSlides(n) {
      var i
      var slides = document.getElementsByClassName('mySlides')
      var dots = document.getElementsByClassName('dot')
      if (n > slides.length) {
        slideIndex = 1
      }
      if (n < 1) {
        slideIndex = slides.length
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '')
      }
      slides[slideIndex - 1].style.display = 'block'
      dots[slideIndex - 1].className += ' active'
    }
  },
  plusSlides(n) {
    console.log(n)
    showSlides((slideIndex += n))
  },
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
