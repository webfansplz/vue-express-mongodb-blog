<template>
<div id="userMenu">
    <nav class="userMenu">
      <ul>
        <li v-for="(item,v) in menuList" :key="v" :class="{'active':v==tabIndex}" @click="toggleMenu(item,v)">
          <i :class="`ic ic-${item.icon}`"></i>
          {{item.name}}
          <div class="second-menu" v-if="item.children" >
            <ul>
              <li v-for="(items,k) in item.children" :key="k" :class="{'active':`/${items.path}`==$route.path}" @click="toggleMenu(items)">
                {{items.name}}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
</div>
</template>
<script>
export default {
  name: 'userMenu',
  //props,methods,data,computed,watch
  data() {
    return {
      tabIndex: 0,
      menuList: [
        {
          name: '文章管理',
          icon: 'articles',
          children: [
            {
              name: '文章列表',
              path: 'articleList'
            },
            {
              name: '新增文章',
              path: 'newArticle'
            },
            {
              name: '文章分类',
              path: 'cateGory'
            },
            {
              name: '文章标签',
              path: 'articleTags'
            }
          ]
        }
      ]
    };
  },
  methods: {
    toggleMenu(item, i) {
      this.tabIndex = i;
      item.path && this.$emit('toggle-menu', item.path);
    }
  },
  created() {
    this.$emit('toggle-menu', 'articleList');
  }
};
</script>
<style lang="less" scoped>
@import url('./userMenu');
</style>
