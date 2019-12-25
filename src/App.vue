<template>
  <div id="app">
    <a-input placeholder="请输入任务" :value="inputValue" @change="handleInputValue" class="my_ipt" />
    <a-button type="primary" @click="addItemToList">添加事项</a-button>
    <a-list bordered :dataSource="infolist" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="(e)=>{cbChangeStatus(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{undoList}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="keys == 'all' ? 'primary': 'default'" @click="changeViewKey('all')">全部</a-button>
          <a-button :type="keys == 'undone' ? 'primary': 'default'" @click="changeViewKey('undone')">未完成</a-button>
          <a-button :type="keys == 'done' ? 'primary': 'default'" @click="changeViewKey('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="cleanDone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
    }
  },
  methods: {
    ...mapMutations(['setInputValue','addItem','removeItem','changeStatus','cleanDone',
    'changeViewKey']),
    ...mapActions(['getAsync']),
    handleInputValue(e){
      this.setInputValue(e.target.value)
    },
    // 添加列表数据
    addItemToList(){
      if (this.inputValue.trim().length <= 0) {
        this.$message.warning('数据不能为空！')
        return false
      }
      this.addItem()
    },
    // 修改选中状态
    cbChangeStatus(e,id){
      const params = {
        id:id,
        status:e.target.checked
      }
      this.changeStatus(params)
    }
    
  },
  created() {
    this.getAsync()
  },
  computed: {
    ...mapState(['inputValue','keys']),
    ...mapGetters(['infolist','undoList'])
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
