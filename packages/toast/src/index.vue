<template>
  <div class="notices-wrapper" :class="{mask: 'useMask'}">
    <transition-group
      tag="div"
      name="zoom"
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
    >
      <div
        class="message-box"
        v-for="(notice) in notices"
        :key="notice.tId"
      >
        <a-icon :type="notice.icon" class="notice-icon" v-if="notice.icon" />
        <span class="notice-text">{{notice.content}}</span>
      </div>
    </transition-group>
  </div>
</template>

<script>

export default {
  data () {
    return {
      notices: [],
      duration: 2000,
      mask: false
    }
  },
  methods: {
    create (notice) {
      this.notices.push(notice)
      let { duration, tId } = notice
      this.closeTimer = setTimeout(() => {
        this.remove(tId)
      }, duration)
      return tId
    },
    remove (id) {
      const notices = this.notices
      for (let i = 0; i < notices.length; i++) {
        if (notices[i].tId === id) {
          this.notices.splice(i, 1)
          break
        }
      }
      this._clearCloseTimer()
    },
    destroy () {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    _clearCloseTimer () {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
    },
  }
}
</script>

<style lang="less" scoped>
@keyframes zoomIn {
  0% {
    transform: translate(-50%, -50%) scale(0.3);
    opacity: 0;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

@keyframes zoomOut {
  0% {
    transform: translate(-50%, -50%) scale(1);

  }
  20% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  80% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.3);
    opacity: 0;
  }
}

.zoomIn {
  animation-name: zoomIn;
  animation-duration: .2s;
  animation-timing-function: ease-in;
}

.zoomOut {
  animation-name: zoomOut;
  animation-duration: 1s;
}

.animated {
  animation-fill-mode: both;
}

.notices-wrapper {
  &.useMask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 4999;
  }
}

.message-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 80%;
  min-width: 120px;
  min-height: 40px;
  line-height: 1.1;
  padding: 5px 10px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 16px;

  .notice-icon {
    margin-right: 15px;
  }

  .notice-text {
    // font-size: inherit;
  }
}
</style>
