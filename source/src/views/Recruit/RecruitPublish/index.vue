<template>
  <div class="recruit-publish">
    <section class="editor">
      <p class="title">发布信息</p>
      <div class="editor-selector">
        <el-radio-group v-model="editor.recruit_type">
          <el-radio :label="1">我是队长，我要招募队友</el-radio>
          <el-radio class="el-radio-2" :label="0">我想要加入其它队伍</el-radio>
        </el-radio-group>
      </div>
      <div class="write">
        <el-input class="editor-title" v-model="editor.title" placeholder="请填写招募信息标题"></el-input>
        <el-input
          class="editor-content"
          type="textarea"
          :rows="4"
          :placeholder="placeholder"
          v-model="editor.content"
        ></el-input>
        <p class="warning">请不要在详情中留下队伍口令，防止他人误加入队伍。</p>
      </div>
      <el-button class="button button-1" type="primary" @click="submit">发布</el-button>
      <el-button class="button button-2" type="primary" @click="save">保存到未发布中</el-button>
    </section>
  </div>
</template>

<script>
import { showAsynConfirm } from "@/mixins/messageBox.js";
import { mapGetters, mapMutations } from "vuex";
import { postRecruit } from "@/api/recruit";

export default {
  name: "RecruitPublish",
  data() {
    return {
      editor: {
        title: "",
        content: "",
        recruit_type: "",
        status: ""
      }
    };
  },
  methods: {
    ...mapMutations({
      setRecruitStatus: "setRecruitStatus"
    }),
    submit() {
      showAsynConfirm("您确定要发布此条招募信息？", "已取消提交", done => {
        this.setRecruitStatus(1);
        this.editor.status = this.recruitStatus;
        setTimeout(() => {
          this._submit(done);
        }, 100);
      });
    },
    async _submit(done) {
      //还没有确认提示，跳转之后导航条也会以后问题。一开始进入页面也没有自动打开招募广场。
      try {
        const data = await postRecruit(this.editor);
        this.$message({
          type: "success",
          message: "恭喜，招募信息发布成功"
        });
        done();
        this.$router.push("/recruit/square");
      } catch (message) {
        done();
        var error_message = "";
        if (message.indexOf("content") != -1) {
          this.error_message = "内容不能为空！";
        } else if (message.indexOf("title") != -1) {
          this.error_message = "标题不能为空！";
        } else if (message.indexOf("recruit") != -1) {
          this.error_message = "请选择招募队友或者加入队伍！";
        } else {
          this.error_message = message;
        }
        this.$message({
          type: "warning",
          message: "招募发布失败，" + this.error_message
        });
      }
    },
    save() {
      showAsynConfirm("您确定要保存此条招募信息？", "已取消保存", done => {
        this.setRecruitStatus(0);
        setTimeout(() => {
          this._save(done);
        }, 100);
      });
    },
    async _save(done) {
      //还没有确认提示，跳转之后导航条也会以后问题。一开始进入页面也没有自动打开招募广场。
      try {
        this.editor.status = this.recruitStatus;
        const data = await postRecruit(this.editor);
        this.$message({
          type: "success",
          message: "招募信息保存成功！"
        });
        done();
        this.$router.push("/recruit/square");
      } catch (message) {
        done();
        var error_message = "";
        if (message.indexOf("content") != -1) {
          this.error_message = "内容不能为空！";
        } else if (message.indexOf("title") != -1) {
          this.error_message = "标题不能为空！";
        } else if (message.indexOf("recruit") != -1) {
          this.error_message = "请选择招募队友或者加入队伍！";
        } else {
          this.error_message = message;
        }
        this.$message({
          type: "warning",
          message: "招募保存失败，" + this.error_message
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      recruitStatus: "recruitStatus"
    }),
    placeholder() {
      const map = {
        1: "建议您在详情中说明清楚实践的时间、地点、联系方式等问题。",
        2: "建议您在详情中介绍个人情况与能力，期望的实践类型等问题。"
      };
      return map[this.editor.type];
    }
  }
};
</script>

<style lang="scss">
.recruit-publish {
  .title {
    font-size: 25px;
    font-family: "Microsoft YaHei";
    color: rgb(78, 64, 53);
    font-weight: bold;
    transform: scale(0.94, 1.08);
    margin-bottom: 15px;
    margin-left: -10px;
  }

  .write {
    display: flex;
    flex-direction: column;
  }

  .editor-selector {
    height: 40px;
  }

  .editor-title {
    height: 40px;
    margin: 20px 0 20px 0;
  }

  .editor-content {
    textarea {
      resize: none;
    }
  }

  .warning {
    margin: 1em 0;
    color: red;
    font-weight: bold;
    height: 80px;
  }
}

@media screen and (max-width: 830px) {
  .editor {
    font-size: 18px;
    .title {
      font-size: 18px;
    }
    .el-radio__label {
      font-size: 14px;
    }
  }
}

@media screen and (max-width: 550px) {
  .editor {
    font-size: 14px;
    .title {
      font-size: 14px;
    }
    .el-radio__label {
      font-size: 13px;
    }
    button,
    input {
      transform: scale(0.80,0.80)
    }
    input {
      margin-left: -20px;
    }
    .button-2 {
      margin-left: -10px;
    }
    .warning {
      font-size: 15px;
    }
  }
}

@media screen and (max-width: 470px) {
  .editor {
    font-size: 12px;
    .title {
      font-size: 12px;
    }
    .el-radio__label {
      font-size: 12px;
    }
    .el-radio-2 {
      margin-left: 0px;
    }
    button {
      transform: scale(0.70,0.70);
      margin-top: -20px;
    }
  }
}
</style>