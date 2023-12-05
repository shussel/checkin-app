# checkin-app
Vue 3 app that uses geolocation API and periodic checkins to record activity at a site. Live demo at https://checkin.shanehussel.net

## Motivation
In some localities animal control officers on a call are required to check in on a regular basis, usually by radio. If they do not check in on schedule, police will be dispatched to the site for their safety, which has a significant cost in resources. They have expressed interest in having a mobile app with which they can make their checkins more easily. This app is proof of concept and its first iteration.

## Use
When opened, the app first locates the user and displays their position on a map. To begin the tracking process the user clicks the checkin button with an optional message, or the message will be sent as "arrived". Then a timer will begin with a countdown to the next scheduled checkin. (For demo purposes the checkin interval is set to every 10 seconds, but would be longer in reality.) After the checkin interval has elapsed, the checkin form will reappear, the map is updated to the current location, and an alarm tone will sound until they submit a new checkin. The default checkin message for all subsequent checkins will be "OK" if no message is entered. In this iteration the process repeats until the app is closed or the page is reloaded, at which point they can begin checkins at a different site.

## Implementation
This app is built with Vue 3 and consists of 2 single file components, CheckIn which displays the map and form and provides geolocation services, and CheckinHistory which displays a list of previous checkins in reverse order. The components are built using Vue's Composition API using the `<setup script>` syntax, which I find simpler and more elegant than previous methods.

The back-end is implemented with Express JS and MongoDB and can be viewed [here](https://github.com/shussel/checkin-api) making this a MEVN stack app.

## Depedencies
- Vue 3: https://vuejs.org/
- vue3-google-map: https://www.npmjs.com/package/vue3-google-map
- axios: for http requests: https://axios-http.com/
- Bootstrap 5:https://getbootstrap.com/
- vue-countdown: https://www.npmjs.com/package/@chenfengyuan/vue-countdown
