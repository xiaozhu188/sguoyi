export default {
  name: 'Intersection',
  abstract: true,
  props: {
    /**
     * A specific ancestor of the target element being observed.
     * If no value was passed to the constructor or this is null, the
     * top-level document's viewport is used.
     * @url: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root
     */
    root: {
      default: () => null
    },
    /**
     * An offset rectangle applied to the root's bounding box when
     * calculating intersections, effectively shrinking or growing the
     * root for calculation purposes. The value returned by this property
     * may not be the same as the one specified when calling the constructor
     * as it may be changed to match internal requirements. Each offset can be
     * expressed in pixels (px) or as a percentage (%).
     * The default is "0px 0px 0px 0px".
     * @url: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
     */
    rootMargin: {
      type: String,
      default: () => '0px 0px 0px 0px'
    },
    /**
     * A list of thresholds, sorted in increasing numeric order, where each threshold
     * is a ratio of intersection area to bounding box area of an observed target. Notifications
     * for a target are generated when any of the thresholds are crossed for that target. If no value
     * was passed to the constructor, 0 is used.
     * @url: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds
     */
    threshold: {
      type: Array,
      default: () => [0, 0.2]
    }
  },
  data () {
    return {
      _observer: null
    }
  },
  created () {
    if ('IntersectionObserver' in window) {
      this._observer = new IntersectionObserver((entries) => {
        let entry = entries[0]
        if (!entry.isIntersecting) {
          this.$emit('leave', entry)
        } else {
          this.$emit('enter', entry)
        }
        this.$emit('change', entry)
      }, {
        threshold: this.threshold,
        root: this.root,
        rootMargin: this.rootMargin
      })
    } else {
      console.warn('You need to polyfill IntersectionObserver')
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$slots.default && this.$slots.default.length > 1) {
        console.warn('You may only wrap one element in a <intersect> component.')
      } else if (!this.$slots.default || this.$slots.default.length < 1) {
        console.warn('You must have one child inside a <intersect> component.')
        return
      }
      this._observer && this._observer.observe(this.$slots.default[0].elm)
    })
  },
  destroyed () {
    this._observer && this._observer.disconnect()
  },
  render () {
    return this.$slots.default ? this.$slots.default[0] : null
  }
}
