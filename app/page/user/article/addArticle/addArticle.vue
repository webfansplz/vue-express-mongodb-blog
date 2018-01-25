<template>
  <div id="addArticle">
     <Form :model="formItem" :label-width="80">
        <FormItem label="文章标题">
            <Input v-model="formItem.input" placeholder="Enter title..."></Input>
        </FormItem>
        <FormItem label="文章标签">
            <Input v-model="formItem.input" placeholder="Enter title..."></Input>
        </FormItem>
        <FormItem label="文章内容">
            <mavonEditor @save-content="getContent"></mavonEditor>
        </FormItem>
    </Form>
  </div>
</template>
<script>
import mavonEditor from 'components/mavonEditor/mavonEditor';
export default {
  data() {
    return {
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      },
      content: ''
    };
  },
  methods: {
    //获取内容
    getContent(val) {
      console.log(val);
    }
  },
  components: {
    mavonEditor
  }
};
</script>
<style lang="less" scoped>
@import url('./addArticle');
</style>
