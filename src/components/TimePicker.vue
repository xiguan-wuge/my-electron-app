<template>
  <div class="time-picker">
    <van-action-sheet v-model:show="show" @click-overlay="close">
      <van-time-picker
        v-model="currentTime"
        title="选择时间"
        :filter="filter"
        @cancel="close"
        @confirm="confirm"
      >
        <template #confirm>
          <div class="confirm">确定</div>
        </template>
      </van-time-picker>
    </van-action-sheet>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import type {PickerOption, PickerConfirmEventParams} from 'vant'


const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["close", "confirm"]);
const show = computed(() => props.show)

const currentTime = ref(["12", "00"]);
const filter = (type:string, options:PickerOption) => {
  if (type === "minute") {
    return options.filter((option:PickerOption) => Number(option.value) % 10 === 0);
  }
  return options;
};

function close() {
  emit('close')
} 
function confirm(e:PickerConfirmEventParams) {
  console.log('e', e);
  
  emit('confirm', e)
}
</script>
<style lang="less" scoped>
.confirm {
  color: #F19029;
}
</style>
