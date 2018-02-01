<template>
  <div id="mavonEditors">
    <mavon-editor v-model="value" :toolbars="toolbarsObj"  ref="editor" @save="saveContent" @change="saveContent" @imgAdd="uploadImg" @imgDel="delImg"/>
  </div>
</template>
<script>
import marked from 'marked';
export default {
  name: 'mavonEditors',
  data() {
    return {
      value: '',
      toolbarsObj: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: false, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        // link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        subfield: true, // 是否需要分栏
        fullscreen: false, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true // 右对齐
      }
    };
  },
  props: ['status'],
  computed: {
    //文章详情
    articleDetails() {
      return this.$store.state.article.articleDetails;
    }
  },
  created() {
    this.value = marked.lexer(this.articleDetails.content);
  },
  //清空markdown
  watch: {
    status(v) {
      if (v) {
        this.value = '';
      }
    }
  },
  methods: {
    saveContent(val) {
      this.$emit('save-content', marked(val));
    },
    uploadImg(pos, file) {
      this.$store
        .dispatch('article/upload', {
          name: file.name,
          cxt: file.miniurl
        })
        .then(res => {
          this.$refs.editor.$img2Url(pos, res.data.data.imgUrl);
          console.log(res.data.data.imgUrl);
        });
    },
    delImg(pos) {
      console.log(pos);
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./mavonEditor');
</style>
