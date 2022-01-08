<template>
  <div>
    <div style="display: inline-block">
      <div class="container" @click="visible = true">
        <ul v-if="memberName.length > 0" class="tag-body">
          <li
            v-for="(item, index) in memberName"
            :key="item.title + index"
            class="new-list"
          >
            <a-tag closable @close="deleteMember(item.id)">
              {{ item.title }}
            </a-tag>
          </li>
        </ul>
        <div v-if="memberName.length === 0" class="tip">
          <a-icon type="down" :style="{ color: '#d9d9d9' }" />
        </div>
        <div v-if="memberName.length > 0" class="tip">
          已选{{ memberName.length }}项
        </div>
        <div v-if="memberName.length > 3" style="float: right">...</div>
        <span v-if="memberName.length === 0" class="nonelength"> 请选择 </span>
      </div>
    </div>
    <a-modal
      :visible="visible"
      title="选择所属成员"
      @ok="handleOk"
      @cancel="handleclose"
      :zIndex="10000"
      :width="640"
    >
      <div :class="['contant']">
        <div class="tranfres">
          <a-input-search
            v-model="keyWords"
            placeholder="请输入成员"
            @change="onSearch"
          />
          <div class="treecontain">
            <div>
              <div
                v-if="searchFlag === false"
                :class="{ 'single-mode': !checkable }"
              >
                <a-tree
                  v-model="memberKey"
                  :checkable="checkable"
                  :selected-keys="selectedKeys"
                  :tree-data="treeData"
                  :load-data="onLoadData"
                  :selectable="!checkable"
                  :replace-fields="{
                    children: 'children',
                    key: 'id',
                    title: 'title',
                  }"
                  :expandedKeys="expandedKeys"
                  @expand="onExpand"
                  @select="onSelect"
                  @check="checkTop"
                >
                  <template slot="switcherIcon">
                    <a-icon type="down" />
                  </template>
                  <template slot="title" slot-scope="{ title }">
                    <a-space :size="6">
                      <img
                        class="tree-folder-icon"
                        src="@/assets/dtcomponents/folder.png"
                        alt=""
                      />
                      {{ title }}
                    </a-space>
                  </template>
                  <template slot="custom" slot-scope="{ title, avatar }">
                    <a-space :size="6">
                      <img class="tree-avatar" :src="avatar" alt="" />
                      <span :title="title" class="text-ellipsis">{{
                        title
                      }}</span>
                    </a-space>
                    <a-icon type="check" class="node-check-icon" />
                  </template>
                </a-tree>
              </div>
              <div v-if="searchFlag === true" class="search-title">
                包含“{{ keyWords }}”的搜索结果
              </div>
              <div
                v-if="searchFlag === true"
                :class="['search-list', checkable ? '' : 'single-mode']"
              >
                <a-tree
                  v-if="searchFlag === true"
                  v-model="memberKey"
                  blockNode
                  :checkable="checkable"
                  :selectable="!checkable"
                  :selected-keys="selectedKeys"
                  :tree-data="searchData"
                  :load-data="onLoadData"
                  :replace-fields="{
                    children: 'children',
                    key: 'id',
                    title: 'title',
                  }"
                  @expand="onExpand"
                  @select="onSelect"
                  @check="checkBottom"
                >
                  <template slot="switcherIcon">
                    <a-icon type="down" />
                  </template>
                  <template slot="title" slot-scope="{ title }">
                    <a-space :size="6">
                      <img
                        class="tree-folder-icon"
                        src="@/assets/dtcomponents/folder.png"
                        alt=""
                      />
                      {{ title }}
                    </a-space>
                  </template>
                  <template
                    slot="custom"
                    slot-scope="{ title, avatar, departmentName }"
                  >
                    <a-space class="tree-search-item">
                      <a-space :size="6">
                        <img class="tree-avatar" :src="avatar" alt="" />
                        <span class="search-tree-node-title">
                          <span :title="title">{{ title }}</span>
                          <span
                            :title="departmentName"
                            class="tree-department-name"
                            >{{ departmentName }}</span
                          >
                        </span>
                      </a-space>
                      <a-icon type="check" class="node-check-icon" />
                    </a-space>
                  </template>
                </a-tree>

                <!-- 下面的代码解决了样式问题，但有左右勾选/取消不对应的bug，待解决 -->
                <!-- <div 
                  v-for="(item, index) in searchData" 
                  :key="item.key + 'search' + index" 
                  :class="['search-item', selectedKeys.includes(item.id) ? 'selected' : '']"
                  @click="searchCheckChange(null, item)">
                  <div class="flex-align-center">
                    <a-checkbox v-if="checkable" :checked="selectedKeys.includes(item.id)" @change="(e) => searchCheckChange(e, item)"></a-checkbox>
                    <div class="search-item-content">
                      <img class="tree-avatar" :src="item.avatar" alt="" />
                      <span class="search-item-content-title">
                        <span>{{ item.title }}</span>
                        <span class="tree-department-name">{{ item.departmentName }}</span>
                      </span>
                    </div>
                  </div>
                  <a-icon v-if="!checkable" type="check" class="node-check-icon" />
                </div> -->
                <!-- <div class="search-group">
                  <div
                    v-for="(item, index) in searchData"
                    :key="index"
                    class="search-groupname"
                  >
                    {{ item.departmentName }}
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="tranfres tranfresright">
          <div class="selected-tip">已选：{{ memberName.length }} 名成员</div>
          <div class="rightContain">
            <ul class="rightContainul" style="padding-left: 16px">
              <li
                v-for="(item, index) in memberName"
                :key="item.id + index"
                class="right-item"
              >
                <a-space>
                  <img class="right-avatar" :src="item.avatar" alt="" />
                  {{ item.title }}
                </a-space>
                <a-icon
                  type="close"
                  class="deteleRight"
                  @click="deleteSelected(item.id)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import uniqBy from "lodash/uniqBy";
import cloneDeep from "lodash/cloneDeep";
import myAxios from "@/services/request";
// import { treeData } from './data';
export default {
  // name: "dt-member-selector",
  name: "dt-search-member",
  props: {
    /**
     * 显示选择器弹窗
     */
    // visible: {
    //   type: Boolean,
    //   default: false,
    // },
    /**
     * 已选中的成员id集合
     */
    selectedMembers: {
      type: Array,
      default: () => [],
    },
    /**
     * 是否多选
     */
    checkable: {
      type: Boolean,
      default: true,
    },
  },
  model: {
    prop: "selectedMembers",
    event: "onChange",
  },
  data() {
    return {
      visible: false,
      expandedKeys: [],
      autoExpandParent: true,
      memberKey: [],
      selectedKeys: [],
      treeData: [],
      rightData: [],
      test: [],
      memberRight: [],
      memberName: [],
      parentId: "",
      dataList: [],
      keyWords: "",
      searchFlag: false,
      searchData: [],
      checkEData: [],
      checkResult: [],
      selectData: [],
    };
  },
  watch: {
    visible: {
      handler(value) {
        if (value) {
          const selectedMembers = cloneDeep(this.selectedMembers);
          // 确保id为字符串，与成员树保持一致
          // this.memberKey = selectedMembers.map((i) => i.id.toString());
          this.memberKey = selectedMembers;
          this.memberRight = this.memberKey;
          this.selectedKeys = this.memberKey;
          // this.memberName = selectedMembers;
          this.keyWords = "";
          this.onSearch();
        }
      },
    },
    selectedMembers(val) {
      if (!val || !val.length) {
        this.memberKey = [];
        this.memberRight = [];
        this.selectedKeys = [];
        this.memberName = [];
      }
    },
    // treeData: {
    //   handler(treeData) {
    //     if (treeData) {
    //       debugger;
    //       this.treeData = treeData;
    //     }
    //   },
    // },
    // deep: true,
  },

  mounted() {
    this.getTreeData();
  },
  methods: {
    async onSearch() {
      let fillterData = [];
      this.memberKey = this.memberRight;
      if (this.keyWords !== "") {
        this.searchFlag = true;
        const { data: res } = await myAxios.post(
          "work-party/search-department-or-user",
          {
            agentid: "",
            corp_id: localStorage.getItem("corpId"),
            departmentDisabled: 0,
            disabled: 0,
            from_id: 0,
            get_users: 1,
            is_audit: "",
            is_audit_edit: 0,
            is_audit_user_all: 0,
            is_del: 0,
            is_external: 0,
            is_from: 0,
            is_from_edit: 0,
            is_special: 1,
            name: this.keyWords,
            suite_id: 1,
            uid: "10",
            userDisabled: 0,
            welcome_id: 0,
          }
        );
        if (res.error === 0) {
          this.searchData = res.data.workUser;
          for (let index = 0; index < this.searchData.length; index++) {
            for (let j = 0; j < this.checkEData.length; j++) {
              if (this.searchData[index].id === this.checkEData[j]) {
                fillterData.push(this.checkEData[j]);
              }
            }
          }
          this.checkEData = fillterData;
        }
      } else {
        this.searchFlag = false;
        this.getTreeData();
      }
    },
    onLoadData(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        this.getTreeData(treeNode);
        resolve();
      });
    },
    async getTreeData(treeNode) {
      if (this.parentId === "") {
        const { data: res } = await myAxios.post(
          "work-party/get-all-department-user",
          {
            corp_id: localStorage.getItem("corpId"),
            type: 0,
            departmentDisabled: 0,
            disabled: 0,
            from_id: 0,
            get_users: 1,
            is_audit: "",
            is_audit_edit: 0,
            is_audit_user_all: 0,
            is_del: 0,
            is_external: 0,
            is_from: 0,
            is_from_edit: 0,
            is_special: 1,
            suite_id: 1,
            uid: localStorage.getItem("uid"),
            userDisabled: 0,
            welcome_id: 0,
            agentid: "",
          }
        );
        if (res.error === 0) {
          // 仅有一项的情况下，自动展开
          if (res.data.length === 1) {
            if (!this.expandedKeys.length) {
              this.expandedKeys = [res.data[0].id];
            }
          }
          this.treeData = res.data;
          this.deepList(this.treeData);
        }
      } else {
        const { data: res } = await myAxios.post(
          "work-party/get-all-department-user",
          {
            corp_id: localStorage.getItem("corpId"),
            type: 0,
            departmentDisabled: 0,
            disabled: 0,
            from_id: 0,
            get_users: 1,
            is_audit: "",
            is_audit_edit: 0,
            is_audit_user_all: 0,
            is_del: 0,
            is_external: 0,
            is_from: 0,
            is_from_edit: 0,
            is_special: 1,
            suite_id: 1,
            uid: localStorage.getItem("uid"),
            userDisabled: 0,
            welcome_id: 0,
            agentid: "",
            parentId: this.parentId,
          }
        );
        if (res.error === 0) {
          treeNode.dataRef.children = {};

          treeNode.dataRef.children = res.data;
          // this.$set(this.treeData, treeNode.dataRef.children, res.data);
          this.$forceUpdate();
          this.deepList(this.treeData);
        }
      }
      this.$nextTick(() => {
        this.setName(this.treeData);
      });
    },
    onExpand(expandedKeys, node) {
      this.parentId = node.node.dataRef.key;
      // this.onLoadData(node.node);
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onSelect(selectedKeys, e) {
      if (!e.node.isLeaf) return; //如果是单选则不能选择非叶子结点
      this.memberName = [];
      this.selectedKeys = selectedKeys;
      this.memberRight = selectedKeys;
      this.memberKey = this.memberRight;
      this.selectData = selectedKeys;
      this.checkEData = this.selectData;
      this.setName(this.treeData);
    },
    // 弹框内删除已选成员
    deleteSelected(id) {
      // this.selectedKeys.splice(this.selectedKeys.indexOf(id), 1);
      this.memberName.splice(
        this.memberName.findIndex((mn) => mn.id == id),
        1
      );
      this.memberRight.splice(this.memberRight.indexOf(id), 1);
      this.memberKey = this.memberRight;
    },
    checkTop(e) {
      console.log(e);
      // 穿梭框右边展示的id和name
      this.memberName = [];
      this.memberRight = [];
      // 过滤去重。
      const result = [...new Set(this.test)].filter((item) =>
        new Set(eval(e)).has(item)
      );
      // console.log(result);

      // 将结果赋值给v-model绑定的属性
      this.memberRight = [...result];

      // 递归遍历出所有的name
      this.setName(this.treeData);
      this.checkEData = e;
      // this.selectedKeys = e;
    },
    checkBottom(checkedKeys, e) {
      // 去重
      this.memberRight = Array.from(
        new Set(this.memberRight.concat(checkedKeys))
      );

      if (!e.checked) {
        // 如果是取消选中的话
        let index1 = this.memberRight.indexOf(e.node.eventKey);
        let index2 = this.memberName.findIndex(
          (member) => member.id == e.node.eventKey
        );
        if (index1 > -1) {
          this.memberRight.splice(index1, 1);
        }
        if (index2 > -1) {
          this.memberName.splice(index2, 1);
        }
      }
      // console.log(
      //   JSON.parse(JSON.stringify(this.checkEData)),
      //   this.searchData,
      //   this.memberRight,
      // );
      // this.memberRight = memberRight;
      // 从searchData中取出名字
      this.setName(this.searchData);
      this.setName(this.treeData);
      this.checkEData = checkedKeys;
    },
    handleOk() {
      // const memberList = cloneDeep(this.memberName);
      const memberIds = cloneDeep(this.memberRight);
      // /**
      //  * 选中成员并关闭弹窗
      //  *
      //  * @property {Array} memberList 选中成员的所有信息
      //  * @property {Array} memberIds 选中成员的id
      //  */
      this.$emit("onChange", memberIds);
      this.visible = false;
    },
    handleclose() {
      // 重置内部状态为members
      // this.memberName = cloneDeep(this.selectedMembers);
      // this.memberRight = this.selectedMembers.map((i) => i.id.toString());
      this.memberName = [];
      this.memberRight = this.selectedMembers;
      // console.log("🚀 ~ file: DtMemberSelector.vue ~ line 501 ~ handleclose ~ this.selectedMembers", this.selectedMembers)
      this.setName(this.treeData);
      // /**
      //  * 关闭弹窗
      //  */
      // this.$emit("close");
      this.visible = false;
    },
    // 删除已选成员
    deleteMember(id) {
      let index = this.memberName.findIndex((mn) => mn.id == id);
      this.memberName.splice(index, 1);
      this.$emit(
        "onChange",
        this.memberName.map((mn) => mn.id)
      );
    },
    setName(treeData) {
      // 遍历树  获取id数组
      for (let i in treeData) {
        for (let j in this.memberRight) {
          if (treeData[i].id === this.memberRight[j]) {
            const member = { ...treeData[i] };
            // 把子项去掉
            delete member.children;
            this.memberName.push(member);
          }
        }
        if (treeData[i].children) {
          this.setName(treeData[i].children);
        }
      }
      this.memberName = uniqBy(this.memberName, "id");
    },
    deepList(data) {
      data.map((item) => {
        if (item.department_id !== undefined) {
          if (item.children && item.children.length >= 0) {
            this.deepList(item.children);
          }
        } else {
          // test数组存放
          this.dataList.push(item.key);
          this.test.push(item.id);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "./DtSearchMember.less";
</style>
