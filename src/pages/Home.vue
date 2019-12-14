<template>
  <section class="homeBox">
    <div ref="calendar">
      <Calendar @changeMonth="changeMonth" @choseDay="choseDay" :markDate="mark"></Calendar>
    </div>
    <div class="recordBox" ref="record">
      <div class="tip" v-if="list.length===0"></div>
      <div class="infoBox" v-else>
        <ul class="list">
          <li class="item" v-for="item in list" :key="item.id">
            <router-link :to="{path:'/handle',query:{time:mark[0],id:item.id}}">
              <i></i>
              <span>{{item.time}}</span>
              <div class="con">
                <h3>{{item.title}}</h3>
                <p>{{item.content}}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-link :to="{path:'/handle',query:{time:mark[0]}}" class="addBtn"></router-link>
  </section>
</template>
<script>
import Calendar from "vue-calendar-component";
export default {
  data() {
    return {
      mark: [],
      day: "",
      list: []
    };
  },
  components: {
    Calendar
  },
  methods: {
    //计算RECORD的高度
    computedRecordHeight() {
      let awaitTimer = setTimeout(() => {
        clearTimeout(awaitTimer);
        this.$refs.record.style.height =
          document.documentElement.clientHeight -
          this.$refs.calendar.offsetHeight +
          "px";
      }, 10);
    },
    //日期切换
    changeMonth() {
      this.computedRecordHeight();
    },
    choseDay(time) {
      if (this.$route.query.time) {
        this.$router.push("/");
      }
      this.mark = [this.$storage.formatTime(time)];
      this.initData();
    },
    //获取数据
    initData() {
      let time = this.mark.length === 0 ? this.day : this.mark[0];
      let data = this.$storage.get(time);
      if (data && Array.isArray(data)) {
        this.list = data;
      } else {
        this.list = [];
      }
    }
  },
  created() {
    //=>获取日期
    this.day = this.$storage.formatDate(new Date());
    this.mark = [this.day];
    let { time } = this.$route.query;
    if (time) {
      this.mark = [decodeURIComponent(time)];
    }
    this.initData();
  },
  mounted() {
    this.computedRecordHeight();
    window.addEventListener("resize", () => {
      this.computedRecordHeight();
    });
  }
};
</script>
<style lang="less">
.wh_content_all {
  padding-bottom: 0 !important;

  .wh_isToday {
    background: #9bcd9b !important;
  }

  .wh_isMark,
  .wh_chose_day {
    background: green !important;
  }
}

.homeBox {
  position: relative;
  height: 100%;
  overflow: hidden;

  .addBtn {
    position: absolute;
    right: 0.2rem;
    bottom: 0.5rem;
    z-index: 10;
    width: 1rem;
    height: 1rem;
    background: url("../assets/images/jia.svg") no-repeat #fff;
    background-size: 100% 100%;
  }

  .recordBox {
    box-sizing: border-box;
    padding: 0.2rem;
    overflow: auto;

    .tip {
      height: 100%;
      background: url("../assets/images/no-data.svg") no-repeat center center;
      background-size: 35%;
    }

    .infoBox {
      background: url("../assets/images/shuxian.svg") repeat-y left;
      background-size: 0.6rem;

      .list {
        .item {
          position: relative;
          a {
            display: block;
            color: #555;
          }

          i,
          span {
            position: absolute;
          }

          i {
            top: 0.3rem;
            left: 0.05rem;
            width: 0.5rem;
            height: 0.5rem;
            background: url("../assets/images/shijianzhou.svg") no-repeat;
            background-size: 100% 100%;
          }

          span {
            top: 0.35rem;
            left: 0.58rem;
            font-size: 0.32rem;
          }

          .con {
            padding-top: 0.2rem;
            padding-bottom: 0.2rem;
            margin-left: 1.6rem;
            border-bottom: 0.02rem solid #eee;

            h3 {
              font-size: 0.32rem;
              line-height: 0.5rem;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }

            p {
              font-size: 0.28rem;
              line-height: 0.5rem;
              max-height: 1rem;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>