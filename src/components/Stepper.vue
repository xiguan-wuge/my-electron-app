<template>
  <div class="stepper flex-center">
    <div
      class="sub flex-center"
      :class="{ dis: subDisable }"
      v-show="modelValue"
      @click.stop="handClick(false)"
    >
      -
    </div>
    <div class="num" v-show="modelValue">{{ modelValue }}</div>
    <div
      class="add flex-center"
      :class="{ dis: addDisable }"
      @click.stop="handClick(true)"
    >
      +
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    defult: 0,
  },
});
const emit = defineEmits(["update:modelValue", 'change']);

const addDisable = computed(() => {
  return !!(props.max && props.modelValue === props.max);
});

const subDisable = computed(() => {
  return props.modelValue === props.min;
});

function handClick(isAdd: boolean) {

  if ((isAdd && addDisable.value) || (!isAdd && subDisable.value)){
    return
  }
  const num = isAdd
    ? props.max && props.modelValue === props.max
      ? props.max
      : props.modelValue + 1
    : props.modelValue === props.min
    ? props.min
    : props.modelValue - 1;
  emit("change", num);

}
</script>

<style lang="less" scoped>
.sub,
.add {
  width: 40px;
  height: 40px;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  color: #f19029;
  font-size: 36px;
}
.dis {
  opacity: 0.5;
  background-color: lightgray;
}
.num {
  font-size: 28px;
  color: #333;
  margin: 0 10px;
}
</style>
