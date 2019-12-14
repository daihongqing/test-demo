<template>
  <section class="handleBox">
    <div class="header">
      <router-link class="return" :to="{path:'/',query:{time:time}}"></router-link>
      <h3>日志管理</h3>
    </div>

    <!-- 新增 -->
    <div class="content" v-if="!id">
      <div class="info">
        <span>日志标题：</span>
        <div class="inp">
          <input type="text" v-model="title" />
        </div>
      </div>
      <div class="info">
        <span>日志内容：</span>
        <div class="inp">
          <textarea v-model="content"></textarea>
        </div>
      </div>
      <a href="javascript:;" class="submit" @click="addHandle">新增</a>
    </div>

    <!-- 显示 -->
    <div class="content" v-else>
      <div class="tip" v-if="!infoData"></div>
      <div v-else>
        <div class="info">
          <span>日志标题：</span>
          <div class="inp">
            <p>{{infoData.title}}</p>
          </div>
        </div>
        <div class="info">
          <span>日志内容：</span>
          <div class="inp">
            <p>{{infoData.content}}</p>
          </div>
        </div>
        <a href="javascript:;" class="submit" @click="removeHandle">删除</a>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      id: null,
      time: "",
      title: "",
      content: "",
      infoData: null
    };
  },
  created() {
    let { time, id } = this.$route.query;
    if (!time) return;
    this.time = decodeURIComponent(time);
    if (id) {
      this.id = id;
      //=>获取数据
      this.infoData = this.$storage.get(this.time, this.id);
    }
  },
  methods: {
    removeHandle() {
      let flag = window.confirm("确定要删除此任务吗？");
      if (flag) {
        flag = this.$storage.del(this.time, this.id);
        if (flag) {
          alert("恭喜您，删除成功！");
          this.$router.push(`/?time=${this.time}`);
        }
      }
    },
    addHandle() {
      let flag = this.$storage.set(this.time, this.title, this.content);
      if (flag) {
        alert("恭喜您，增加成功！");
        this.$router.push(`/?time=${this.time}`);
      }
    }
  }
};
</script>
<style lang="less">
.handleBox {
  .header {
    position: relative;
    height: 1rem;
    line-height: 1rem;
    color: #fff;
    background: #0fc37c;

    h3 {
      text-align: center;
      font-size: 0.32rem;
      font-weight: normal;
    }

    .return {
      position: absolute;
      top: 0;
      left: 0;
      width: 1rem;
      height: 1rem;
      background: url("../assets/images/fanhui.svg") no-repeat center center;
      background-size: 40% 40%;
    }
  }

  .tip {
    height: 4rem;
    background: url("../assets/images/no-data.svg") no-repeat center center;
    background-size: 35%;
  }

  .content {
    padding: 0.3rem;

    .info {
      margin-bottom: 0.2rem;
      line-height: 0.6rem;
      font-size: 0.28rem;

      span {
        font-weight: bold;
      }

      input,
      textarea {
        box-sizing: border-box;
        padding: 0 0.1rem;
        width: 90%;
        height: 0.6rem;
        line-height: 0.6rem;
        border: 0.02rem solid #ddd;
      }

      textarea {
        height: 1.8rem;
      }
    }

    .submit {
      display: block;
      width: 20%;
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      font-size: 0.32rem;
      color: #fff;
      background: #0fc37c;
    }
  }
}
</style>