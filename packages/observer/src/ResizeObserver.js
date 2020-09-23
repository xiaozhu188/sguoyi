import { debounce, isNative } from "../../utils";
import { WAIT_TIME } from './config'

export default {
    name: 'Resize',
    abstract: true,
    props: {},
    data () {
        return {
            _observer: null
        }
    },
    created () {
        if (isNative(ResizeObserver)) {
            this._observer = new ResizeObserver(debounce((entries) => {
                this.$emit('resize', entries[0])
            }, WAIT_TIME))
        } else {
            console.warn('You need to polyfill ResizeObserver')
        }
    },
    mounted () {
        this.$nextTick(() => {
            if (this.$slots.default && this.$slots.default.length > 1) {
                console.warn('You may only wrap one element in a <resize> component.')
            } else if (!this.$slots.default || this.$slots.default.length < 1) {
                console.warn('You must have one child inside a <resize> component.')
                return
            }
            this._observer && this._observer.observe(this.$slots.default[0].elm)
        })
    },
    destroyed () {
        this._observer && this._observer.unobserve(this.$slots.default[0].elm)
    },
    render () {
        return this.$slots.default ? this.$slots.default[0] : null
    },
    methods: {
        unobserve () {
            this._observer && this._observer.unobserve(this.$slots.default[0].elm)
        }
    }
}
