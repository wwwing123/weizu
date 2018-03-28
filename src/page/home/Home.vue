<template>
  <div>
    <mu-tabs :value="activeTab" @change="handleTabChange" class="tab">
      <mu-tab value="colligate" icon="domain" title="综合"/>
      <mu-tab value="seekrent" icon="visibility" title="求租"/>
      <mu-tab value="Arent" icon="cast" title="出租"/>
      <mu-tab value="roommate" icon="group" title="室友"/>
      <mu-tab :value="LaBel_Type" :icon="LaBel_icon" :title="'#'+LaBel_name" @click="open('bottom')"/>
    </mu-tabs>
    <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="close('bottom')">
      <mu-flat-button label="关闭" color="black" @click="close('bottom')" class="closebtn" icon="clear"/>
      <mu-content-block>
        <mu-row>
          <mu-col width="33" tablet="33" desktop="33" v-for="item in LaBel_Data" :key="item.id" class="label">
            <mu-raised-button :label="item.name" class="demo-raised-button" :backgroundColor="item.color" @click="loadingLabel(item.type,item.name,item.icon)"/>
          </mu-col>
        </mu-row>
      </mu-content-block>
    </mu-popup>
    <div class="tabTop">
      <div v-if="activeTab === 'colligate'">
        <mu-card v-for="item in colligate" :key="item.id">
          <mu-card-header :title="item.name + ' | ' + '#' + item.type" :subTitle="item.date">
            <mu-avatar :src="item.icon + item.see" slot="avatar"/>
          </mu-card-header>
          <mu-card-text>
            {{item.source}}
            <mu-badge class="demo-badge-content">#{{item.label}}</mu-badge>
          </mu-card-text>
          <mu-flexbox>
            <mu-flexbox-item v-for="pic in item.url" :key="pic.id">
              <img v-lazy="pic.name+item.urlid">
            </mu-flexbox-item>
          </mu-flexbox>
          <mu-row class="card-bottom">
            <mu-col width="60" tablet="50" desktop="50">
              <div class="card-bottom-box">
                <mu-icon value="remove_red_eye" :size="20"/>
                <p>{{item.see}}</p>
              </div>
            </mu-col>
            <mu-col width="20" tablet="25" desktop="25">
              <div class="card-bottom-box" @click="myfavorite(item.fabulous)">
                <mu-icon v-if="fabulous.indexOf(item.fabulous)>0" value="favorite" :size="20"/>
                <mu-icon v-else value="favorite_border" class="card-bottom-icon" :size="20"/>
                <p>{{item.fabulous}}</p>
              </div>
            </mu-col>
            <mu-col width="20" tablet="25" desktop="25">
              <div class="card-bottom-box">
                <mu-icon value="chat" :size="20"/>
                <p>{{item.comment}}</p>
              </div>
            </mu-col>
          </mu-row>
        </mu-card>
      </div>
      <div v-if="activeTab === 'seekrent'">
        <mu-card v-for="item in colligate" :key="item.id">
          <mu-card-header :title="item.name + ' | ' + '#' + item.type" :subTitle="item.date">
            <mu-avatar :src="item.icon + item.see" slot="avatar"/>
          </mu-card-header>
          <mu-card-text>
            {{item.source}}
            <mu-badge class="demo-badge-content">#{{item.label}}</mu-badge>
          </mu-card-text>
          <mu-flexbox>
            <mu-flexbox-item v-for="pic in item.url" :key="pic.id">
              <img v-lazy="pic.name+item.urlid">
            </mu-flexbox-item>
          </mu-flexbox>
          <mu-row class="card-bottom">
            <mu-col width="60" tablet="50" desktop="50">
              <div class="card-bottom-box">
                <mu-icon value="remove_red_eye" :size="20"/>
                <p>{{item.see}}</p>
              </div>
            </mu-col>
            <mu-col width="20" tablet="25" desktop="25">
              <div class="card-bottom-box" @click="myfavorite(item.fabulous)">
                <mu-icon v-if="fabulous.indexOf(item.fabulous)>0" value="favorite" :size="20"/>
                <mu-icon v-else value="favorite_border" class="card-bottom-icon" :size="20"/>
                <p>{{item.fabulous}}</p>
              </div>
            </mu-col>
            <mu-col width="20" tablet="25" desktop="25">
              <div class="card-bottom-box">
                <mu-icon value="chat" :size="20"/>
                <p>{{item.comment}}</p>
              </div>
            </mu-col>
          </mu-row>
        </mu-card>
      </div>
      <div v-if="activeTab === 'Arent'" class="seize-seat-top">
        <mu-card v-for="item in Arent" :key="item.id">
          <mu-card-header :title="item.name + ' | ' + '#' + item.type" :subTitle="item.date">
            <mu-avatar :src="item.icon + item.see" slot="avatar"/>
            <div class="card-bottom-data" style="color:red;font-size:1.5em;position:absolute;right:3%;top:13%;">
              <p>￥{{item.comment}}</p>
            </div>
            <div class="card-bottom-data" style="position:absolute;right:3%;bottom:20%;display:flex;-webkit-display:flex;">
              <mu-icon value="location_on" :size="20" class="card-bottom-icon"/>
              <p>{{item.see}}</p>
            </div>
          </mu-card-header>
          <mu-flexbox>
            <mu-flexbox-item class="flex-demo" v-for="items in item.url" :key="items.id">
              <img class="mu-col-img" v-lazy="items.name + item.urlid" :zDepth="1">
            </mu-flexbox-item>
          </mu-flexbox>
          <mu-card-text>
            {{item.source}}
          </mu-card-text>
        </mu-card>
      </div>
      <div v-if="activeTab === 'roommate'" class="seize-seat-top">
        <mu-card v-for="item in colligate" :key="item.id">
          <mu-card-header :title="item.name + ' | ' + '#' + item.type" :subTitle="item.date">
            <mu-avatar :src="item.icon + item.see" slot="avatar"/>
          </mu-card-header>
          <mu-card-text>
            {{item.source}}
            <mu-badge class="demo-badge-content">#{{item.label}}</mu-badge>
          </mu-card-text>
          <mu-flexbox>
            <mu-flexbox-item v-for="pic in item.url" :key="pic.id">
              <img v-lazy="pic.name+item.urlid">
            </mu-flexbox-item>
          </mu-flexbox>
          <mu-row class="card-bottom">
            <mu-col width="60" tablet="50" desktop="50">
              <div class="card-bottom-box">
                <mu-icon value="remove_red_eye" :size="20"/>
                <p>{{item.see}}</p>
              </div>
            </mu-col>
            <mu-col width="20" tablet="25" desktop="25">
              <div class="card-bottom-box" @click="myfavorite(item.fabulous)">
                <mu-icon v-if="fabulous.indexOf(item.fabulous)>0" value="favorite" :size="20"/>
                <mu-icon v-else value="favorite_border" class="card-bottom-icon" :size="20"/>
                <p>{{item.fabulous}}</p>
              </div>
            </mu-col>
            <mu-col width="20" tablet="25" desktop="25">
              <div class="card-bottom-box">
                <mu-icon value="chat" :size="20"/>
                <p>{{item.comment}}</p>
              </div>
            </mu-col>
          </mu-row>
        </mu-card>
      </div>
      <div v-if="activeTab === LaBel_Type">
        <mu-card v-for="item in type_Data" :key="item.id">
          <mu-card-header :title="item.name + ' | ' + '#' + item.type" :subTitle="item.date">
            <mu-avatar :src="item.icon + item.see" slot="avatar"/>
          </mu-card-header>
          <mu-card-text>
            {{item.source}}
            <mu-badge class="demo-badge-content">#{{item.label}}</mu-badge>
          </mu-card-text>
          <mu-flexbox>
            <mu-flexbox-item v-for="pic in item.url" :key="pic.id">
              <img v-lazy="pic.name+item.urlid">
            </mu-flexbox-item>
          </mu-flexbox>
          <mu-row class="card-bottom">
            <mu-col width="60" tablet="50" desktop="50">
              <div class="card-bottom-box">
                <mu-icon value="remove_red_eye" :size="20"/>
                <p>{{item.see}}</p>
              </div>
            </mu-col>
            <mu-col width="20" tablet="25" desktop="25">
              <div class="card-bottom-box" @click="myfavorite(item.fabulous)">
                <mu-icon v-if="fabulous.indexOf(item.fabulous)>0" value="favorite" :size="20"/>
                <mu-icon v-else value="favorite_border" class="card-bottom-icon" :size="20"/>
                <p>{{item.fabulous}}</p>
              </div>
            </mu-col>
            <mu-col width="20" tablet="25" desktop="25">
              <div class="card-bottom-box">
                <mu-icon value="chat" :size="20"/>
                <p>{{item.comment}}</p>
              </div>
            </mu-col>
          </mu-row>
        </mu-card>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        LaBel_Data: {},//总数据
        activeTab: '',
        colligate: {},
        seekrent: {},
        Arent: {},
        roommate: {},
        type_Data: {},
        refreshing: false,
        bottomPopup: false,
        active_Tab_CN: {
          'colligate': '综合',
          'seekrent': '求租',
          'Arent': '出租',
          'roommate': '室友',
          'singwei': '独卫',
          'manchum': '男室友',
          'girlchum': '女室友',
          'sumroom': '晒房',
          'feedback': '反馈',
          'gossip': '闲聊',
          'lieidle': '闲置',
          'makefriends': '交友'
        },
        fabulous: '',
        LaBel_icon: 'view_comfy',
        LaBel_name: '标签',
        LaBel_Type: ''
      }
    },

    created() {
      axios.get('label').then(res => {
        if(res.status == 200)
      {
        this.LaBel_Data = res.data.data.list;
        sessionStorage.setItem("Lab_Data", this.LaBel_Data)
      }
    }).
      catch(err => {
        console.log(err);
    })
    },

    watch: {
      activeTab(curVal, oldVal) {
        sessionStorage.setItem('Lab_Tab', this.activeTab);
        this.loginData();
      }
    },

    mounted() {
      this.activeTab = sessionStorage.getItem("Lab_Tab") || 'colligate';
    },

    computed: {},

    methods: {
      handleTabChange(val) {
        this.activeTab = val;
      },
      PullTop() {
        this.refreshing = true;
      },
      loginData() {
        let active_Tab = this.activeTab;
        console.log(active_Tab)
        if (active_Tab != '') {
          this.$loading(this.active_Tab_CN[this.activeTab] + '话题正在' + '载入中...');
        }
        axios.get(active_Tab).then(res => {
          if(res.status == 200
      )
        {
          if (active_Tab == 'colligate') {
            this.colligate = res.data.data.list;
          } else if (active_Tab == 'seekrent') {
            this.seekrent = res.data.data.list;
          } else if (active_Tab == 'Arent') {
            this.Arent = res.data.data.list;
          } else if (active_Tab == 'roommate') {
            this.roommate = res.data.data.list;
          } else {

            this.type_Data = res.data.data.list;

          }
          this.refreshing = false;
          self = this;
          setTimeout(function () {
            self.$loading.close();
          }, 500)
        }
      })
      },
      myfavorite(value) {
        let array = localStorage.getItem('fabulous') ? localStorage.getItem('fabulous').split(',') : [];
        let length = array.length
        for (let i = 0; i < length; i++) {
          if (value == array[i]) {
            array.splice(i, 1);
            localStorage.setItem('fabulous', array);
            this.fabulous = localStorage.getItem('fabulous');
            return;
          }
        }
        array.push(value);
        localStorage.setItem('fabulous', array);
        this.fabulous = localStorage.getItem('fabulous');
      },
      open(position) {
        this[position + 'Popup'] = true
      },
      close(position) {
        this[position + 'Popup'] = false
      },
      loadingLabel(type, name, icon) {
        this.activeTab = type;
        this.LaBel_Type = type;
        this.LaBel_name = name;
        this.LaBel_icon = icon;
        this.bottomPopup = false;
      }


    }
  }
</script>
<style>
  .demo-popup-bottom {
    width: 100%;
  }

  .demo-popup-bottom .label {
    padding: 15px;
  }

  .demo-popup-bottom .closebtn {
    width: 100%;
  }

  .card-bottom {
    padding: 5px 16px;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
  }

  .card-bottom-box {
    display: -webkit-flex;
    display: flex;
    align-items: center;
    color: #9e9e9e;
  }

  .card-bottom p {
    -webkit-flex: 1;
    flex: 1;
    margin-left: 5px;
  }
</style>
<style scoped lang="less">
  .mu-card-text {
    padding-top: 0;
  }

  .demo-badge-content {
    background-color: #ffab00;
    color: #fff;
    padding-left: 4px;
    padding-right: 4px;
  }

  .mu-flexbox {
    padding: 0 16px;
  }

  .mu-flexbox-item img {
    max-width: 100%;
    height: auto;
  }

  .card-bottom-icon {
    display: inline-block;

  }

  img {
    transition: all 0.5s;
  }

  img[lazy=loaded] {
    animation: fade 0.5s;
  }
</style>
