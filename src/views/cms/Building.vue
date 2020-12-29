<template>
  <div id="building">
    <Crud :options="crudOptions"/>
  </div>
</template>

<script>
import Crud from '../../components/Crud.vue';
import {
  add, getDetails, getList, remove, update,
} from '../../api/building';

export default {
  name: 'Building',
  components: {
    Crud,
  },
  data() {
    return {
      crudOptions: {
        getList,
        columns: [
          {
            prop: 'id',
            label: '#',
            pk: true,
          },
          {
            prop: 'aliasName',
            label: '楼宇',
          },
          {
            prop: 'department',
            label: '单位',
          },
          {
            prop: 'fullName',
            label: '命名',
          },
        ],
        add,
        remove,
        update,
        enableDetails: true,
        getDetails,
        detailsColumns: [
          {
            prop: 'currentFreeClassrooms',
            label: '空闲教室数',
          },
          {
            prop: 'totalNumberOfClassrooms',
            label: '教室总数',
          },
          {
            prop: 'freeCapacity',
            label: '剩余容量（人）',
          },
          {
            prop: 'totalCapacity',
            label: '总容量（人）',
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
