<template>
  <div id="dashboard">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-card :body-style="{ padding: '0px' }">
          <div class="status-wrapper">
            <div class="status-icon" style="background-color: #909399">
              <i class="el-icon-user-solid"></i>
            </div>
            <div class="status-number">
              <div style="color: #909399">{{ status.userCount }}</div>
              <div>用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card :body-style="{ padding: '0px' }">
          <div class="status-wrapper">
            <div class="status-icon" style="background-color: #67c23a">
              <i class="el-icon-house"></i>
            </div>
            <div class="status-number">
              <div style="color: #67c23a">{{ status.buildingCount }}</div>
              <div>教学楼总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card :body-style="{ padding: '0px' }">
          <div class="status-wrapper">
            <div class="status-icon" style="background-color: #409eff">
              <i class="el-icon-s-grid"></i>
            </div>
            <div class="status-number">
              <div style="color: #409eff">{{ status.classroomCount }}</div>
              <div>教室总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getStatus } from '../api/dashboard';

export default {
  name: 'Dashboard',
  data() {
    return {
      status: {
        userCount: 0,
        buildingCount: 0,
        classroomCount: 0,
      },
    };
  },
  methods: {
    fetchStatus() {
      getStatus().then((resp) => {
        this.status = resp.data;
      });
    },
  },
  mounted() {
    this.fetchStatus();
  },
};
</script>

<style lang="scss" scoped>
  .status-wrapper {
    display: flex;
    justify-content: space-between;

    .status-icon {
      padding: 30px;

      i {
        font-size: 30px;
        color: #fff;
      }
    }

    .status-number {
      width: calc(100% - 90px);
      text-align: center;
      padding-top: 18px;

      div {
        margin: 0;

        &:first-child {
          font-size: 28px;
          font-weight: bold;
        }

        &:last-child {
          color: #909399;
          font-weight: lighter;
        }
      }
    }
  }
</style>
