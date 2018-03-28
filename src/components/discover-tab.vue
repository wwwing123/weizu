<template>
    <div>
      <mu-card>
        <img style="width:100%" :src="`${listData.icon}+${listData.urlid}`" />
        <mu-list-item @click="GoOthers(listData.name)" :title="listData.name" :describeText="`性别: ${listData.gender} - 爱好: ${listData.hobby}`">
          <mu-avatar :src="`${listData.icon}+${listData.urlid}`" slot="leftAvatar"/>
          <mu-icon value="chevron_right" slot="right"/>
        </mu-list-item>
        <div class="Card-content">
          {{listData.signature}}
        </div>
      </mu-card>
      <mu-raised-button style="margin-top:2em" label="下一个" @click="DiscoverLogin" secondary fullWidth/>
    </div>
</template>

<script>
    export default{
      props:{
        listData:{
          type:Object
        },
        activeTab:{
          type:String
        }
      },
      data(){
        return{
        }
      },
      methods:{
        DiscoverLogin(){
            this.$emit('update',this.activeTab);
        },
        closeLoading(){
          this.$loading.close();
        }
      }
    }

</script>

<style scoped>

</style>
