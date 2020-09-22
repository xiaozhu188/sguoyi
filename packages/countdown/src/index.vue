<template>
    <div class="countdown-wrapper">
        <slot :slotData="slotData">
            <span>{{ days }}天 {{ hours }}小时 {{ minutes }}分 {{ seconds }}秒</span>
        </slot>
    </div>
</template>

<script>
    const MILLISECONDS_SECOND = 1000;
    const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
    const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
    const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;

    function isNative(constructor) {
        return typeof constructor === 'function' && /native code/g.test(constructor.toString())
    }

    export default {
        name: 'Countdown',
        data() {
            return {
                counting: false, // 是否在倒计时
                endTime: 0, // 倒计时结束时间(毫秒级)
                totalMilliseconds: 0, // 总共毫秒数
            };
        },
        props: {
            // 是否自动倒计时
            autoStart: {
                type: Boolean,
                default: true
            },
            // 是否分发事件
            emitEvents: {
                type: Boolean,
                default: true
            },
            // 倒计时步数
            interval: {
                type: Number,
                default: 1000,
                validator: value => value >= 0
            },
            // 当前客户端时间戳(毫秒级)
            now: {
                type: Number,
                default: () => Date.now()
            },
            // 倒计时时长(毫秒级)
            time: {
                type: Number,
                default: 0,
                validator: value => value >= 0
            },
        },
        computed: {
            // 折算日数
            days() {
                return Math.floor(this.totalMilliseconds / MILLISECONDS_DAY);
            },
            // 折算小时数
            hours() {
                return Math.floor(this.totalMilliseconds % MILLISECONDS_DAY / MILLISECONDS_HOUR);
            },
            // 折算分钟数
            minutes() {
                return Math.floor(this.totalMilliseconds % MILLISECONDS_HOUR / MILLISECONDS_MINUTE);
            },
            // 折算秒数
            seconds() {
                return Math.floor(this.totalMilliseconds % MILLISECONDS_MINUTE / MILLISECONDS_SECOND);
            },
            // 折算毫秒数
            milliseconds() {
                return Math.floor(this.totalMilliseconds % MILLISECONDS_SECOND);
            },
            totalDays() {
                return this.days;
            },
            totalHours() {
                return Math.floor(this.totalMilliseconds / MILLISECONDS_HOUR);
            },
            totalMinutes() {
                return Math.floor(this.totalMilliseconds / MILLISECONDS_MINUTE);
            },
            totalSeconds() {
                return Math.floor(this.totalMilliseconds / MILLISECONDS_SECOND);
            },
            slotData() {
                return {
                    days: this.days,
                    hours: this.hours,
                    minutes: this.minutes,
                    seconds: this.seconds,
                    milliseconds: this.milliseconds,
                    totalDays: this.totalDays,
                    totalHours: this.totalHours,
                    totalMinutes: this.totalMinutes,
                    totalSeconds: this.totalSeconds,
                    totalMilliseconds: this.totalMilliseconds
                }
            }
        },
        watch: {
            $props: {
                deep: true,
                immediate: true,
                handler() {
                    this.totalMilliseconds = this.time;
                    this.endTime = this.now + this.time;
                    if (this.autoStart) {
                        this.start();
                    }
                }
            }
        },
        methods: {
            start() {
                if (this.counting) {
                    return;
                }

                this.counting = true;

                if (this.emitEvents) {
                    this.$emit('start');
                }
                this.continue()
            },
            continue() {
                let _this = this;
                if (!this.counting) {
                    return;
                }
                let delay = Math.min(this.totalMilliseconds, this.interval);
                if (delay > 0) {
                    if (isNative(requestAnimationFrame)) {
                        let init;
                        let prev;

                        let step = function step(now) {
                            if (!init) {
                                init = now;
                            }

                            if (!prev) {
                                prev = now;
                            }

                            let range = now - init;

                            if (range >= delay ||
                                range + (now - prev) / 2 >= delay) {
                                _this.progress();
                            } else {
                                _this.requestId = requestAnimationFrame(step);
                            }

                            prev = now;
                        };

                        this.requestId = requestAnimationFrame(step);
                    } else {
                        this.timeoutId = setTimeout(function () {
                            _this.progress();
                        }, delay);
                    }
                } else {
                    this.end();
                }
            },
            pause() {
                if (isNative(cancelAnimationFrame)) {
                    cancelAnimationFrame(this.requestId);
                } else {
                    clearTimeout(this.timeoutId);
                }
            },
            progress() {
                if (!this.counting) {
                    return;
                }
                this.totalMilliseconds -= this.interval;
                if (this.emitEvents && this.totalMilliseconds > 0) {
                    this.$emit('progress', this.slotData);
                }

                this.continue();
            },
            abort() {
                if (!this.counting) {
                    return;
                }

                this.pause();
                this.counting = false;

                if (this.emitEvents) {
                    this.$emit('abort');
                }
            },

            end() {
                if (!this.counting) {
                    return;
                }

                this.pause();
                this.totalMilliseconds = 0;
                this.counting = false;

                if (this.emitEvents) {
                    this.$emit('end');
                }
            },
            update() {
                if (this.counting) {
                    this.totalMilliseconds = Math.max(0, this.endTime - this.now());
                }
            }
        },
        beforeDestroy() {
            this.pause();
        }
    };
</script>
