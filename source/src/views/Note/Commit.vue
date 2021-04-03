<template>
  <div class="write">
    <h2 class="title-h2">发表留言</h2>
    <el-input class="title" v-model="title" placeholder="请填写标题"></el-input>
    <el-input
      class="board"
      type="textarea"
      :rows="4"
      placeholder="留言一旦发表将不可撤回，请规范您的言行"
      v-model="content"
    ></el-input>
    <el-button type="primary" class="submit" @click="submit">提交</el-button>
  </div>
</template>

<script>
import { postNote } from "@/api/note";
import { showAsynConfirm } from "@/mixins/messageBox.js";

export default {
  data() {
    return {
      title: "",
      content: ""
    };
  },
  methods: {
    submit() {
      showAsynConfirm("留言一旦发表不可撤回，确定要提交？", "已取消提交", done => {
        setTimeout(() => {
          this._submit(done);
        }, 100);
      });
    },
    async _submit(done) {
      try {
        await postNote(this.title, this.content);
        this.$message({
          type: "success",
          message: "留言发表成功！"
        });
        done();
        this.$router.push("/note/all");
      } catch (m) {
        var error_message = "";
        done();
        if (m.indexOf("content") != -1) {
          this.error_message = "内容不能为空";
        } else if (m.indexOf("title") != -1) {
          this.error_message = "标题不能为空";
        } else {
          this.error_message = m;
        }
        this.$message({
          type: "error",
          message: "留言发表失败：" + this.error_message
        });
      }
      this.title = this.content = "";
    }
  }
};
</script>

<style lang="scss">
.board {
  textarea {
    resize: none;
  }
}
</style>

<style lang="scss" scoped>
.write {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
}

.title {
  height: 30px;
  width: 100%;
  -moz-outline-radius: 5px;
  flex-grow: 1;
  margin: 1em 0;
  font-size: 0.8em;
}

.title-h2 {
  margin: 1em 0 0 0;
}

.board {
  margin: 1em 0;
}

.submit {
  width: 100px;
  margin-top: 25px;
}

@media screen and (max-width: 940px) {
  .title-h2,
  .title,
  .board {
    font-size: 13px;
  }
  .submit {
    transform: scale(0.90,0.90)
  }
}

@media screen and (max-width: 540px) {
  .title-h2,
  .title,
  .board {
    font-size: 12px;
  }
  .submit {
    transform: scale(0.80,0.80);
    margin: -5px 0 0 -10px;
  }
}
</style>
