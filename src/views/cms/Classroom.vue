<template>
    <div id="classroom">
      <Crud :options="crudOptions"/>
    </div>
</template>

<script>
import Crud from '../../components/Crud.vue';
import {
  getList, add, remove, update,
} from '../../api/classroom';
import { getAll } from '../../api/building';

export default {
  name: 'Classroom',
  components: {
    Crud,
  },
  data() {
    return {
      crudOptions: {
        getList,
        add,
        remove,
        update,
        columns: [
          { prop: 'id', label: '#', pk: true },
          { prop: 'name', label: '名称' },
          { prop: 'capacity', label: '可容纳人数', type: 'number' },
          { prop: 'status', label: '空闲', type: 'boolean' },
          {
            prop: 'buildingName',
            label: '所属教学楼',
            ref: {
              select: [],
              key: 'buildingId',
              label: 'fullName',
            },
          },
        ],
      },
    };
  },
  mounted() {
    getAll().then((resp) => {
      this.crudOptions.columns[4].ref.select = resp.data;
    });
  },
};
</script>

<style lang="scss" scoped>

</style>
