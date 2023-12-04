<template>
  <GoogleMap v-if="Object.keys(center).length" :api-key="apiKey" id="map" :center="center" :zoom="15" mapTypeId="hybrid"
    :key="refreshMap">
    <Marker :options="{ position: center }" />
  </GoogleMap>
  <div class="text-center">{{ center.lat }} {{ center.lng }}</div>
  <VueCountdown v-if="!checkinDue" :time="countdownTime" v-slot="{ minutes, seconds }" @end="checkinTime()">
    <h4 class="text-center py-2">Next Check In {{ minutes }}:{{ seconds.toString().padStart(2, '0') }}</h4>
  </VueCountdown>
  <div v-else>
    <h3 class="text-center py-2">{{ message }}</h3>
    <div class="input-group">
      <input class="form-control form-control-lg" placeholder="message (optional)" v-model="checkinMessage" />
      <button type="submit" class="btn btn-success btn-lg" @click.prevent="submitCheckin()">Check In</button>
    </div>
  </div>
  <CheckinHistory :call-id="callId" :key="refreshCall" />
</template>

<script setup>
import { watch, ref } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
import { useGeolocation } from '@vueuse/core';
import VueCountdown from '@chenfengyuan/vue-countdown';
import CheckinHistory from './CheckinHistory.vue';
import dingSound from '../assets/ding.mp3';
import api from "../api";

const apiKey = process.env.VUE_APP_GOOGLE_API_KEY;
const countdownTime = 10 * 1000;
const message = ref("Check in to Start");
const checkinMessage = ref('');
const checkinDue = ref(true);
const refreshMap = ref(0);
const refreshCall = ref(0);
const alert = new Audio(dingSound);
const callId = ref('');

// get location
const { coords } = useGeolocation();
// update map center when it changes
const center = ref({})
watch(coords, newCoords => {
  if (newCoords.latitude) {
    center.value.lat = newCoords.latitude;
    center.value.lng = newCoords.longitude;
  }
})

// create new call in database
async function startCall() {
  try {
    const checkin = {
      checkinTime: new Date().toJSON(),
      location: [
        center.value.lat,
        center.value.lng
      ],
      checkinMessage: checkinMessage.value || "Arrived",
    }
    const { data } = await api.post(
      "api/Call",
      {
        checkins: [
          checkin
        ],
      }
    );
    callId.value = data._id;
    checkinMessage.value = '';
  } catch (error) {
    console.log(error);
  }
  refreshCall.value++;
}

// add checkin to call
async function saveCheckin() {
  try {
    const checkin = {
      checkinTime: new Date().toJSON(),
      location: [
        center.value.lat,
        center.value.lng
      ],
      checkinMessage: checkinMessage.value || "OK",
    }
    await api.patch(
      "api/Call/" + callId.value,
      checkin
    );
    checkinMessage.value = '';
  } catch (error) {
    console.log(error);
  }
  refreshCall.value++;
}

// checkin form submit event
function submitCheckin() {
  if (!callId.value) {
    startCall();
  } else {
    saveCheckin();
  }
  checkinDue.value = false;
  alert.pause();
  alert.currentTime = 0;
}

// countdown end event
function checkinTime() {
  refreshMap.value++;
  checkinDue.value = true;
  message.value = "Check in Now";
  alert.loop = true;
  alert.play();
}
</script>

<style>
#map {
  width: 100%;
  height: 400px;
}
</style>
