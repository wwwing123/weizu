<template>
  <div>
    <mu-sub-header>排行榜每日更新，每日0点可看到最新数据！</mu-sub-header>
    <ol class="Ranking_ol">
      <li v-for="item in listdata" :key="item.name">
        <mu-list-item :title="item.name" @click="GoOthers(item.name)">
          <mu-avatar :src="item.icon + item.urlid" slot="leftAvatar"/>
          <span slot="describe">
                          截止{{item.time}}发布了{{item.number}}条帖子
                      </span>
          <mu-icon value="chevron_right" slot="right"/>
        </mu-list-item>
      </li>
    </ol>
  </div>
</template>

<script>
    export default {
      props:{
        listdata:{
          type:Array
        }
      },
      methods: {
        GoOthers(name){
          this.$router.push('/others/' + name);
        },

      }
    }
</script>

<style scoped>

</style>
