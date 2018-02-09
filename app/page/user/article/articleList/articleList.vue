<template>
  <div id="articlelist">
    <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight" mode="out-in">
      <Details v-if="detailState"></Details>
      <div class="list" v-else>
        <ul>
          <li class="title-box">
            <div class="img_box c">
              文章
            </div>
            <div class="contxt">
              <span>分类</span>
              <span>标签</span>
              <span>时间</span>
              <span>发布</span>
            </div>
            <div class="btn_box c">操作</div>
          </li>
          <li v-for="(item,i) in articleList.docs" :key="i">
            <div class="img_box c">
              <img :src="item.coverImg" :alt="item.title">
              <div>
                {{item.title}}
              </div>
            </div>
            <div class="contxt c">
              <span>
                <em v-for="(v,k) in item.category" :key="k">{{v.name}}</em>
              </span>
              <span>
                <em v-for="(v,k) in item.tags" :key="k">{{v.name}}</em>
              </span>
              <span>
                <i>{{item.create_at|formatDate}}</i>
              </span>
              <span>
                <em>{{item.isPublish|isPublish}}</em>
              </span>
            </div>
            <div class="btn_box">
              <div>
                <!-- <span><Button type="primary" @click="showDetails(item)">详情</Button></span> -->
                <span>
                  <Button type="success" @click="alterDetails(item)">修改</Button>
                </span>
                <span>
                  <Button type="warning" @click="delArticle(item)">删除</Button>
                </span>
              </div>
            </div>
          </li>
        </ul>
        <div>
          <Page :total="page_conf.total" :current="page_conf.page" :page-size="page_conf.limit"></Page>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Details from './articleDetails';
export default {
  name: 'articlelist',
  data() {
    return {
      page_conf: {
        page: 1,
        total: 10,
        limit: 10
      }
    };
  },
  components: {
    Details
  },
  created() {
    this.getArticles();
  },
  computed: {
    //文章列表
    articleList() {
      return this.$store.state.article.articleList;
    },
    //是否显示文章详情
    detailState() {
      return this.$store.state.article.detailState;
    }
  },
  methods: {
    //获取文章列表
    getArticles() {
      this.$store
        .dispatch('article/getArticles', {
          page: 1,
          page_size: 3
        })
        .then(res => {
          this.page_conf = res;
        });
    },
    //删除文章
    delArticle(item) {
      let _this = this;
      this.$Modal.confirm({
        content: `确定要删除${item.title}吗?`,
        onOk() {
          _this.$store.dispatch('article/removeArticle', item._id).then(res => {
            if (res.data.state == 0) {
              this.$Message.success(res.data.message);
              _this.$store.dispatch('article/getArticles');
            } else {
              this.$Message.error(res.data.message);
            }
          });
        }
      });
    },
    //修改文章
    alterDetails(item) {
      this.$store.commit('article/setArticleDetails', item);
      this.$router.push('/newArticle');
    }
  },
  filters: {
    //是否发布
    isPublish(v) {
      return v ? '已发布' : '未发布';
    }
  }
};
</script>
<style lang="less" scoped>
@import url('./articleList');
</style>
