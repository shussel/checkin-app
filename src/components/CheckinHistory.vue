<template>
  <div class=" mt-4" v-if="props.callId">
    <table class="table table-striped table-bordered">
      <thead>
        <th>Time</th>
        <th>Location</th>
        <th>Message</th>
      </thead>
      <tbody>
        <tr v-for="(checkin, index) in checkinList" v-bind:key="index">
          <td>{{ new Date(checkin.checkinTime).toLocaleDateString('en-us', {
            year: 'numeric', month: 'short', day:
              'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
          }) }}</td>
          <td>{{ checkin.location[0] }},{{ checkin.location[1] }}</td>
          <td>{{ checkin.checkinMessage }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, toRefs, reactive } from "vue";
import api from "../api";

const props = defineProps({
  callId: String
});
const { callId } = toRefs(props);
const checkinList = reactive([]);

// get checkins for this call
if (callId.value) {
  (async () => {
    try {
      const { data } = await api.get(
        "api/Call/" + callId.value
      );
      // append checkins in reverse order
      data.checkins.forEach(
        checkin => { checkinList.unshift(checkin) }
      )
    } catch (error) {
      console.log(error);
    }
  })()
}

</script>
